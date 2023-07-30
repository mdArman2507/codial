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

router.get('/profile/:id',passport.checkAuthentication,userController.profile);   
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'.users/sign-in'}),userController.createSession);

module.exports=router;