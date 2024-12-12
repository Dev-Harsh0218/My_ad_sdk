const adService = require('../services/adService');
const path = require('path');
const adController = {
    async createAd(req, res) {
        try{
            const { appUrl,isBanner } = req.body;
            if(!appUrl){
                return res.status(400).json({error:"appUrl is required"});
            }
            if(!req.file){
                return res.status(400).json({error:"No image file provided"});
            }

            // below won't work on the server because it is windows specific so use the below to below one
            // const adAssetPath = path.basename(req.file.path).split('images\\')[1];
            const adAssetPath = path.basename(req.file.path);
            const adData={
                ad_asset_path:adAssetPath,
                app_link:appUrl,
                is_banner: Boolean(parseInt(isBanner)),
            }
            //writing to the db here
            await adService.createAd(adData);
            res.status(200).json({success:"Ad created successfully"});
        } catch{
            return res.status(500).json({error:"something went wrong"});
        }   
    },

    // controller for bulk create ad list only for now will update for the
    async createMultipleAds(req,res){
        try{
            const {adsData} = req.body;

            if(!adsData || !Array.isArray(adsData)){
                return res.status(400).json({error:"Valid ads data array is requiredd"});
            }

            await adService.createMultipleAds(adsData);
            res.status(200).json({success:"Ads created successfully"});

        } catch(error){
            res.status(500).json({error:"something went wrong"});
        }
    },

    async getAllAds(req,res){
        try{
            const ads = await adService.getAllAds();

            if(ads){
                res.status(200).json({ads: ads});
            }
            else{
                res.status(200).json([]);
            }
        } catch(error){
            res.status(500).json({error:"Something went wrong"});
        }
    }
}

module.exports = adController