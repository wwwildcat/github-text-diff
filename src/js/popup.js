import "../css/index.css";

document.querySelector('.popup__button').addEventListener('click', () => {
	chrome.runtime.openOptionsPage();
});