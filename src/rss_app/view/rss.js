import { Modal } from 'bootstrap';
import { rssFormStates, postStates } from '../const.js';
import { markAsRead } from '../controllers/mark_as_read.js';

export function renderRssForm(state, translator) {
    const formState = state.rssForm
    const resultString = document.querySelector('#url-feedback');
    resultString.textContent = '';
    resultString.classList.remove('text-danger');
    resultString.classList.remove('text-success');

    const input = document.querySelector('#url-input');
    input.value = formState.url;
    input.focus();

    if (formState.state === rssFormStates.success) {
        resultString.classList.add('text-success');
        resultString.textContent = translator.t(formState.feedback.code, formState.feedback.options);
    }
    else if (formState.state === rssFormStates.fail) {
        resultString.classList.add('text-danger');
        resultString.textContent = translator.t(formState.feedback.code, formState.feedback.options);
    }
}

export function renderFeedsList(state, translator) {
    const feedsContainer = document.querySelector('.feeds');

    const newChildren = []
    if (state.feeds.length > 0) {
        const title = createTitleCard(translator.t('feeds'));
        newChildren.push(title);
        const feeds = createFeedList(state);
        newChildren.push(feeds);
    }
    feedsContainer.replaceChildren(...newChildren);

}

export function renderPostsList(state, translator) {
    const postsContainer = document.querySelector('.posts');

    const newChildren = []
    if (state.posts.length > 0) {
        const title = createTitleCard(translator.t('posts'));
        newChildren.push(title);
        const posts = createPostsList(state, translator);
        newChildren.push(posts);
    }
    postsContainer.replaceChildren(...newChildren);

}

function createTitleCard(text) {
    const titleCard = document.createElement('div');
    titleCard.classList.add('card-body');
    const title = document.createElement('div');
    title.classList.add('card-title', 'h4')
    title.textContent = text
    titleCard.append(title)
    return titleCard

}

function createFeedList(state) {
    const feedsList = document.createElement('ul')
    feedsList.classList.add('list-group', 'border-0', 'rounded-0')

    state.feeds.forEach((element) => {
        const feedItem = document.createElement('li')
        feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');

        const feedTitle = document.createElement('h3');
        feedTitle.classList.add('h6', 'm-0');
        feedTitle.textContent = element.title;
        feedItem.append(feedTitle);

        const feedDescription = document.createElement('p');
        feedDescription.classList.add('m-0', 'small', 'text-black-50');
        feedDescription.textContent = element.description;
        feedItem.append(feedDescription);

        feedsList.append(feedItem);        
    })
    return feedsList;
}

function createPostsList(state, translator) {
    const postsList = document.createElement('ul')
    postsList.classList.add('list-group', 'border-0', 'rounded-0')

    state.posts.forEach((element) => {
        const postItem = document.createElement('li')
        postItem.classList.add('list-group-item', 'border-0', 'border-end-0', 'd-flex');
        postItem.classList.add('justify-content-between', 'align-items-start');

        const postTitle = document.createElement('a');
        postTitle.classList.add(element.state === postStates.new ? 'fw-bold': 'fw-normal')
        postTitle.setAttribute('href', element.link);
        postTitle.setAttribute('target', '_blank');
        postTitle.setAttribute('rel', 'noopener noreferrer');
        postTitle.textContent = element.title
        postItem.append(postTitle);

        const postButton = document.createElement('button');

        postButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        postButton.textContent = translator.t('rssPostButton');
        postTitle.setAttribute('data-bs-toggle', 'modal');
        postTitle.setAttribute('data-bs-target', '#modal');
        postItem.append(postButton);
        
        postButton.addEventListener('click', (event) => {
            const postNode = event.target.parentElement;
            const titleNode = postNode.querySelector('a');

            markAsRead(state, titleNode.textContent);
            renderModal(state, titleNode.textContent); 

        })

        postsList.append(postItem)
    })
    return postsList;
}

export function renderModal(state, postTitle) {
    const post = state.posts.find(el => el.title === postTitle);

    const modalNode = document.querySelector('#modal');
    const title = modalNode.querySelector('.modal-title');
    title.textContent = post.title;
    const body = modalNode.querySelector('.modal-body');
    const paragraph = document.createElement('p')
    paragraph.textContent = post.description;
    body.append(paragraph);
    const readButton = modalNode.querySelector('.full-article');
    readButton.setAttribute('href', post.link);

    const modal = new Modal(modalNode);
    modal.show();
}