import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const host = 'http://localhost:3030/';

const endpoints = {
    register: host + 'users/register',
    login: host + 'users/login',
    logout: host + 'users/logout',
    allPostsSorted: host + 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    allPosts: host + 'data/ideas'
}


/* authentication requests */
export async function registerUser(body) {
    return await api.postData(endpoints.register, body);
}

export async function loginUser(body) {
    return await api.postData(endpoints.login, body);
}

export async function logOutUser() {
    return await api.getData(endpoints.logout);
}


/* Posts getting requests */
export async function getAllPosts() {
    return await api.getData(endpoints.allPostsSorted);
}

export async function getPostsCount() {
    return await api.getData(endpoints.allPosts + '?count');
}

export async function getPostsBySearchName(name) {
    return await api.getData(endpoints.allPosts + `?where=` + encodeURIComponent(`title LIKE "${name}"`));
}

export async function getPostsByPage(page) {
    return await api.getData(endpoints.allPosts + `?offset=${(page-1) * 3}&pageSize=${3}`);
}

export async function getPostById(postId) {
    return await api.getData(endpoints.allPosts + '/' + postId);
}


/* Posts manipulating requests */
export async function createPost(body) {
    return await api.postData(endpoints.allPosts, body);
}

export async function deletePost(postId) {
    return await api.deleteRequest(endpoints.allPosts + '/' + postId);
}