const {JWTOBJCMS} = require("../config/constant")
const JwtToken = require("jsonwebtoken");
const STATUS = require("../config/status").status;


module.exports = {
    async checkIsAuthorized(req,res,next){
        try{
            const token = req.headers.authorization && 
            req.headers.authorization.includes("Bearer ") ? 
            req.headers.authorization.split(" ")[1] : null
            if(!token){
                res.status(STATUS.UNAUTHORIZEDUSER).send({
                    data:null,
                    message: "TOKEN REQUIRED",
                    status: STATUS.UNAUTHORIZEDUSER,
                });
                return
            }
            const isAuthorized = await module.exports.checkToken(token)

            if(!isAuthorized){
                res.status(STATUS.UNAUTHORIZEDUSER).send({
                    data:null,
                    message: "INVALID HEADERS",
                    status: STATUS.UNAUTHORIZEDUSER,
                });
                return 
            }
            req.sub = isAuthorized
            next();
        }catch(err){
            console.log(err);
            res.status(STATUS.INTERNALSERVERERRORSTATUS).send({
                data: null,
                message: err.message ? err.message : "INTERNAL SERVER ERROR",
                status: STATUS.INTERNALSERVERERRORSTATUS,
            });
        }
        
    }, 
    async checkToken(token){
        return JwtToken.verify(token,JWTOBJCMS.secret,{algorithm:JWTOBJCMS.algo},
            (err,result) => {
                if(err){
                    return null
                }
                if(result){
                   return result
                }
            }
        )
    }
}