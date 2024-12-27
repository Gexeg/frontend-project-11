import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import i18n from 'i18next';
import app from './rss_app/app.js'
import { supportedLanguages } from './const.js'
import resources from './locales/index.js';

const state = {
    'lang': supportedLanguages.en,
    'rssForm': {
        'url': null,
        'error': null,
        'comment': null
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
