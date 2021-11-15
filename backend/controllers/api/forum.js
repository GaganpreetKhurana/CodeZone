const Classes = require("../../models/class");
const User = require("../../models/user");
const Post = require("../../models/posts");
const Comment = require("../../models/comments");
const Posts = require("../../models/posts");


//to create a new post
module.exports.create = async function(req, res) {

    // get subject
    let subject = await Classes.findOne({
        subject: req.body.subject,
    });

    // user
    let user = await User.findById(req.user._id);

    if (subject.students.includes(user._id)) {

        // user enrolled in subject

        //create post object
        let newPost = await Posts.create({
            user: req.user._id,
            data: req.body.data,
        });

        // if object created
        if (newPost) {
            newPost.save();
            subject.posts.push(newPost._id);
            subject.save();

            return res.status(201).json({
                message: "Post created successfully",
                success: true,
                data: {
                    data: newPost.data,
                    likes: newPost.likes,
                    comments: newPost.comments,
                    time: newPost.updatedAt,
                    id: newPost._id,
                },
            });
        } else {
            return res.status(400).json({
                message: "Error in creating post!",
            });
        }

    } else {
        return res.status(401).json({
            message: "User is not in class!",
        });
    }
}

//to delete a post
module.exports.delete = async function(req, res) {

    let subject = await Classes.findOne({
        subject: req.body.subject,
    });

    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            message: "Post not found!",
        });
    }
    if (req.user._id == post.user._id) {

        // user created the post

        subject.posts.pop(post._id);
        subject.save();
        Post.findByIdAndDelete(post._id).exec();

        return res.status(200).json({
            message: "Post deleted!",
            success: true,
        });
    } else {
        return res.status(401).json({
            message: "User did not create the post!",
        });
    }
}

//to update a post
module.exports.update = async function(req, res) {

    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            message: "Post not found!",
        });
    }
    if (req.user._id == post.user._id) {

        // user created the post


        post.data = req.body.data;
        post.save();


        return res.status(200).json({
            message: "Post update successfully",
            success: true,
            data: {
                data: post.data,
                likes: post.likes,
                comments: post.comments,
                time: post.updatedAt,
                id: post._id,
            },
        });
    } else {
        return res.status(401).json({
            message: "User did not create the post!",
        });
    }
}


// to like a post
module.exports.like = async function(req, res) {
    // get subject
    let subject = await Classes.findOne({
        subject: req.body.subject,
    });


    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            message: "Post not found!",
        });
    }

    if (subject.students.includes(req.user._id)) {

        // user enrolled in subject

        //like the post
        if (post.likes.includes(req.user._id)) {
            return res.status(401).json({
                message: "Already liked!",
            });
        } else {
            post.likes.push(req.user._id);
            post.save();

            return res.status(201).json({
                message: "Post liked successfully",
                success: true,
                data: {
                    data: post.data,
                    likes: post.likes,
                    comments: post.comments,
                    time: post.updatedAt,
                    id: post._id,
                },
            })
        }

    } else {
        return res.status(401).json({
            message: "User is not in class!",
        });
    }
}

// to dislike a post
module.exports.dislike = async function(req, res) {
    // get subject
    let subject = await Classes.findOne({
        subject: req.body.subject,
    });


    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            message: "Post not found!",
        });
    }

    if (subject.students.includes(req.user._id)) {

        // user enrolled in subject

        //dislike the post
        if (!post.likes.includes(req.user._id)) {
            return res.status(401).json({
                message: "Not liked already!",
            });
        } else {
            post.likes.pop(req.user._id);
            post.save();

            return res.status(201).json({
                message: "Post disliked successfully",
                success: true,
                data: {
                    data: post.data,
                    likes: post.likes,
                    comments: post.comments,
                    time: post.updatedAt,
                    id: post._id,
                },
            })
        }

    } else {
        return res.status(401).json({
            message: "User is not in class!",
        });
    }
}



