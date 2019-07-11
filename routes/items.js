const express= require('express');
const authToken = require('./authToken')
 
const router = express.Router();
const User = require('../model/UserModel');

// @GET
// @desc register user '/register
router.get('/', authToken, async(req, res)=>{
    // res.json({title:'items one', description:'data you should not access not logged in'})
    // pull out info based on individual user
    // res.send(req.user);
    const user = await User.findOne({id: req.user._id})
    res.send(req.user);
 
    
})

 

module.exports= router;