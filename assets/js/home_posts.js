{
    // method to submit the form data for new post using Ajax
    let createPost = function () {
        let newPostForm = $('#new-posts-form');

        new newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                urL: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },
                error: function (error) {
                    console.log(error.resposeText);
                }
            });
        });
    }


    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/<%= post.id%>">x</a>
                </small>
                ${post.content}
            <br>
                <small>
                    ${post.user.name}
                </small>
    </p>
    <div class="post-comments">
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="tyep here to add comment...">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add comment">
            </form>

    <div class="post-comments-list">
    <ul id="post-comments-${post._id}">
    </ul>
    </div>
    </div>
    </li>`)
    }

    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.resposeText);
                }
            });
        });
    }

    createPost();
}