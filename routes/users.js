const express=require('express');
const router=express.Router();

const userController=require('../controllers/user_controller');
const Passport=require('passport');
const passport = require('passport');

// router.get('/profile',userController.profile);

router.get('/sign-up',userController.singUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    ),
    userController.createSession);

router.get('/profile',passport.checkAuthentication,userController.profile);   
router.get('/sign-out',userController.destroySession);


module.exports=router;