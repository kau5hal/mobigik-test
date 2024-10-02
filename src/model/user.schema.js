const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new  Schema({
    username: {
        type: String, 
        unique: true, 
        required:true
    },
    password: {
        type: String,
        required: true
    },
    profile_images:[{
        type:Schema.Types.ObjectId,
        ref: 'Media'
    }],
});

module.exports = mongoose.model('User',UserSchema);