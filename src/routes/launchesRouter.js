const express = require('express');
const LaunchesController = require('../controller/LaunchesController');

const router = new express.Router();

// proximo, ultimo, proximos, lançamentos passados
router.get('/next', LaunchesController.next);
router.get('/latest', LaunchesController.latest);
router.get('/past', LaunchesController.past);
router.get('/upcoming', LaunchesController.upcoming);

module.exports = router;
