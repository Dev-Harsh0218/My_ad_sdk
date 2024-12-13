const express = require("express");
const router = express.Router();
const resgisterAppController = require('../controllers/registerAppController');

//register a new-app
router.post('/register-app',resgisterAppController.registerApp);
//get all ads
router.get('/getAllApps',resgisterAppController.getAllApps);


module.exports = router;
