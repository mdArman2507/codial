const Post=require('../models/post');
const User=require('../models/user');
module.exports.home= async function(req,res)
{
    
    const posts=await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            res.render('home', {
                title: 'codiel | Home',
                posts: posts,
                all_users:users
              });
        });
    });
}