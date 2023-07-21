const express=require('express');
const router=express.Router();

const userController=require('../controllers/user_controller');

router.get('/profile',userController.profile);

router.get('/sign-up',userController.singUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
router.post('/create_session',userController.createSession);

module.exports=router;