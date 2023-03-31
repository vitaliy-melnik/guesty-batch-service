const express = require('express');

class BatchRouter {
    constructor(controller) {
        this.router = express.Router();
        this.controller = controller;
    }
    init() {
        this.router.post('/', this.controller.batchRequests.bind(this.controller))
    }

    getRouter() {
        return this.router;
    }
}

module.exports = BatchRouter