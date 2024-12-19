const Running_ad = require("../models/Running_ads_model");
const Ad = require("../models/Ad_model");
const Registered_apk_key = require("../models/Registered_apk_key");
const logger = require("../../../core/utils/logger");
const runningAdsRepository = {
  async createRunningAd(runningAdData) {
    try {
      return await Running_ad.create(runningAdData);
    } catch (error) {
      logger.error(`Create Running Ad Error Repository: ${error.message}`);
      throw error;
    }
  },

  async createMultipleRunningAds(runningAdData) {
    try {
      const result = await Running_ad.bulkCreate(runningAdData, {
        validate: true,
        updateOnDuplicate: ["is_active", "deleted_at", "updated_at"],
        where: {
          is_active: false,
        },
      });
      return result;
    } catch (error) {
      logger.error(
        `Create Multiple Running Ads Error Repository: ${error.message}`
      );
      throw error;
    }
  },

  async getAllRunningAds() {
    try {
      return await Running_ad.findAll({
        where: {
          is_active: true,
        },
        include: [{ model: Ad }, { model: Registered_apk_key }],
      });
    } catch (error) {
      logger.error(`Get All Running Ads Error Repository: ${error.message}`);
      throw error;
    }
  },

  async getRunningAdsByAppId(appId) {
    try {
      return await Running_ad.findAll({
        where: {
          app_id: appId,
          is_active: true,
        },
        include: [{ model: Ad }, { model: Registered_apk_key }],
      });
    } catch (error) {
      logger.error(`Get Running Ads Error Repository: ${error.message}`);
      throw error;
    }
  },

  async updateImpressionCount(id){
    try{
        if(!id){
            throw new Error('Running Ad ID is required');
        }
        const record = await Running_ad.findByPk(id);
        await record.increment('impression_count');
        await record.reload();
        
        console.log(record);
        return {
            id,
            impression_count: record.impression_count
        };
    } catch(error){
        logger.error(`Error updating impression count: ${error.message}`);
        throw error;
    } 
  },

  async updateRunningAd(id, updateData) {
    try {
      return await Running_ad.update(updateData, {
        where: { id },
      });
    } catch (error) {
      logger.error(`Update Running Ad Error Repository: ${error.message}`);
      throw error;
    }
  },

  async deactivateRunningAd(id) {
    try {
      return await Running_ad.update(
        { is_active: false, deleted_at: new Date() },
        { where: { id } }
      );
    } catch (error) {
      logger.error(`Deactivate Running Ad Error Repository: ${error.message}`);
      throw error;
    }
  },
};

module.exports = runningAdsRepository;
