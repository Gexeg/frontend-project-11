import {getRss, parseRss} from '../rss_utils.js'

function updateRss (state) {
    state.feeds.forEach(feed => {
        getRss(feed.link)
        .then((responseJson) => parseRss(responseJson.contents))
        .then(([_, posts]) => {
            const newPosts = posts.filter((newPost) => !state.posts.some((savedPost) => savedPost.title === newPost.title));
            state.posts.push(...newPosts);
        })
        .catch((error) => console.log(error))
    }); 
}

export function startUpdater(state) {
    console.log('Update started');
    updateRss(state);
    console.log(JSON.stringify(state, null, 2))
    setTimeout(() => startUpdater(state), 5000);
}