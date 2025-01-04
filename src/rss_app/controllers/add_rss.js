import * as yup from 'yup';
import { rssFormStates, postStates } from '../const.js';
import { getRss, parseRss } from '../rss_utils.js'


export function subscribeToNewRss(url, state) {
  urlSchema
  .validate(url)
  .then(() => getRss(url))
  .then((responseJson) => parseRss(responseJson.contents))
  .then(([feed, posts]) => {
    if (state.feeds.some((el) => el.title === feed.title)) {
      throw new Error('error.alreadySaved');
    }
    state.feeds.push({
      'title': feed.title,
      'description': feed.description,
      'link': url
    });
    posts.forEach(parsedData => {
      state.posts.push({
        link: parsedData.link,
        title: parsedData.title,
        description: parsedData.description,
        feed: feed.title,
        state: postStates.new
      })
    })
    
  })
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



function addPostsFeeds(state, feed, posts) {
}
