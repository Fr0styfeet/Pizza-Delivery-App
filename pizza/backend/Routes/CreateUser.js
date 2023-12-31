const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt= require("jsonwebtoken")

const jwtSecret="mynameisanishaandiamagoodgirl9123"

router.post("/createuser",
[  body('email').isEmail(),
body('Name').isLength({ min: 2 }),
body('password','Invalid Password').isLength({ min: 6 })] 
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        await User.create({
            Name:req.body.Name,
            password:req.body.password,
            email: req.body.email,
            location:req.body.location
        })
    res.json({success:true})
    } catch (error) {
        console.log(error)
    res.json({success:false})

    }
})

router.post("/loginuser",[  body('email').isEmail(),
body('password','Invalid Password').isLength({ min: 6 })] ,
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({ errors:"Invalid Email id or Password" });
        }
        if(req.body.password!==userData.password){
            return res.status(400).json({ errors:"Invalid Email id or Password" });
        }
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({ success:true,authToken:authToken });
    } catch (error) {
        console.log(error)
    res.json({success:false})

    }
})


module.exports= router;

