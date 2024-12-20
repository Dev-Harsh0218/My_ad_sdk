const runningAdsService = require('../services/runningAdsService');
const runningAdsController = {
    async createRunningAd(req, res) {
        try {
            const result = await runningAdsService.createRunningAd(req.body);
            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async createMultipleRunnningAds(req, res) {
        try {
            const {app_id,adslistData} = req.body
            if (!app_id || !adslistData) {
                throw new Error('App ID and Ad Id list are required');
            }
            const result = await runningAdsService.createMultipleRunningAds(app_id, adslistData);
            res.status(201).json({
                success: true,
                data: result
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async getRandomAdByApkUniqueKey(req,res){
        try{
            const {apk_unique_key} = req.query;
            const ad = await runningAdsService.getRandomAdByApkUniqueKey(apk_unique_key);
            const transformedResponse ={
                randomImage: ad.Ad.ad_asset_path,
                appurl: ad.Ad.app_link,
                ad_id: ad.id
            }
            res.status(200).json({
                message: "success",
                data: transformedResponse
            });
        }catch(error){
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async getAllRunningAds(req, res) {
        try{
            const ads = await runningAdsService.getAllRunningAds();
            res.status(200).json({
                success: true,
                data: ads
            });
        }catch(error){
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }, 

    async incrementImpressionCount(req,res){
        try{
            const {running_ad_id} = req.body;
            const result = await runningAdsService.incrementImpressionCount(running_ad_id);
            res.status(200).json({
                success: true,
                data: result
            });
        }catch (error){
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async incrementClickCount(req,res){
        try{
            const {running_ad_id} = req.body;
            const result = await runningAdsService.incrementClickCount(running_ad_id);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error){
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async getRunningAdsByAppId(req, res) {
        try {
            const { appId } = req.params;
            const ads = await runningAdsService.getRunningAdsByAppId(appId);
            res.status(200).json({
                success: true,
                data: ads
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async deactivateRunningAd(req, res) {
        try {
            const { id } = req.body;
            await runningAdsService.deactivateRunningAd(id);
            res.status(200).json({
                success: true,
                message: 'Ad deactivated successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = runningAdsController;
