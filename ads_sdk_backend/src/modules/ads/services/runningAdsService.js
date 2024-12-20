const runningAdsRepository = require("../repositories/runningAdsRepository");
const logger = require('../../../core/utils/logger');
const adRepository = require("../repositories/adRepository");
const registerAppRepository = require('../repositories/registerAppRepository');

const runningAdsService = {
    async createRunningAd(runningAdData) {
        try {
            if (!runningAdData.app_id || !runningAdData.ad_id) {
                throw new Error('App ID and Ad ID are required');
            }

            return await runningAdsRepository.createRunningAd(runningAdData);
        } catch (error) {
            logger.error(`Service - Create Running Ad Error: ${error.message}`);
            throw error;
        }
    },

    async createMultipleRunningAds(app_id, adsListData) {
        try{
            if(!app_id || !adsListData || !Array.isArray(adsListData)) {
                throw new Error('App ID and Ad Id list are required');
            }
            const runningAdData = adsListData.map(ad => ({
                app_id: app_id,
                ad_id: ad.id
            }));
            const result = await runningAdsRepository.createMultipleRunningAds(runningAdData);
            return result;
        } catch(error){
            logger.error(`Service - Create Multiple Running Ads Error: ${error.message}`);
            throw error;
        }
    },

    async incrementImpressionCount(running_ad_id) {
        if (!running_ad_id) {
            throw new Error('Running Ad ID is required');
        }
        try {
            //get the running ad details to access app_id and ad_id
            const running_ad = await runningAdsRepository.getRunningAdById(running_ad_id);
            if (!running_ad || !running_ad.is_active) {
                throw new Error('Running Ad not found or inactive');
            }
            // console.log("===============================================\n",`Running Ad ID: ${running_ad_id}, App ID: ${running_ad.app_id}, Ad ID: ${running_ad.ad_id}`,"\n======================================");
            const result = await Promise.all([
                runningAdsRepository.incrementRuningAdImpressionCount(running_ad_id),
                adRepository.incrementAdImpressionCount(running_ad.ad_id),
                registerAppRepository.incrementAppImpressionCount(running_ad.app_id)
            ]);
            return result;
        } catch (error) {
            logger.error(`Service - Increment Impression Count Error: ${error.message}`);
            throw error;
        }
    },
    async incrementClickCount(running_ad_id) {
        if (!running_ad_id) {
            throw new Error('Running Ad ID is required');
        }
        try {
            const running_ad = await runningAdsRepository.getRunningAdById(running_ad_id);
            if (!running_ad || !running_ad.is_active) {
                throw new Error('Running Ad not found or inactive');
            }
            // console.log("===============================================\n",`Running Ad ID: ${running_ad_id}, App ID: ${running_ad.app_id}, Ad ID: ${running_ad.ad_id}`,"\n======================================");
            const result = await Promise.all([
                runningAdsRepository.incrementRunningAdClickCount(running_ad_id),
                adRepository.incrementAdClickCount(running_ad.ad_id),
                registerAppRepository.incrementAppClickCount(running_ad.app_id)
            ])
            return result;
        } catch (error) {
            logger.error(`Service - Increment Click Count Error: ${error.message}`);
            throw error;
        }
    },

    async getAllRunningAds() {
        try {
            return await runningAdsRepository.getAllRunningAds();
        } catch (error) {
            logger.error(`Service - Get All Running Ads Error: ${error.message}`);
            throw error;
        }
    },
    
    async getRandomAdByApkUniqueKey(app_id) {
        if (!app_id) {
            throw new Error('Apk Unique Key is required');
        }
        try {
            return await runningAdsRepository.getRandomAdByApkUniqueKey(app_id);
        } catch (error) {
            logger.error(`Service - Get Random Ad By Apk Unique Key Error: ${error.message}`);
            throw error;
        }  
    },
    async getRunningAdsByAppId(appId) {
        try {
            if (!appId) {
                throw new Error('App ID is required');
            }
            return await runningAdsRepository.getRunningAdsByAppId(appId);
        } catch (error) {
            logger.error(`Service - Get Running Ads Error: ${error.message}`);
            throw error;
        }
    },

    async deactivateRunningAd(id) {
        try {
            if (!id) {
                throw new Error('Running Ad ID is required');
            }
            return await runningAdsRepository.deactivateRunningAd(id);
        } catch (error) {
            logger.error(`Service - Deactivate Running Ad Error: ${error.message}`);
            throw error;
        }
    }
};

module.exports = runningAdsService;
