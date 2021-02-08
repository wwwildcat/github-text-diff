import * as Diff2Html from 'diff2html';
import getUnifiedDiffs from './utils/asyncUtils';
import getDiffstatVisual from './utils/diffStatUtils';
import '../css/content.css';

const { search, pathname } = new URL(window.location.href);
const diffFormat = search.includes('diff=split') ? 'side-by-side' : 'line-by-line';
const apiURL = 'https://api.github.com/repos' + pathname.slice(0, pathname.indexOf('/commit/'));
const currentSHA = pathname.slice(pathname.lastIndexOf('/') + 1);

getUnifiedDiffs(apiURL, currentSHA)
    .then(diffs => {
        diffs.forEach(item => {
            const RTFHeader = document.querySelector(`[data-path="${item.fileName}"]`);
            const RTFContent = RTFHeader.nextElementSibling;
            const newRTFJson = Diff2Html.parse(item.diff);

            const diffstat = RTFHeader.querySelector('.diffstat');
            const { addedLines, deletedLines } = newRTFJson[0];
            diffstat.ariaLabel = `${addedLines + deletedLines} changes: ${addedLines} additions & ${deletedLines} deletions`;
            diffstat.innerHTML = `${addedLines + deletedLines} ${getDiffstatVisual(addedLines, deletedLines)}`;

            const newRTFContent = Diff2Html.html(newRTFJson, {
                drawFileList: false,
                outputFormat: diffFormat,
                matching: 'lines',
            });
            RTFContent.innerHTML = newRTFContent;
        });
    });