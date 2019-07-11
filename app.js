// init server
const express= require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
const itemsRoute = require('./routes/items');

const app = express();

dotenv.config();

//connect to DB
// const url =`mongodb+srv://farahmintt:canada1807@sorturl-5uckq.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true}, ()=> console.log('connected to db'))



//Middleware
app.use(express.json());

//Routes middleware
app.use('/api/user', authRoute);
app.use('/api/items', itemsRoute);

// set port
const PORT = 3000;

// startup server
app.listen(PORT , ()=> console.log(`app run on port ${PORT}`))