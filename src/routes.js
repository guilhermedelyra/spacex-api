const express = require('express');
const launchesRoutes = require('./routes/launchesRouter');

const routes = new express.Router();

routes.use('/launches', launchesRoutes);

module.exports = routes;
