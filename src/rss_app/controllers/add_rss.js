import * as yup from 'yup';
import { rssFormStates } from '../const.js';


export function subscribeToNewRss(url, state) {
  urlSchema
  .validate(url)
  .then(() => getRss(url))
  .then((responseJson) => parseRss(responseJson.contents))
  .then(([feeds, posts]) => addPostsFeeds(state, feeds, posts))
  .then(() => {
      state['rssForm'] = {
          'state': rssFormStates.success,
          'url': null,
          'feedback': {code: rssFormStates.success, options: {}},
      }
  })
  .catch((error) => {
      state['rssForm'] = {
          'state': rssFormStates.fail,
          'url': url,
          'feedback': {code: error.message, options: error.options ?? {}},
      }
  });
}

const urlSchema = yup
    .string()
    .url('error.invalidUrl')


function getRss(url) {
    // это конечно надо в конфиг
    // но и так сойдет. Расширяемости то не предусматриваем
    const wrappedUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`

    return fetch(wrappedUrl)
    .then((response) => {
      if (!response.ok) {
        // тут конечно надо кастомные ошибки сделать, чтобы не магичить c атрибутами
        const error = new Error('error.urlUnavailable');
        error.options = {status: response.status}
        throw error;
      }
      return response.json();
    });
  }

function parseRss(someXml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(someXml, 'application/xml');

  if (xmlDoc.querySelector('parsererror')) {
    throw new Error('error.wrongContent');
  };

  const feedTitle = xmlDoc.querySelector('title')?.textContent;
  const feedDescription = xmlDoc.querySelector('description').textContent;
  const newFeed = {
    'title': feedTitle,
    'description': feedDescription,
  };

  const postsItems = xmlDoc.querySelectorAll('item')
  const posts = Array.from(postsItems).reduce((acc, item) => {
    const newPost = {
      link: item.querySelector('link').textContent,
      title: item.querySelector('title').textContent,
      feed: feedTitle
    };
    acc.push(newPost);
    return acc
  }, [])

  return [newFeed, posts]

}

function addPostsFeeds(state, feed, posts) {
  if (state.feeds.some((el) => el.title === feed.title)) {
    throw new Error('error.alreadySaved');
  }
  state.feeds.push(feed);
  state.posts.push(...posts)
}
