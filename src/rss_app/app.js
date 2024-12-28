import { setWatcher } from "./view.js";
import { subscribeToNewRss } from "./controllers/form.js";

function setSubmitFormHandler(state, translator) {
    const button = document.querySelector('#rss-url-submit');
    const input = document.querySelector('#url-input');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        subscribeToNewRss(input.value, state, translator)
        }
    )
}

export default async function application(state, translator) {
    const watchedState = setWatcher(state, translator);
    setSubmitFormHandler(watchedState, translator);
}