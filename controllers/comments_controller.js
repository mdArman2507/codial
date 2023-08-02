const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
const Like=require('../models/like');

module.exports.create = async function (req, res) {
    try {
        let post =await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            comment=await comment.populate('user','name email');
            commentMailer.newComment(comment);

            //          THIS CODE IS FOR KUE (QUEUE SENDING MAIL)

            let job=queue.create('emails',comment).save(function(err){
                if(err)
                {
                    console.log('error in sending queue',err);
                    return;
                }
                console.log('job enqued',job.id);
            })
            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:'post created'
                });
            }
            req.flash('success','Comment Published');
            return res.redirect('/');
        }
    }
    catch (err) {
        console.log('Error', err);
        req.flash('error','err');
        return res.redirect('/');
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.deleteOne();
            let post = Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });


            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
            
            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"post deleted successfully"
                });
            }

            req.flash('success','Comment Deleted');
            return res.redirect('back');
        }
        else {
            req.flash('error','Not Deleted');
            return res.redirect('back');
        }

    } catch (error) {
        req.flash('error','Error in Deleted');
        return res.redirect('back');
    }
}