//to create a new comment
module.exports.createComment = async function(req, res) {

    // get subject
    let subject = await Classes.findOne({
        subject: req.body.subject,
    });

    if (!subject) {
        return res.status(404).json({
            message: "Subject not found!",
        });
    }

    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            message: "Post not found!",
        });
    }

    // user
    let user = await User.findById(req.user._id);


    if (subject.students.includes(user._id)) {

        // user enrolled in subject

        //create comment object
        let newComment = await Comment.create({
            user: req.user._id,
            data: req.body.data,
            post: post,
        });

        // if object created
        if (newComment) {
            newComment.save();
            post.comments.push(newComment._id);
            post.save();

            return res.status(201).json({
                message: "Comment created successfully",
                success: true,
                data: {
                    data: newComment.data,
                    likes: newComment.likes,
                    time: newComment.updatedAt,
                    id: newComment._id,
                    post_id: newComment.post._id
                },
            });
        } else {
            return res.status(400).json({
                message: "Error in adding comment!",
            });
        }

    } else {
        return res.status(401).json({
            message: "User is not in class!",
        });
    }
}

//to delete a comment
module.exports.deleteComment = async function(req, res) {


    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            message: "Post not found!",
        });
    }
    let comment = await Comment.findById(req.body.comment_id);
    if (!comment) {
        return res.status(404).json({
            message: "Comment not found!",
        });
    }
    if (req.user._id == comment.user._id) {

        // user created the comment

        post.comments.pop(post._id);
        post.save();
        Comment.findByIdAndDelete(post._id).exec();

        return res.status(200).json({
            message: "Comment deleted!",
            success: true,
        });
    } else {
        return res.status(401).json({
            message: "User did not create the comment!",
        });
    }
}

//to update a comment
module.exports.updateComment = async function(req, res) {

    let comment = await Comment.findById(req.body.comment_id);
    if (!comment) {
        return res.status(404).json({
            message: "Comment not found!",
        });
    }
    if (req.user._id == comment.user._id) {

        // user created the post


        comment.data = req.body.data;
        comment.save();


        return res.status(200).json({
            message: "Comment updated successfully",
            success: true,
            data: {
                data: comment.data,
                likes: comment.likes,
                comments: comment.comments,
                time: comment.updatedAt,
                id: comment._id,
                post_id: comment.post._id,
            },
        });
    } else {
        return res.status(401).json({
            message: "User did not create the comment!",
        });
    }
}


// to like a comment
module.exports.likeComment = async function(req, res) {
    // get subject
    let subject = await Classes.findOne({
        subject: req.body.subject,
    });

    let comment = await Comment.findById(req.body.comment_id);
    if (!comment) {
        return res.status(404).json({
            message: "Comment not found!",
        });
    }

    if (subject.students.includes(req.user._id)) {

        // user enrolled in subject

        //like the post
        if (comment.likes.includes(req.user._id)) {
            return res.status(401).json({
                message: "Already liked!",
            });
        } else {
            comment.likes.push(req.user._id);
            comment.save();

            return res.status(201).json({
                message: "Comment liked successfully",
                success: true,
                data: {
                    data: comment.data,
                    likes: comment.likes,
                    comments: comment.comments,
                    time: comment.updatedAt,
                    id: comment._id,
                },
            })
        }

    } else {
        return res.status(401).json({
            message: "User is not in class!",
        });
    }
}

// to dislike a comment
module.exports.dislikeComment = async function(req, res) {
    // get subject
    let subject = await Classes.findOne({
        subject: req.body.subject,
    });

    if (!subject) {
        return res.status(404).json({
            message: "Subject not found!",
        });
    }
    let comment = await Comment.findById(req.body.comment_id);
    if (!comment) {
        return res.status(404).json({
            message: "Post not found!",
        });
    }

    if (subject.students.includes(req.user._id)) {

        // user enrolled in subject

        //dislike the comment
        if (!comment.likes.includes(req.user._id)) {
            return res.status(401).json({
                message: "Not liked already!",
            });
        } else {
            comment.likes.pop(req.user._id);
            comment.save();

            return res.status(201).json({
                message: "Comment disliked successfully",
                success: true,
                data: {
                    data: comment.data,
                    likes: comment.likes,
                    comments: comment.comments,
                    time: comment.updatedAt,
                    id: comment._id,
                },
            })
        }

    } else {
        return res.status(401).json({
            message: "User is not in class!",
        });
    }
}