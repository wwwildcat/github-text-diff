import { createPatch } from 'diff';
import rtf2txt from 'rtf2text';

async function getData(url, responseType, token) {
    const response = await fetch(url, {
        headers: {
            authorization: `token ${token}`,
        },
    });
    const data = await response[responseType]();
    return data;
}

async function getTextFromRtf (rtf) {
	const text = await new Promise((resolve, reject) => {
		rtf2txt.string(rtf, (err, txt) => {
			if (err) reject(err);
			resolve(txt);
		});
	});

	return text;
}

async function getUnifiedDiffs (baseURL, currentSHA) {
	const token = await new Promise((resolve) => {
		chrome.storage.sync.get(['githubToken'], result => {
			resolve(result.githubToken);
		});
	});

    const commitData = await getData(`${baseURL}/commits/${currentSHA}`, 'json', token);
    // https://api.github.com/repos/:owner/:repo/commits/:SHA

	const RTFiles = commitData.files
		? commitData.files.filter(item => /\.rtf$/.test(item.filename))
		: [];

    const diffs = await Promise.all(RTFiles.map(async function (file) {
        const currentFileRtf = await getData(file.contents_url, 'text', token);
        const currentFileTxt = await getTextFromRtf(currentFileRtf);
        let prevFileTxt = '';

        if (file.status === 'modified') {
            const commits = await getData(`${baseURL}/commits?path=${encodeURI(file.filename)}`, 'json', token);
            // https://api.github.com/repos/:owner/:repo/commits?path=FILE_PATH

            const prevCommit = commits.find((item, i, array) => array[i - 1] && array[i - 1].sha === currentSHA);
            const prevFileRtf = await getData(`${baseURL}/contents/${encodeURI(file.filename)}?ref=${prevCommit.sha}`, 'text', token);
            // https://api.github.com/repos/:owner/:repo/contents/:FILE_PATH?ref=SHA

            prevFileTxt = await getTextFromRtf(prevFileRtf);
        }

        return {
            fileName: file.filename,
            status: file.status,
            diff: createPatch(file.filename, prevFileTxt, currentFileTxt),
        };
    }));

    return diffs;
}

export default getUnifiedDiffs;