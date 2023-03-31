const  {retry} = require('../../utils')
const createError = require("http-errors");

class BatchService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    batchRequests(endpoint, payload) {
        const promises = payload.map((item) => {
            const url = normalizeUrl(endpoint.url, item.parameters);
            const promise = () => this.httpClient
                .createRequest(url, this.httpClient.RESTMethods[endpoint.verb], item.requestBody)

            return retry(promise,
                () => {
                    throw createError(503, "Service Unavailable")
                },
                1
            )
        });

        return Promise.all(promises).then((items) => {
            return Promise.resolve(items.map(res => ({ status: res.status })))
        })
    }

}

function normalizeUrl(initialUrl, params) {
    return Object.keys(params).reduce((accum, key) => {
        return accum.replace(`{${key}}`, params[key])
    }, initialUrl);
}

module.exports = BatchService;