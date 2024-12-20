const Running_ad = require("../models/Running_ads_model");
const Ad = require("../models/Ad_model");
const Registered_apk_key = require("../models/Registered_apk_key");
const logger = require("../../../core/utils/logger");
const { Sequelize } = require('sequelize');

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

  async getRandomAdByApkUniqueKey(app_id){
    try{
        return await Running_ad.findOne({
            where: {
                app_id: app_id,
                is_active: true,
            },
            order: [[Sequelize.fn('RAND')]],
            include: [{ model: Ad },] //{ model: Registered_apk_key }],
        });
    } catch(error) {
        logger.error(`Get Random Ad By Apk Unique Key Error Repository: ${error.message}`);
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

  async getRunningAdById(id) {
    try {
      return await Running_ad.findByPk(id, {
          where: {
              is_active: true,
          },
          // include: [{ model: Ad }, { model: Registered_apk_key }],
      });
  } catch(error) {
      logger.error(`Get Running Ad By Id Error Repository: ${error.message}`);
      throw error;
  }
  },

  async getRunningAdByAppId(appId) {
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

  async incrementRuningAdImpressionCount(id){
    try {
      const result = await Running_ad.increment('impression_count', {
        by: 1,
        where: { id },
      });
      if(result[0][1] !== 1){
        logger.error('Either Ad not found or not updated yet');
        throw new Error('Either Ad not found or not updated yet');
      }
      else{
        return {"message" : "success",id : id};
      } 

    } catch(error){
       logger.error(`Update Impression count Error Repository: ${error.message}`);
       throw error;
    }
  },

  async incrementRunningAdClickCount(id){
    try {
      const result = await Running_ad.increment('click_count', {
        by: 1,
        where: { id },
      });
      if(result[0][1] !== 1){
        logger.error('Either Ad not found or not updated yet');
        throw new Error('Either Ad not found or not updated yet');
      }
      else{
        return {"message" : "success",id : id};
      }
    } catch(error){
       logger.error(`Update Click count Error Repository: ${error.message}`);
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
