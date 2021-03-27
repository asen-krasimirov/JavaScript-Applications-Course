

export function createAPIDialog() {

    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }


    async function postData(url, body) {

        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    async function updateRequest(url, body) {
        try {
            const response = await fetch(url, {
                method: 'put',
                body: body
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteRequest(url) {
        try {
            const response = await fetch(url, {
                method: 'delete',
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    async function authrizedGetRequst(url, authToken) {
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    'X-Authorization': authToken
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    async function authrizedPostRequst(url, body, authToken) {

        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': authToken
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    async function authrizedDeleteRequest(url, authToken) {
        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: {
                    'X-Authorization': authToken
                },
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    async function authrizedUpdateRequest(url, body, authToken) {
        try {
            const response = await fetch(url, {
                method: 'put',
                headers: {
                    'X-Authorization': authToken
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    return {
        getData,
        postData,
        updateRequest,
        deleteRequest,
        authrizedGetRequst,
        authrizedPostRequst,
        authrizedDeleteRequest,
        authrizedUpdateRequest
    }
}


export const api = createAPIDialog();