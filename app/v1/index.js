const express = require('express');

const BatchRouterClass = require('./routes/batch.router')
const BatchControllerClass = require('./controllers/batch.controller')
const BatchServiceClass = require('../services/batch.service')

const httpClient = require('../services/http-client.service')

const app = express();

const batchService = new BatchServiceClass(new httpClient());
const batchController = new BatchControllerClass(batchService);
const batchRouter = new BatchRouterClass(batchController);

batchRouter.init()

/**
 * @swagger
 * /:
 *   post:
 *     description:  Endpoint for everything
 */
app.use('/batch', batchRouter.getRouter());

module.exports = app;