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

export function addBlankModalElement(translator) {
    const modalHTML = `<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${translator.t('modal.close')}</button>
        <button type="button" class="btn btn-primary">${translator.t('modal.open')}</button>
      </div>
    </div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}
