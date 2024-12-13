const express = require('express');
const router = express.Router();
const runningAdsController = require('../controllers/runningAdsController');

router.post('/create-running-ad',runningAdsController.createRunningAd);

router.post('/create-running-multiple-ads',runningAdsController.createMultipleRunnningAds);
module.exports = router;
// router.get('/get-all-running-ads',runningAdsController.getAllRunningAds);
