import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const host = 'http://localhost:3030/';

const endpoints = {
    register: host + 'users/register',
    login: host + 'users/login',
    logout: host + 'users/logout',
    recentArticlesURL: host + 'data/wiki?sortBy=_createdOn%20desc&distinct=category',
    allArticlesURL: host + 'data/wiki?sortBy=_createdOn%20desc',
    articlesURL: host + 'data/wiki',
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


/* article data requests */
export async function getRecentArticles() {
    return await api.getData(endpoints.recentArticlesURL);
}

export async function getAllArticles() {
    return await api.getData(endpoints.allArticlesURL)
}

export async function getArticleById(articleId) {
    return await api.getData(endpoints.articlesURL + '/' + articleId);
}

export async function getArticlesByTitle(title) {
    let url = endpoints.articlesURL + `?where=title%20LIKE%20%22${title}%22`;
    return await api.getData(url);
}

/* article manipulation requests */
export async function createNewArticle(body) {
    return await api.postData(endpoints.articlesURL, body);
}

export async function deleteArticle(articleId) {
    return await api.deleteRequest(endpoints.articlesURL + '/' + articleId);
}

export async function editArticle(articleId, body) {
    return await api.updateRequest(endpoints.articlesURL + '/' + articleId, body);
}