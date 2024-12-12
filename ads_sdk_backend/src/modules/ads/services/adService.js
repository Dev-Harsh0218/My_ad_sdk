const adRepository = require("../repositories/adRepository");
const logger = require('../../../core/utils/logger');

const adService = {
    async createAd(adData) {
        try {
            
            if (!adData.ad_asset_path || !adData.app_link) {
                throw new Error('Missing required fields');
            }

            return await adRepository.createAd(adData);
        } catch (error) {
            logger.error(`Service - Create Ad Error: ${error.message}`);
            throw error;
        }
    },

    async createMultipleAds(adDataList) {
        try{
            if(!Array.isArray(adDataList) || adDataList.length === 0){
                throw new Error('Invalid ad data list');
            }
            //bulk-create only for data in the list we had
            const formattedAdsData = adDataList.map(([isWhite,adAssetPath,appLink])=>({
                ad_asset_path:adAssetPath,
                app_link:appLink,
            }))
            
            return await adRepository.createMultipleAds(formattedAdsData);
        }catch(error){  
            logger.error(`Service - Create Multiple Ads Error: ${error.message}`);
            throw error;
        }
    },

    async getAllAds() {
        try {
            return await adRepository.getAllAds();
        } catch (error) {
            logger.error(`Service - Get All Ads Error: ${error.message}`);
            throw error;
        }
    },

    async getAdById(id) {
        try {
            if (!id) {
                throw new Error('Ad ID is required');
            }
            return await adRepository.getAdById(id);
        } catch (error) {
            logger.error(`Service - Get Ad Error: ${error.message}`);
            throw error;
        }
    },

    async updateAdById(id, adData) {
        try {
            if (!id) {
                throw new Error('Ad ID is required');
            }
            return await adRepository.updateAdById(id, adData);
        } catch (error) {
            logger.error(`Service - Update Ad Error: ${error.message}`);
            throw error;
        }
    },

    async deleteAdById(id) {
        try {
            if (!id) {
                throw new Error('Ad ID is required');
            }
            return await adRepository.deleteAdById(id);
        } catch (error) {
            logger.error(`Service - Delete Ad Error: ${error.message}`);
            throw error;
        }
    }
};

module.exports = adService;
