const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/',verify, (req,res)=>{
    res.json({posts: {title: 'my first post', description: 'ramdom data'}})

    /* 
        res.send(req.user);
        User.findOne({_id: req.User})   
    */
})

module.exports = router;
