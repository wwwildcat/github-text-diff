import "../css/index.css";

document.querySelector('.options__input').addEventListener('input', () => {
	document.querySelector('.options__error-message').classList.add('hidden');
});

const form = document.querySelector('.options__form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const str = e.target[0].value;
	if (/[0-9a-fA-F]{40}/.test(str)) {
		chrome.storage.sync.set({
			githubToken: str
		}, () => {
			form.classList.add('hidden');
			document.querySelector('.options__success-message').classList.remove('hidden');
		})
	} else {
		document.querySelector('.options__error-message').classList.remove('hidden');
	}
});