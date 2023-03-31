const axios = require('axios');
class HttpClientService {

    constructor() {
        this.RESTMethods = {
            GET: 'get',
            POST: 'post',
            PUT: 'put',
            DELETE: 'delete',
        };
    }

    createRequest(url, method, data) {
        if(!this.RESTMethods[method.toUpperCase()]) {
            throw new Error("Unsupported method");
        }
        const options = { url, method, data };

        console.log(`API Request - ${method.toUpperCase()}`);
        console.log(options.url);

        return axios(options);
    }
}

module.exports = HttpClientService;
