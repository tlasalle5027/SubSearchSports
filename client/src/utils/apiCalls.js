const apiCalls = {};
const baseUrl = 'http://localhost:4000/api';

apiCalls.getUserCount = () => {
    const url = `${baseUrl}/user/count/`;

    return fetch(url).then(response => {

        if (!response.ok) {
            return new Promise(resolve => resolve(0));
        }

        return response.json().then(jsonResponse => {
            console.log(jsonResponse.count);
            return jsonResponse.count;
        });
    });
}

export default apiCalls;