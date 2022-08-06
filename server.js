const express = require('express');
const app = express();

/* import routes */
const authRoute = require('./routes/auth');

/* routes middleware */
app.use('/user', authRoute);

app.listen(3000, ()=>{
    console.log('Server up and running');
})