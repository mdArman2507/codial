const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },
            function(err,comment)
            {
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}

module.exports.destroy=async function(req,res)
{
    try {
       let comment= await Comment.findById(req.params.id)
            if(comment.user==req.user.id)
            {
                let postId=comment.post;
                comment.deleteOne();
               let post=Post.findByIdAndUpdate(postId,{$pull:{
                    comments:req.params.id
                }})
                return res.redirect('back');
            }
            else
            {
                return res.redirect('back');
            }
        
    } catch (error) {
        console.log(error);
        return;
    }
}