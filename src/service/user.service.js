const Joi = require('joi')
const JwtToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../model/index')

// const genSalt = bcrypt.genSalt(10)

const secret = { algo: "HS256", secret: "mobijik@auth@secret", 
    expiresIn: 60*60
    }

async function generateToken(obj, jwtObj) {
    return await JwtToken.sign(obj, secret.secret, {
    //   expiresIn: secret.expiresIn,
      algorithm: secret.algo,
    });
}

const genSalt = 10
const signUpSchema = Joi.object({
    username:Joi.string().min(6).required(),
    password:Joi.string().min(8).required()
})


module.exports = {
    async signUp(payload){
        const {value, error} = signUpSchema.validate(payload)
        // console.log("value",value)
        // console.log("error",error)
        if(error){
            throw error.message
        }

        const {username, password} = value
        const checkUserExist = await User.findOne({
            "username":username
        })
        if(checkUserExist){
            throw `User exist!`
        }

        const gen_pass = bcrypt.hashSync(password,genSalt)
        const newUser = new User({"username":username,"password":gen_pass})
        await newUser.save()

        const findUser = await User.findOne({
            "username":username
        })
        // console.log(secret)
        const jwt_string = await generateToken(
            JSON.stringify(findUser),
            secret
        );
        return {
            "token":jwt_string
        };
        // return payload
    },

    async login(payload){
        const {value, error} = signUpSchema.validate(payload)
        if(error){
            throw error.message
        }

        const {username, password} = value
        const checkUserExist = await User.findOne({
            "username":username
        })
        const gen_pass = bcrypt.hashSync(password,genSalt)
        if(checkUserExist){
            if(bcrypt.compareSync(password,checkUserExist.password)){
                const jwt_string = await generateToken(
                    JSON.stringify(checkUserExist),
                    secret
                );
                return {
                    "token":jwt_string
                };
            }else{
                throw `invalid password!`
            }
        }else{
            throw `User does not exist!`
        }
    },
}