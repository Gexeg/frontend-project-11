import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import i18n from 'i18next';
import app from './rss_app/app.js'
import { supportedLanguages, rssFormStates } from './rss_app/const.js'
import resources from './locales/index.js';

const state = {
    'lang': supportedLanguages.ru,
    'rssForm': {
        'state': rssFormStates.init,
        'url': null,
        'feedback': null,
    },
}


const translator = await i18n.createInstance();
translator.init({
  resources: {
    'en': resources.en,
    'ru': resources.ru
  },
  lng: state.lang,
  debug: true,
});

app(state, translator);
