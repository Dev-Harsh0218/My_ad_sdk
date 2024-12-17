const runningAdsRepository = require("../repositories/runningAdsRepository");
const logger = require('../../../core/utils/logger');

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
            return await runningAdsRepository.createMultipleRunningAds(runningAdData);
        } catch(error){
            logger.error(`Service - Create Multiple Running Ads Error: ${error.message}`);
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
