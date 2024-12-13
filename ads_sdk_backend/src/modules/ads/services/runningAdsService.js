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
    // async createMultipleRunningAds(app_id, adsListData) {
    //     try {
    //         console.log("Inside service - creating multiple running ads");
    //         if (!app_id || !adsListData || !Array.isArray(adsListData)) {
    //             throw new Error('Invalid input data');
    //         }

    //         const runningAdsData = adsListData.map(ad => ({
    //             app_id: app_id,
    //             ad_id: ad.id,
    //             custom: ad.custom || {}
    //         }));

    //         return await runningAdsRepository.createBulkRunningAds(runningAdsData);
    //     } catch (error) {
    //         logger.error(`Service - Create Multiple Running Ads Error: ${error.message}`);
    //         throw error;
    //     }
    // },

    async createMultipleRunningAds(app_id, adsListData) {
        try{
            console.log('\ninside the service function here\n');
            console.log("==========================================\n",app_id,adsListData)
            if(!app_id || !adsListData || !Array.isArray(adsListData)) {
                throw new Error('App ID and Ad Id list are required');
            }

            const runningAdData = adsListData.map(ad => ({
                app_id: app_id,
                ad_id: ad.id
            }));
            console.log("Running Ad Data",runningAdData);
            return await runningAdsRepository.createMultipleRunningAds(runningAdData);
        } catch(error){
            logger.error(`Service - Create Multiple Running Ads Error: ${error.message}`);
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
