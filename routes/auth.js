const router = require('express').Router();

router.route('/register').post((req,res)=>{
    res.send('Register');
})

router.route('/login').post((req,res)=>{

})

module.exports = router;