const express = require('express');
const router = express.Router();
const media_service = require('../service/media.service');
const formidable = require("formidable");

router.post('/',(req,res) => {
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
            console.log("Promise tehn",requestFiles)
            const create_res = await media_service.create(requestFiles,requestFields);
            res.status(200).send({
                result:create_res,
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