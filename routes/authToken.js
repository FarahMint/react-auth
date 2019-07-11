const express= require('express');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const dotenv = require('dotenv');

//  middleware function we will add to any route we want to be protected/private
 module.exports = function(req, res, next){
    // get token from header
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // verif throw back payload _id --https://jwt.io/
        req.user= verified;
        // go to next function
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
}