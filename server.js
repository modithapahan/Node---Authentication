const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const postRoute = require('./routes/posts');

/* middleware */
const app = express();
app.use(bodyParser.json());

/* Set database connection */
mongoose.connect(process.env.MONGO_DB, ()=>{
    console.log('Database Connected!');
});

/* import routes */
const authRoute = require('./routes/auth');

/* routes middleware */
app.use('/user', authRoute);
app.use('/posts',postRoute);

app.listen(3000, ()=>{
    console.log('Server up and running');
})