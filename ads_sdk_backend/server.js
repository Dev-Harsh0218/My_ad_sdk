const path = require('path');
const cors = require('cors');
const express = require('express');
const {connectDB, checkDBExists} = require('./src/config/db');
const logger = require('./src/core/utils/logger');
const {PORT} = require('./src/config/env');
//importing routes here
const adRoutes = require('./src/modules/ads/routes/adRoutes');
const appRoutes = require('./src/modules/ads/routes/registerAppRoutes');
const runningAdsRoutes = require('./src/modules/ads/routes/runningAdsRoutes');
//initializing the app
const app = express();

//connecting to the database
connectDB();

//CORS
app.use(cors());


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//static routes
app.use('/images',express.static(path.join(__dirname,'/public/uploads/images')));
app.use('/videos',express.static(path.join(__dirname,'/public/uploads/videos')));


//ad routes
app.use('/api/v1/ads',adRoutes);
//app routes
app.use('/api/v1/apps',appRoutes);
//running-ads Routes
app.use('/api/v1/run-ads',runningAdsRoutes);

//health-ping
app.get('/health-ping',(req,res) => res.status(200).json({success:"this is my server here and this is the health ping here"}));
//starting the server here
app.listen(PORT,()=>{ 
    logger.info(`Server is running on PORT: ${PORT}`) 
});