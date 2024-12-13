
const RegisterAppRepository = require("../repositories/registerAppRepository");
const logger = require('../../../core/utils/logger');
const e = require("cors");

const registerAppService = {
    async registerApp(appData) {
        try {
            // Enhanced validation with specific error messages
            const requiredFields = ['app_name', 'app_apk_key', 'app_package_name', 'app_version'];
            const missingFields = requiredFields.filter(field => !appData[field]);
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }
            //checking for existing app
            let existingApp;
            try{
                existingApp = await RegisterAppRepository.getAppByPackageName(appData.app_apk_key, appData.app_package_name);
            }catch(error){
                if (error.message === 'App not found') {
                    existingApp = null
                }else{
                    throw error;
                }
            }

            if(existingApp){
                return{
                    existing:true,
                    data:existingApp
                }
            }
            // Add data sanitization
            const sanitizedAppData = {
                ...appData,
                app_name: appData.app_name.trim(),
                app_package_name: appData.app_package_name.toLowerCase().trim(),
                app_version: appData.app_version.trim()
            };

            return await RegisterAppRepository.registerApp(sanitizedAppData);
        } catch (error) { 
            logger.error(`Service - Register App Error: ${error.message}`);
            throw error;
        }
    },

    async getAllApps() {
        try {
            return await RegisterAppRepository.getAllApps();
        } catch (error) {
            logger.error(`Service - Get All Apps Error: ${error.message}`);
            throw error;
        }
    },

    async getAppById(id) {
        try {
            if (!id) {
                throw new Error('App ID is required');
            }
            const app = await RegisterAppRepository.getAppById(id);
            if (!app) {
                throw new Error('App not found');
            }
            return app;
        } catch (error) {
            logger.error(`Service - Get App By Id Error: ${error.message}`);
            throw error;
        }
    },

    async updateAppById(id, appData) {
        try {
            if (!id) {
                throw new Error('App ID is required');
            }
            
            // Validate update data
            const allowedUpdates = ['app_name', 'app_version', 'is_active'];
            const updates = Object.keys(appData);
            const isValidOperation = updates.every(update => allowedUpdates.includes(update));
            
            if (!isValidOperation) {
                throw new Error('Invalid updates');
            }

            return await RegisterAppRepository.updateAppById(id, appData);
        } catch (error) {
            logger.error(`Service - Update App By Id Error: ${error.message}`);
            throw error;
        }
    },

    async deleteAppById(id) {
        try {
            if (!id) {
                throw new Error('App ID is required');
            }
            const app = await RegisterAppRepository.getAppById(id);
            if (!app) {
                throw new Error('App not found');
            }
            return await RegisterAppRepository.deleteAppById(id);
        } catch (error) {
            logger.error(`Service - Delete App By Id Error: ${error.message}`);
            throw error;
        }
    }
};

module.exports = registerAppService;