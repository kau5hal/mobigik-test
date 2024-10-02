const {Media} = require('../model/index');
const fs = require('fs');
const path = require('path');
var mv = require('mv');

var publicDir = '../public';
module.exports = {
    async getMediaById(queryId){
        console.log("getMediaById service called",queryId)
        return await Media.findById(queryId);
    },
    async create(requestFiles,requestFields){
        const getTime = new Date().getTime()
        let ext_name = path.extname(requestFiles.originalFilename);
        ext_name = ext_name == ".jpg" || ext_name == ".jpeg" ? ".png" : ext_name;
        if(ext_name == ""){
          ext_name = ".png";
        }
        const filename = `${getTime}${ext_name}`
        var oldpath = requestFiles.filepath;
        newpath = `img/${filename}`;
        return new Promise(async (resolve,reject) => {
            return await mv(oldpath, `public/${newpath}`, async function (err) {
                if (err){
                    reject(err);
                };
                resolve(true);
            })
        }).then(async (responseUrl) => {
            const new_media = new Media({
                url:newpath
            });
            return await new_media.save(new_media);
        }).catch((err) => {
            console.error(err);
            throw err;
        })
    }
}
