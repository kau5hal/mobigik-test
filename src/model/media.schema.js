const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    url:{
        type:String,
    },
});


module.exports = mongoose.model('Media',MediaSchema);
