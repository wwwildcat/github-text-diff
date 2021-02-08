const addDiffStatElem = (string, type) => string + `<span class="diffstat-block-${type}"></span>`;

const getDiffstatVisual = (added, deleted) => {
    let result = '';
    if (added + deleted <= 4) {
        for (let i = 0; i < added; i++) {
            result = addDiffStatElem(result, 'added');
        }
        for (let i = 0; i < deleted; i++) {
            result = addDiffStatElem(result, 'deleted');
        }
        for (let i = 0; i < 5 - (added + deleted); i++) {
            result = addDiffStatElem(result, 'neutral');
        }
    } else {
        const k = added / (added + deleted);
        for (let i = 0; i < k*5; i++) {
            result = addDiffStatElem(result, 'added');
        }
        for (let i = 0; i < (1 - k)*5; i++) {
            result = addDiffStatElem(result, 'deleted');
        }
        if (k !== 0 && k !== 1) {
            result = addDiffStatElem(result, 'neutral');
        }
    }
	return result;
}

export default getDiffstatVisual;