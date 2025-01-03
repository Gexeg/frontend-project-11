import onChange from 'on-change';
import {renderFeedsList, renderPostsList, renderRssForm} from './rss.js'


export const setWatcher = (state, translator) => {
    return onChange(state, function (path, value, previousValue, applyData) {
        switch (path) {
            case 'rssForm':
                renderRssForm(state, translator)
                break
            case 'feeds':
                renderFeedsList(state, translator)
                break
            case 'posts':
                renderPostsList(state, translator)
                break
            default:
                console.log('I"m in default branch')
                break
        }
    })
}
