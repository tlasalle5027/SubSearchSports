const apiCalls = {};
const baseUrl = 'http://localhost:4000/api';

/**
 * The following three API calls get counts of Users,
 * Sports and Ads in the system to be displayed dynamically 
 * on the homepage.
 */
apiCalls.getUserCount = () => {
    const url = `${baseUrl}/user/count/`;

    return fetch(url).then(response => {

        if (!response.ok) {
            return new Promise(resolve => resolve(0));
        }

        return response.json().then(jsonResponse => {
            return jsonResponse.count;
        });
    });
}

apiCalls.getSportCount = () => {
    const url = `${baseUrl}/sport/count/`;

    return fetch(url).then(response => {

        if (!response.ok) {
            return new Promise(resolve => resolve(0));
        }

        return response.json().then(jsonResponse => {
            return jsonResponse.count;
        });
    });
}

apiCalls.getAdCount = () => {
    const url = `${baseUrl}/ad/count/`;

    return fetch(url).then(response => {

        if (!response.ok) {
            return new Promise(resolve => resolve(0));
        }

        return response.json().then(jsonResponse => {
            return jsonResponse.count;
        });
    });    
}

export default apiCalls;