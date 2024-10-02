const express = require('express');
const router = express.Router();
const media_service = require('../service/media.service');
const {User} = require('../model/index')
const formidable = require("formidable");
const {checkIsAuthorized} = require('../middleware/index')
const {IMG_PATH} = require("../config/constant")

router.post('/',checkIsAuthorized,async (req,res) => {
    try{
        const form = new formidable.IncomingForm();
        let requestFiles,requestFields;
        // console.log("request",req);
        new Promise(async (resolve,reject) => {
            await form.parse(req,async function(err, fields, files){
                if(err){
                    reject(err);
                    throw err;
                }
                if(files.media){
                    requestFiles = files.media[0]
                }
                if(fields){
                    requestFields = {...fields}
                }
                resolve(true);
            })
        }).then(async (paramsList) =>  {
            // console.log("Promise tehn",requestFiles)
            const create_res = await media_service.create(requestFiles,requestFields);
            const user = await User.findById(req.sub._id)
            await User.findByIdAndUpdate(req.sub._id,{
                "profile_images":user.profile_images ? [...user.profile_images, create_res._id]: [create_res._id]
            })
            // return 
            const userProfile = await User.findById(req.sub._id).populate('profile_images')
            console.log(userProfile)
            res.status(200).send({
                // result:user.profile_images,
                result:userProfile.profile_images?.map((each) => `${IMG_PATH}${each.url}`),
                error:null
            })
        }).catch((err) => {
            console.log('media.controller => create func',err);
            res.status(500).send({
                result:null,
                error:err && typeof err === "object"
                    ? err.message :
                    (err && typeof err === "string") ? err
                    : 'Internal server error!'
            })
        })
    }catch(err){
        console.log('media.controller => create func',err);
        res.status(500).send({
            result:null,
            error:err && typeof err === "object"
                    ? err.message :
                    (err && typeof err === "string") ? err
                    : 'Internal server error!'
        })
    }
})

module.exports = router