const Ad = require("../models/Ad_model");
const logger = require('../../../core/utils/logger');
const sequelize = require('sequelize');

const adRepository = {
    async createAd(adData) {
        try {
            return await Ad.create(adData);
        } catch (error) {
            logger.error(`Create Ad Error Repository: ${error.message}`);
            throw error;
        }
    },

    async createMultipleAds(adData) {
        try {
            return await Ad.bulkCreate(adData);
        } catch (error) {
            logger.error(`Create Multiple Ads Error Repository: ${error.message}`);
            throw error;
        }
    },

    async getAllAds() {
        try {
            return await Ad.findAll({
                where: { deleted_at: null }
            });
        } catch (error) {
            logger.error(`Get All Ads Error Repository: ${error.message}`);
            throw error;
        }
    },

    async getRandomAd(){
        try{
            return await Ad.findOne({
                where: { deleted_at: null },
                order: [sequelize.fn('RAND')]
            })
        } catch (error){
            logger.error(`Get Random Ad Error Repository: ${error.message}`);
            throw error;
        }
    },
    
    async incrementAdImpressionCount(id) {
        try{
            const result = await Ad.increment('impression_count', {
                by: 1,
                where: { id }
            });
            if(result[0][1] !== 1){
                logger.error('Either Ad not or not updated yet');
                throw new Error('Either Ad not or not updated yet');
            }
            else{
                return {"message" : "success", id : id};
            }
        } catch(error){
            logger.error(`Increment Impression Count Error Repository: ${error.message}`);
            throw error;
        }
    },

    async incrementAdClickCount(id) {
      try{
        const result = await Ad.increment('click_count', {
          by: 1,
          where: { id }
        });
        if(result[0][1] !== 1){
          logger.error('Either Ad not found or not updated yet');
          throw new Error('Either Ad not found or not updated yet');
        }
        else{
          return {"message" : "success", id : id};
        }
      } catch(error){
        logger.error(`Increment Click Count Error Repository: ${error.message}`);
        throw error;
      }
    },

    async getAdById(id) {
        try {
            const ad = await Ad.findByPk(id);
            if (!ad) {
                throw new Error('Ad not found');
            }
            return ad;
        } catch (error) {
            logger.error(`Get Ad By Id Error Repository: ${error.message}`);
            throw error;
        }
    },

    async updateAdById(id, adData) {
        try {
            const [updated] = await Ad.update(adData, {
                where: { id }
            });
            if (!updated) {
                throw new Error('Ad not found');
            }
            return await Ad.findByPk(id);
        } catch (error) {
            logger.error(`Update Ad Error Repository: ${error.message}`);
            throw error;
        }
    },

    async deleteAdById(id) {
        try {
            const deleted = await Ad.destroy({
                where: { id }
            });
            if (!deleted) {
                throw new Error('Ad not found');
            }
            return deleted;
        } catch (error) {
            logger.error(`Delete Ad Error Repository: ${error.message}`);
            throw error;
        }
    }
};

module.exports = adRepository;
