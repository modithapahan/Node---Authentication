const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../Validation');


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


module.exports = router;