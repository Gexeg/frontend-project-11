import {getRss, parseRss} from '../rss_utils.js'
import { postStates } from '../const.js';


function updateRss (state) {
    state.feeds.forEach(feed => {
        getRss(feed.link)
        .then((responseJson) => parseRss(responseJson.contents))
        .then(([_, posts]) => {
            const newPosts = posts.filter((newPost) => !state.posts.some((savedPost) => savedPost.title === newPost.title));
            //  TODO дублируется с контроллером, надо в отдельную функцию вынести да и пост в структуру
            newPosts.forEach(parsedData => {
                state.posts.push({
                    link: parsedData.link,
                    title: parsedData.link,
                    description: parsedData.description,
                    feed: feed.title,
                    state: postStates.new
                });
            })
            
        })
        .catch((error) => console.log(error))
    }); 
}

export function startUpdater(state) {
    setTimeout(() => startUpdater(state), 5000);
}