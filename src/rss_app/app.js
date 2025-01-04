import { setWatcher, addBlankModalElement } from "./view/index.js";
import { subscribeToNewRss } from "./controllers/add_rss.js";
import startPeriodicTasks from './periodic_tasks/index.js'

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
    startPeriodicTasks(watchedState);
    addBlankModalElement(translator);
    setSubmitFormHandler(watchedState, translator);
}