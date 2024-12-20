const Registered_apk_key = require("../models/Registered_apk_key");
const logger = require('../../../core/utils/logger');
const registerAppRepository = {
    async registerApp(appData) {
        try {
            return await Registered_apk_key.create(appData);
        } catch (error) {
            logger.error(`Register App Error Repository: ${error.message}`);
            throw error;
        }
    },

    async getAllApps() {
        try{
            return await Registered_apk_key.findAll({
                where: { deleted_at: null }
            })
        } catch {
            logger.error(`Get All apps Error Repository: ${error.message}`);
        }
    },

    async getAppByPackageName(app_apk_key,packageName) {
        try {
            const app = await Registered_apk_key.findOne({
                where: {app_apk_key: app_apk_key, app_package_name: packageName }
            });
            if (!app) {
                throw new Error('App not found');
            }
            return app;
        } catch (error) {
            logger.error(`Get App By Package Name Error Repository: ${error.message}`);
            throw error;
        }
    },
    async incrementAppImpressionCount(id) {
        try{
            const result = await Registered_apk_key.increment('app_impressions', {
                by: 1,
                where: { app_id : id }
            });
            if(result[0][1] !== 1){
                logger.error('Either App not or not updated yet');
                throw new Error('Either App not or not updated yet');
            }
            else{
                return {"message" : "success", id : id};
            }
        }catch(error){
            logger.error(`Update Impression Count Error Repository: ${error.message}`);
            throw error;
        }
    },

    async incrementAppClickCount(id) {
        try{
            const result = await Registered_apk_key.increment('app_clicks', {
                by:1,
                where:{app_id : id}
            });
            if(result[0][1] !== 1){
                logger.error('Either App not found or not updated yet');
                throw new Error('Either App not found or not updated yet');
            }else{
                return {"message" : "success", id : id};
            }
        }catch (error){
            logger.error(`Update Click Count Error Repository: ${error.message}`);
            throw error;
        }
    },

    async getAppById(id) {
        try {
            const app = await Registered_apk_key.findByPk(id);
            if (!app) {
                throw new Error('App not found');
            }
            return app;
        } catch (error) {
            logger.error(`Get App By Id Error Repository: ${error.message}`);
            throw error;
        }
    },

    async updateAppById(id, appData) {
        try {
            const [updated] = await Registered_apk_key.update(appData, {
                where: { id }
            });
            if (!updated) {
                throw new Error('App not found');
            }
            return await Registered_apk_key.findByPk(id);
        } catch (error) {
            logger.error(`Update App Error Repository: ${error.message}`);
            throw error;
        }
    },

    async deleteAppById(id) {
        try {
            const deleted = await Registered_apk_key.destroy({
                where: { id }
            });
            if (!deleted) {
                throw new Error('App not found');
            }
            return deleted;
        } catch (error) {
            logger.error(`Delete App Error Repository: ${error.message}`);
            throw error;
        }
    }
}

module.exports = registerAppRepository