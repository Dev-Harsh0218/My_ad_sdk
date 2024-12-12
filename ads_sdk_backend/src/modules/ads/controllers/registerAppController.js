const registerAppService = require('../services/registerAppService');

const registerAppController = {
    async registerApp(req, res) {
        try {
            console.log('req.body \n===============================\n',req.body);
            const appData = req.body;
            const result = await registerAppService.registerApp(appData);
            res.status(201).json({
                success: true,
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