import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const endpoints = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout',
    memesURL: 'http://localhost:3030/data/memes',
    recentMemesURL: 'http://localhost:3030/data/memes?sortBy=_createdOn%20desc',
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


/* meme requests */
export async function getMemes() {
    return await api.getData(endpoints.recentMemesURL);
}

export async function getMemeById(id) {
    return await api.getData(endpoints.memesURL + '/' + id);
}

export async function getMemesByUserId(userId) {
    const url = endpoints.memesURL + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    return await api.getData(url);
}

export async function createMeme(body) {
    return await api.postData(endpoints.memesURL, body);
}

export async function deleteMeme(id, body) {
    return await api.deleteRequest(endpoints.memesURL + '/' + id, body);
}

export async function editMeme(id, body) {
    return await api.updateRequest(endpoints.memesURL + '/' + id, body);
}