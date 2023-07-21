const User = require('../models/user');


module.exports.profile = function (req, res) {
    // return res.render('user_profile', {
    //     title: "profile"
    // });
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user){
                if(user)
                {
                    return res.render('user_profile',{
                        title:"User profile",
                        User:user
                    });
                }
                else
                {
                    return res.redirect('/users/sign-in');
                }
           });
        }
        else
        {
            return res.redirect('/users/sign-in');
        }
}

module.exports.singUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "codial | sign Up"
    });
}

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "codial | sign In"
    });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user sing up');
            return;
        }
        if (!user) {
            User.create(req.body,function(err, user){
                if(err) {
                    console.log('error in creating user siging up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}


module.exports.createSession=function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('error in sign-in');
            return;
        }
        if(user)
        {
            if(user.password!=req.body.password)
            {
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            return res.redirect('back');
        }
    });
}