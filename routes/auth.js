const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../Validation');
const JWT = require('jsonwebtoken');


router.route('/register').post(async (req,res)=>{

    //Validate user data

    const {error} = registerValidation(req.body);
    if(error) res.status(400).send(error.details[0].message);

    //checking the email already exist or not

    const emailExist = await User.findOne({
        email : req.body.email
    })
    if(emailExist) return res.status(400).send('Email already exists!')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
       const savedUser =  await user.save();
       res.status(200).send({ User: savedUser._id});
    } catch (error) {
        res.status(400).send({status: "Failed", error})
    }
})


router.route('/login').post(async (req,res) => {
    
    const {error} = loginValidation(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send("Invalid Email");
    }
    
    //checking the password

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(200).send("Invalid Password!")
    }

    res.send('Logged in!');

    // creating a token

    

})


module.exports = router;