

export function createAPIDialog() {

    async function makeRequest(url, method='get', headers={}, body) {
        
        try {

            if (sessionStorage.authToken) {
                headers['x-authorization'] = sessionStorage.authToken;
            }

            const options = {
                'method': method,
                'headers': headers
            }

            if (body) {
                options['body'] = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            return await response;

        } catch (err) {
            console.error(err.message);
        }
    }

    async function getData(url) {
        return await makeRequest(url, 'get');
    }


    async function postData(url, body) {
        const headers = {
            'Content-Type': 'application/json'
        };
        return await makeRequest(url, 'post', headers, body)
    }

    async function deleteRequest(url) {
        return await makeRequest(url, 'delete');
    }

    async function updateRequest(url, body) {
        return await makeRequest(url, 'put', {}, body);
    }

    return {
        getData,
        postData,
        deleteRequest,
        updateRequest
    }
}
