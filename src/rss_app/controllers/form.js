import * as yup from 'yup';

function getRss(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          // тут конечно по хорошему надо кастомные ошибки сделать, чтобы не магичить
          const error = new Error('error.urlUnavailable');
          error.options = {status: response.status}
          throw error;
        }
        return response.text();
      });
  }
  
function checkRssBody(body) {
  // TODO проверить, что пришедший контент - rss
    // if (!body.includes(expectedContent)) {
    //   throw new Error(translator.t('error.wrongContent'));
    // }
    return true;
  }
  
function validateUrlResponse(url) {
    return getRss(url)
      .then((body) => checkRssBody(body))
      .catch((error) => {
        throw new Error(error.message);
      });
  }
  
const urlSchema = yup
    .string()
    .url('error.invalidUrl')
    .test(
      function (value) {
        return validateUrlResponse(value)
          .then((comment) => comment)
          .catch((error) => this.createError({ message: error.message }));
      }
    );

export function subscribeToNewRss(url, state, translator) {
    urlSchema
    .validate(url, { context: { translator } })
    .then((comment) => {
        state['rssForm'] = {
            'url': null,
            'error': null,
            'comment': comment
        }
    })
    .catch((error) => {
        state['rssForm'] = {
            'url': url,
            'error': translator.t(error.message, error.options ?? {}),
            'comment': null
        }
    });
}