const express = require('express');
const router = express.Router();
const UserService = require('../service/user.service')

router.post('/signup',async (req, res) => {
    // console.log("req",req.body)
    // res.send('login!')
    try {
        const serviceResponse = await UserService.signUp(req.body)
        res.status(200).json({
            "error":null,
            "result":serviceResponse
        })
    } catch (error) {
        console.log("catch")
        console.log("error",error)
        res.status(400).json({
            "error":error,
            "result":null
        })
    }
})

router.post('/login',async (req, res) => {
    // console.log("req",req.body)
    // res.send('login!')
    try {
        const serviceResponse = await UserService.login(req.body)
        res.status(200).json({
            "error":null,
            "result":serviceResponse
        })
    } catch (error) {
        console.log("catch")
        console.log("error",error)
        res.status(400).json({
            "error":error,
            "result":null
        })
    }
})

module.exports = router