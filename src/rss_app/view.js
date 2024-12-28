import onChange from 'on-change';

function renderRssForm(state, translator) {
    const formState = state.rssForm
    const resultString = document.querySelector('#url-feedback');
    resultString.textContent = '';
    resultString.classList.remove('text-danger');
    resultString.classList.remove('text-success');


    console.log(state)
    if (formState.comment) {
        console.log('State comment')
        resultString = (translator.t(formState.comment));
        resultString.classList.add('text-success');
        resultString.textContent = translator.t(formState.comment)
    }
    else if (formState.error) {
        console.log('State error')
        resultString.classList.add('text-danger');
        resultString.textContent = translator.t(formState.error.code, formState.error.options);
    }
}

export const setWatcher = (state, translator) => {
    return onChange(state, function (path, value, previousValue, applyData) {
        console.log(path)
        switch (path) {
            case 'rssForm':
                console.log('Render rss form')
                renderRssForm(state, translator)
                break
            default:
                console.log('I"m in default branch')
                break
        }
    })
}