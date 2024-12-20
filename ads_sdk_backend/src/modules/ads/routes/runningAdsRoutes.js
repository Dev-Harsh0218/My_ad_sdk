const express = require('express');
const router = express.Router();
const runningAdsController = require('../controllers/runningAdsController');

// routes for running ads controller are here

//creating a single running ad
router.post('/create-running-ad',runningAdsController.createRunningAd);
// creating multiple running ads
router.post('/create-running-multiple-ads',runningAdsController.createMultipleRunnningAds);
//getting all running ads
router.get('/get-all-running-ads',runningAdsController.getAllRunningAds);
//deleting a running ad
router.delete('/delete-running-ad',runningAdsController.deactivateRunningAd);
//update impression_count
router.put('/increment-ad-impression',runningAdsController.incrementImpressionCount);
//update click_count
router.put('/increment-ad-click',runningAdsController.incrementClickCount);
//get a random ad based on apkUniquekey
router.get('/apkUniqueKey-get-random-ad',runningAdsController.getRandomAdByApkUniqueKey);
module.exports = router;
