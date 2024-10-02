require("dotenv").config()

const IMG_PATH = "http://localhost:5000/static/"
const JWTOBJCMS = {
	algo:process.env.JWTAUTHALGO,
	secret:process.env.JWTAUTHSECRET,
	expiresIn:process.env.JWTAUTHEXPIRY
};


module.exports = {
    JWTOBJCMS:JWTOBJCMS,
		IMG_PATH:IMG_PATH
}
