const express= require('express');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const dotenv = require('dotenv');

const { registerValidation, loginValidation} = require('./validationJoi')
const User = require('../model/UserModel');

const router = express.Router();


// @POST
// @desc register user '/register
router.post('/register', async(req, res)=>{
    //1- validate data before creating user
   const { error }= registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   
    //2 - check if user already in DB
    const emailIn = await User.findOne({ email : req.body.email});
    if(emailIn)  return res.status(400).send('email already exists');
    
    //3 - hash  password
     // generate salt
     const salt =  await bcrypt.genSalt(10);
     // create hash with salt
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    //4 - create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        // add hash password
        password: hashPwd 
    })
    // 5 - save or send err
    try{
        // save user
        const newuser = await user.save();
        res.send(newuser);

    }catch(err){
        res.status(400).send(err);
    }
})

// @POST
// @desc register user '/register
router.post('/login', async(req, res)=>{
    //1- validate data before log user
    const { error }= loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //2 - check if email exist in DB
    const user = await User.findOne({ email : req.body.email});
    if(!user)  return res.status(400).send('email or password is wrong');
    
    //3 - check if pwd output is correct with  pwd from db
    const validPwd = await bcrypt.compare(req.body.password, user.password) 
    if(!validPwd)  return res.status(400).send('invalid password');

    // 4 - create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        //  add it to headers
        res.header('auth-token', token).send(token);
    
    // res.send('logged in');

})

module.exports= router;