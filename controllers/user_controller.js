const User = require('../models/user');


module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "profile"
    });
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