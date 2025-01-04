import { postStates } from '../const.js';

export function markAsRead(state, postTitle) {
    console.log(postTitle)
    const post = state.posts.find(el => el.title === postTitle);
    console.log(post);
    post.state = postStates.read;
}