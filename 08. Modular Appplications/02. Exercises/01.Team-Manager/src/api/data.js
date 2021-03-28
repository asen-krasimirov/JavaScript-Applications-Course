import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const endpoints = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout',
    allTeams: 'http://localhost:3030/data/teams',
    allUsers: 'http://localhost:3030/data/members',
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


/* member requests */
export async function getMembersByTeamIds(...teamIds) {
    const teams = teamIds[0].map(teamId => '%22' + teamId + '%22').join(',');
    let url = endpoints.allUsers + `?where=teamId%20IN%20(${teams})AND%20status=%22member%22`;
    return await api.getData(url);
}

export async function getAllTeamUsersByTeamId(teamId) {
    let url = endpoints.allUsers + `?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`;
    return await api.getData(url);
}

export async function getUserById(userId) {
    return await api.getData(endpoints.allUsers + '/' + userId);
}

export async function addUserToData(body) {
    return await api.postData(endpoints.allUsers, body);
}

export async function deleteUserFromData(userId) {
    return await api.deleteRequest(endpoints.allUsers + '/' + userId);
}

export async function changeUserStatus(userId, body) {
    return await api.updateRequest(endpoints.allUsers + '/' + userId, body);
}


/* team requests */
export async function getAllTeams() {
    return await api.getData(endpoints.allTeams);
}
export async function getTeamById(id) {
    return await api.getData(endpoints.allTeams + '/' + id);
}

export async function createTeam(body) {
    return await api.postData(endpoints.allTeams, body);
}