import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const host = 'http://localhost:3030/';

const endpoints = {
    register: host + 'users/register',
    login: host + 'users/login',
    logout: host + 'users/logout',
    sortedListirngsURL: host + 'data/cars?sortBy=_createdOn%20desc',
    listirngsURL: host + 'data/cars',
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


/* listings operations */
export async function getAllListings() {
    return await api.getData(endpoints.sortedListirngsURL);
}

export async function getListingById(listingId) {
    return await api.getData(endpoints.listirngsURL + '/' + listingId);
}


export async function getListingMadeByUser(userId) {
    let url = endpoints.listirngsURL + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    return await api.getData(url);
}

export async function getListingsByYear(year) {
    let url = endpoints.listirngsURL + `?where=year%3D${year}`;
    return await api.getData(url);
}

export async function createListing(body) {
    return await api.postData(endpoints.listirngsURL, body);
}

export async function editListing(listingId, body) {
    return await api.updateRequest(endpoints.listirngsURL + '/' + listingId, body);
}

export async function deleteListing(listingId) {
    return await api.deleteRequest(endpoints.listirngsURL + '/' + listingId);
}