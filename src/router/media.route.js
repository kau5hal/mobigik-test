const express = require('express');
const router = express.Router();
const media_service = require('../service/media.service');
const {User, Media} = require('../model/index')
const formidable = require("formidable");
const {checkIsAuthorized} = require('../middleware/index')
const {IMG_PATH} = require("../config/constant")
const fs = require('fs')

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


router.get('/',checkIsAuthorized,async (req,res) => {
    try{
        const userProfile = await User.findById(req.sub._id).populate('profile_images')
        console.log(userProfile)
        res.status(200).send({
            // result:user.profile_images,
            result:userProfile.profile_images?.map((each) => {
                return {
                    // ...each,
                    "id":each._id,
                    "url":`${IMG_PATH}${each.url}`
                }
            }),
            error:null
        })
    }catch(err){
        res.status(500).send({
            result:null,
            error:err && typeof err === "object"
                    ? err.message :
                    (err && typeof err === "string") ? err
                    : 'Internal server error!'
        })
    }
})

router.delete('/:id',checkIsAuthorized,async (req,res) => {
    try{
        const userProfile = await User.findOne({
            profile_images: { $in: [req.params.id] },
            _id:req.sub._id
        })
        if(userProfile){
            const media_dtl = await Media.findById(req.params.id)
            if(media_dtl){
                await fs.unlinkSync(`public/${media_dtl.url}`)
                await Media.findByIdAndDelete(req.params.id)
                await User.findByIdAndUpdate(req.sub._id,{
                    "profile_images":userProfile.profile_images.filter((each) => each !== req.params.id)
                })
                // console.log(userProfile)
                res.status(200).send({
                    // result:user.profile_images,
                    result:true,
                    error:null
                })
            }else{
                res.status(500).send({
                    result:null,
                    error:'media not exist!'
                })
            }
            
        }else{
            res.status(500).send({
                result:null,
                error:'media does belongs to you!'
            }) 
        }
        
    }catch(err){
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