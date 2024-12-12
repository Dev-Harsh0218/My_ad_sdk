const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const uploadAssetMiddleware = require('../../../core/middlewares/uploadAsset');
const { getAdById } = require('../services/adService');

router.post('/upload-ad',uploadAssetMiddleware.single('image'),adController.createAd);
// for multiple uploads of the ads
// router.post('/upload-multiple-ads',uploadAssetMiddleware.array('images',5),adController.createMultipleAds);
router.post('/upload-multiple-ads',adController.createMultipleAds);
//get all ads
router.get('/get-all-ads',adController.getAllAds);
module.exports = router;