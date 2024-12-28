import onChange from 'on-change';
import { rssFormStates } from './const.js';


function renderRssForm(state, translator) {
    const formState = state.rssForm
    const resultString = document.querySelector('#url-feedback');
    resultString.textContent = '';
    resultString.classList.remove('text-danger');
    resultString.classList.remove('text-success');

    const input = document.querySelector('#url-input');
    console.log(formState.url)
    input.value = formState.url;
    input.focus();

    if (formState.state === rssFormStates.success) {
        resultString.classList.add('text-success');
        resultString.textContent = translator.t(formState.feedback.code, formState.feedback.options);
    }
    else if (formState.state === rssFormStates.fail) {
        resultString.classList.add('text-danger');
        resultString.textContent = translator.t(formState.feedback.code, formState.feedback.options);
    }
}

export const setWatcher = (state, translator) => {
    return onChange(state, function (path, value, previousValue, applyData) {
        console.log(path)
        switch (path) {
            case 'rssForm':
                console.log('Render rss form')
                console.log(JSON.stringify(state, null, 2));

                renderRssForm(state, translator)
                break
            default:
                console.log('I"m in default branch')
                break
        }
    })
}