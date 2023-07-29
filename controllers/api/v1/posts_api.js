const Post=require('../../../models/post');
const comment=require('../../../models/comment');
module.exports.index= async function(req,res)
{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    });
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });


            // if(req.xhr)
            // {
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:"post deleted successfully"
            //     });
            // }

            return res.json(200,{
                message:'post and associated comments delete successfully'
            });
        // }
        // else {
        //     req.flash('error','Not Deleted');
        //     return res.redirect('back');
        // }
    }
    catch (err) {
        // req.flash('error','Error in Deleted');
        return res.json(500,{
            message:"Internal sever error"
        });
    }
}