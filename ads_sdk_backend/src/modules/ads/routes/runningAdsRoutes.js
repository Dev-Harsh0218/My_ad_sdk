const express = require('express');
const router = express.Router();
const runningAdsController = require('../controllers/runningAdsController');

// routes for running ads controller are here
router.post('/create-running-ad',runningAdsController.createRunningAd);
router.post('/create-running-multiple-ads',runningAdsController.createMultipleRunnningAds);
router.get('/get-all-running-ads',runningAdsController.getAllRunningAds);

module.exports = router;
