const registerAppService = require('../services/registerAppService');

const registerAppController = {
    async registerApp(req, res) {
        try {
            const appData = req.body;
            const result = await registerAppService.registerApp(appData);
            res.status(200).json({
                success: true,
                message:result.existing? 'App already Registered' : 'App registered successfully',
                data: result
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },


    async getAllApps(req, res) {
        try {
            const apps = await registerAppService.getAllApps();
            res.status(200).json({
                success: true,
                data: apps
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
}  

module.exports = registerAppController