const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const uploadAssetMiddleware = require('../../../core/middlewares/uploadAsset');

//routes for running ads controller are here
router.post('/upload-ad',uploadAssetMiddleware.single('image'),adController.createAd);
// for multiple uploads of the ads
router.post('/upload-multiple-ads',adController.createMultipleAds);
//get all ads
router.get('/get-all-ads',adController.getAllAds);
//get random ad
router.get('/get-random-ad',adController.getRandomAd);

module.exports = router;
