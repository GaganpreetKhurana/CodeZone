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
                message: "Error in deleting post!",
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