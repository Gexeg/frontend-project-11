import onChange from 'on-change';

function renderRssForm(state) {
    console.log(`Form rendered ${state.rssForm}`)
}

export const setWatcher = (state) => {
    return onChange(state, function (path, value, previousValue, applyData) {
        console.log(path)
        switch (path) {
            case 'rssForm':
                renderRssForm(state)
                break
            default:
                console.log('I"m in default branch')
                break
        }
    })
}