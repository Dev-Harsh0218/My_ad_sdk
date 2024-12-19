const RegisterAppRepository = require("../repositories/registerAppRepository");
const adRepository = require("../repositories/adRepository");
const runningAdsRepository = require("../repositories/runningAdsRepository");
const logger = require("../../../core/utils/logger");
const db = require("../../../config/db");

const registerAppService = {
  /**
   * Registers a new app.
   * @param {Object} appData - app data with the following properties:
   *   - app_name: string
   *   - app_apk_key: string
   *   - app_package_name: string
   *   - app_version: string
   * @returns {Promise<Object>} - a promise that resolves to an object with the following properties:
   *   - existing: boolean - true if the app was already registered, false otherwise
   *   - data: object - the registered app data
   */
  async registerApp(appData) {
    /**
     * Use a transaction to ensure that either all or none of the database operations are committed.
     */
    const transaction = await db.sequelize.transaction();

    try {
      const requiredFields = ["app_name","app_apk_key","app_package_name","app_version"];
      const missingFields = requiredFields.filter((field) => !appData[field] || appData[field].trim() === "");
      if (missingFields.length > 0) {
        throw new Error(
          `Missing or empty required fields: ${missingFields.join(", ")}`
        );
      }

      /**
       * Trim and lowercase the app name and package name
       */
      const sanitizedAppData = {
        ...appData,
        app_name: appData.app_name.trim(),
        app_package_name: appData.app_package_name.toLowerCase().trim(),
        app_version: appData.app_version.trim(),
      };
      
      /**
       * Check if the app already exists in the database
       */
      try {
        const existingApp = await RegisterAppRepository.getAppByPackageName(
            sanitizedAppData.app_apk_key,
            sanitizedAppData.app_package_name,
            { transaction });
            // checking if the app is already registered
            if (existingApp) {
              await transaction.commit();
              return {
                existing: true,
                data: existingApp,
              };
            }

      } catch(error){
              if (error.message === "App not found") {
                  existingApp = null;
              } else {
                  throw error;
              }
      }

      /**
       * Create a new app in the database
       */
      const newApp = await RegisterAppRepository.registerApp(sanitizedAppData, {
        transaction,
      });

      /**
       * Get a random ad from the database
       */
      const randomAd = await adRepository.getRandomAd({ transaction });
      
      if (!randomAd) {
        throw new Error("No ads available in the system");
      }

      /**
       * Create a running ad for the newly created app
       */
      const runningAdData = {
        app_id: newApp.app_id,
        ad_id: randomAd.id,
      };

      await runningAdsRepository.createRunningAd(runningAdData, {
        transaction,
      });

      await transaction.commit();
      //returning the newApp we created here
      return newApp;
    } 
    catch (error) {
      /**
       * Roll back the transaction if any of the database operations failed
       */
      await transaction.rollback();
      logger.error(`Service - Register App Error: ${error.message}`, {
        error_stack: error.stack,
        app_data: appData,
      });
      throw new Error(`Failed to register app: ${error.message}`);
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
        throw new Error("App ID is required");
      }
      const app = await RegisterAppRepository.getAppById(id);
      if (!app) {
        throw new Error("App not found");
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
        throw new Error("App ID is required");
      }

      // Validate update data
      const allowedUpdates = ["app_name", "app_version", "is_active"];
      const updates = Object.keys(appData);
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        throw new Error("Invalid updates");
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
        throw new Error("App ID is required");
      }
      const app = await RegisterAppRepository.getAppById(id);
      if (!app) {
        throw new Error("App not found");
      }
      return await RegisterAppRepository.deleteAppById(id);
    } catch (error) {
      logger.error(`Service - Delete App By Id Error: ${error.message}`);
      throw error;
    }
  },
};

module.exports = registerAppService;
