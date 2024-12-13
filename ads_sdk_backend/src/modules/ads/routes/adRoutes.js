const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const uploadAssetMiddleware = require('../../../core/middlewares/uploadAsset');

//routes for running ads controller are here
router.post('/upload-ad',uploadAssetMiddleware.single('image'),adController.createAd);
// for multiple uploads of the ads
// router.post('/upload-multiple-ads',uploadAssetMiddleware.array('images',5),adController.createMultipleAds);
router.post('/upload-multiple-ads',adController.createMultipleAds);
//get all ads
router.get('/get-all-ads',adController.getAllAds);
module.exports = router;





// {
//   "ApkUniqueKey": "Flutter App",
//   "adslistData": [
//     {
//       "id": "2fa541fb-954c-4f96-bb1d-35f26a6069cc",
//       "ad_asset_path": "com.as.speakercleaner.png",
//       "app_link": "https://play.google.com/store/apps/details?id=com.as.speakercleaner&hl=en-IN",
//       "is_banner": false,
//       "impression_count": 0,
//       "click_count": 0,
//       "custom": {},
//       "created_at": "2024-12-13T00:39:06.000Z",
//       "updated_at": "2024-12-13T00:39:06.000Z",
//       "deleted_at": null
//     }
//   ]
// }