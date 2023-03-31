class BatchController {
    constructor(service) {
        this.service  = service;
    }

    batchRequests({body}, res, next) {
        this.service.batchRequests(body.endpoint, body.payload)
            .then(res.restJson)
            .catch(next)
    }
}

module.exports = BatchController;