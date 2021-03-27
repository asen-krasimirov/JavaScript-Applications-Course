import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const endpoints = {
    allFurniute: 'http://localhost:3030/data/catalog',
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout',
}


export async function getAllFurniture() {
    return await api.getData(endpoints.allFurniute);
}


export async function registerUser(body) {
    return await api.postData(endpoints.register, body);
}


export async function loginUser(body) {
    return await api.postData(endpoints.login, body);
}


export async function logoutUser() {
    return await api.authrizedGetRequst(endpoints.logout, sessionStorage.authToken);
}


export async function addFurniture(body) {
    return await api.authrizedPostRequst(endpoints.allFurniute, body, sessionStorage.authToken);
}


export async function getFurnitureDetails(id) {
    const url = endpoints.allFurniute + '/' + id;
    return await api.getData(url);
}


export async function updateFurniture(id, body) {
    const url = endpoints.allFurniute + '/' + id;
    return await api.authrizedUpdateRequest(url, body, sessionStorage.authToken);
}


export async function deleteFurniture(id) {
    const url = endpoints.allFurniute + '/' + id;
    return await api.authrizedDeleteRequest(url, sessionStorage.authToken);
}


export async function getAllMyFurniture(userId) {
    const url = endpoints.allFurniute + `?where=_ownerId%3D%22${userId}%22`;
    return await api.getData(url);
}
