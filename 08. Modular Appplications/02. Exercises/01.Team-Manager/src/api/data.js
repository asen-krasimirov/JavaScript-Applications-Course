import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const endpoints = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout',
    allTeams: 'http://localhost:3030/data/teams',
}


export async function registerUser(body) {
    return await api.postData(endpoints.register, body);
}

export async function loginUser(body) {
    return await api.postData(endpoints.login, body);
}

export async function logOutUser() {
    return await api.getData(endpoints.logout);
}

export async function getMembersByTeamIds(...teamIds) {
    const teams = teamIds[0].map(teamId => '%22' + teamId + '%22').join(',');
    let url = `http://localhost:3030/data/members?where=teamId%20IN%20(${teams})AND%20status=%22member%22`;
    return await api.getData(url);
}


export async function getAllTeams() {
    return await api.getData(endpoints.allTeams);
}
