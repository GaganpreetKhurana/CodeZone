const Classes = require("../../models/class");
const User = require("../../models/user");
const Post = require("../../models/posts");
const Comment = require("../../models/comments");
const sanitizer = require('sanitizer')

//to create a new post
module.exports.create = async function(req, res) {

    // get subject
    let subject = await Classes.findById(req.body.classroom_id);
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found!",
        });
    }

    // user
    let user = await User.findById(req.user._id);

    if (subject.students.includes(user._id) || subject.teachers.includes(req.user._id)) {

        // user enrolled in subject

        //create post object
        let newPost = await Post.create({
            user: req.user._id,
            content: req.body.content,
        });

        // if object created
        if (newPost) {
            newPost = await newPost.save();
            subject.posts.push(newPost._id);
            subject = await subject.save();

            return res.status(201).json({
                message: "Post created successfully",
                success: true,
                data: await Classes.findById(
                        req.body.classroom_id)
                    .select("posts")
                    .populate(
                        "posts",
                        "content updatedAt user comments likes")
                    .populate({
                        path: "posts",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            select: "content updatedAt user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "likes",
                            select: "user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "user",
                                select: "name role",
                            }
                        },

                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "likes",
                                select: "users",
                            },
                            options: {
                                sort: { createdAt: -1 }
                            }
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    })
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error in creating post!",
            });
        }

    } else {
        return res.status(401).json({
            success: false,
            message: "User is not in class!",
        });
    }
}

//to delete a post
module.exports.delete = async function(req, res) {


    let post = await Post.findById(sanitizer.escape(req.params.post_id));
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!",
        });
    }

    // get subject
    let subject = await Classes.findById(post.class._id);
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found!",
        });
    }
    if (req.user._id == post.user._id || subject.teachers.includes(req.user._id)) {

        // user created the post

        subject.posts.pop(post._id);
        subject = await subject.save();

        for (let index = post.comments.length - 1; index > -1; index--) {
            console.log(post.comments[index]);

            Comment.findByIdAndDelete(post.comments[index]._id).exec();
        }
        console.log("comments deleted!");
        Post.findByIdAndDelete(post._id).exec();

        return res.status(200).json({
            message: "Post deleted!",
            success: true,
            data: await Classes.findById(
                    subject._id)
                .select("posts")
                .populate(
                    "posts",
                    "content updatedAt user comments likes")
                .populate({
                    path: "posts",
                    populate: {
                        path: "user",
                        select: "name role",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        select: "content updatedAt user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "likes",
                        select: "user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    },

                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "likes",
                            select: "users",
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    },
                    options: {
                        sort: { createdAt: -1 }
                    }
                })
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "User did not create the post!",
        });
    }
}

//to update a post
module.exports.update = async function(req, res) {

    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!",
        });
    }
    if (req.user._id == post.user._id) {

        // user created the post
        post.content = req.body.content;
        post = await post.save();


        return res.status(200).json({
            message: "Post update successfully",
            success: true,
            data: await Classes.findById(
                    post.class._id)
                .select("posts")
                .populate(
                    "posts",
                    "content updatedAt user comments likes")
                .populate({
                    path: "posts",
                    populate: {
                        path: "user",
                        select: "name role",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        select: "content updatedAt user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "likes",
                        select: "user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    },

                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "likes",
                            select: "users",
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    },
                    options: {
                        sort: { createdAt: -1 }
                    }
                }),
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "User did not create the post!",
        });
    }
}


// to like/dislike a post
module.exports.like = async function(req, res) {

    let post = await Post.findById(sanitizer.escape(req.params.post_id));
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!",
        });
    }

    // get subject
    let subject = await Classes.findById(post.class._id);

    if (subject.students.includes(req.user._id) || subject.teachers.includes(req.user._id)) {

        // user enrolled in subject

        //like the post
        if (post.likes.includes(req.user._id)) {
            post.likes.pop(req.user._id);
            post = await post.save();

            return res.status(201).json({
                message: "Post disliked successfully",
                success: true,
                data: await Classes.findById(
                        subject._id)
                    .select("posts")
                    .populate(
                        "posts",
                        "content updatedAt user comments likes")
                    .populate({
                        path: "posts",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            select: "content updatedAt user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "likes",
                            select: "user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "user",
                                select: "name role",
                            }
                        },

                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "likes",
                                select: "users",
                            },
                            options: {
                                sort: { createdAt: -1 }
                            }
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    })
            })
        } else {
            post.likes.push(req.user._id);
            post = await post.save();

            return res.status(201).json({
                message: "Post liked successfully",
                success: true,
                data: await Classes.findById(
                        subject._id)
                    .select("posts")
                    .populate(
                        "posts",
                        "content updatedAt user comments likes")
                    .populate({
                        path: "posts",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            select: "content updatedAt user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "likes",
                            select: "user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "user",
                                select: "name role",
                            }
                        },

                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "likes",
                                select: "users",
                            },
                            options: {
                                sort: { createdAt: -1 }
                            }
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    })
            })
        }

    } else {
        return res.status(401).json({
            success: false,
            message: "User is not in class!",
        });
    }
}


//to create a new comment
module.exports.createComment = async function(req, res) {


    let post = await Post.findById(req.body.post_id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!",
        });
    }

    // get subject
    let subject = await Classes.findById(post.class._id);

    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found!",
        });
    }

    // user
    let user = await User.findById(req.user._id);


    if (subject.students.includes(user._id) || subject.teachers.includes(req.user._id)) {

        // user enrolled in subject

        //create comment object
        let newComment = await Comment.create({
            user: req.user,
            content: req.body.content,
            post: post,
        });

        // if object created
        if (newComment) {
            newComment = await newComment.save();
            post.comments.push(newComment._id);
            post = await post.save();

            return res.status(201).json({
                message: "Comment created successfully",
                success: true,
                data: await Classes.findById(
                        subject._id)
                    .select("posts")
                    .populate(
                        "posts",
                        "content updatedAt user comments likes")
                    .populate({
                        path: "posts",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            select: "content updatedAt user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "likes",
                            select: "user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "user",
                                select: "name role",
                            }
                        },

                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "likes",
                                select: "users",
                            },
                            options: {
                                sort: { createdAt: -1 }
                            }
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    }),
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error in adding comment!",
            });
        }

    } else {
        return res.status(401).json({
            success: false,
            message: "User is not in class!",
        });
    }
}

//to delete a comment
module.exports.deleteComment = async function(req, res) {

    let comment = await Comment.findById(sanitizer.escape(req.params.comment_id));
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found!",
        });
    }

    let post = await Post.findById(comment.post._id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!",
        });
    }

    // get subject
    let subject = await Classes.findById(post.class._id);

    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found!",
        });
    }



    if (req.user._id == comment.user._id || subject.teachers.includes(req.user._id)) {

        // user created the comment

        post = await post.comments.pop(post._id);
        post = await post.save();
        Comment.findByIdAndDelete(post._id).exec();

        return res.status(200).json({
            message: "Comment deleted!",
            success: true,
            data: await Classes.findById(
                    subject.classroom_id)
                .select("posts")
                .populate(
                    "posts",
                    "content updatedAt user comments likes")
                .populate({
                    path: "posts",
                    populate: {
                        path: "user",
                        select: "name role",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        select: "content updatedAt user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "likes",
                        select: "user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    },

                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "likes",
                            select: "users",
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    },
                    options: {
                        sort: { createdAt: -1 }
                    }
                })
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "User did not create the comment!",
        });
    }
}

//to update a comment
module.exports.updateComment = async function(req, res) {

    let comment = await Comment.findById(req.body.comment_id);

    let post = await Post.findById(comment.post._id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!",
        });
    }

    // get subject
    let subject = await Classes.findById(post.class._id);

    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found!",
        });
    }
    if (req.user._id == comment.user._id) {

        // user created the comment
        comment.content = req.body.content;
        comment = await comment.save();


        return res.status(200).json({
            message: "Comment updated successfully",
            success: true,
            data: await Classes.findById(
                    subject._id)
                .select("posts")
                .populate(
                    "posts",
                    "content updatedAt user comments likes")
                .populate({
                    path: "posts",
                    populate: {
                        path: "user",
                        select: "name role",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        select: "content updatedAt user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "likes",
                        select: "user",
                    }
                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    },

                })
                .populate({
                    path: "posts",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "likes",
                            select: "users",
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    },
                    options: {
                        sort: { createdAt: -1 }
                    }
                }),
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "User did not create the comment!",
        });
    }
}


// to like/dislike a comment
module.exports.likeComment = async function(req, res) {

    let comment = await Comment.findById(sanitizer.escape(req.params.comment_id));
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found!",
        });
    }
    let post = await Post.findById(comment.post._id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found!",
        });
    }

    // get subject
    let subject = await Classes.findById(post.class._id);


    if (subject.students.includes(req.user._id) || subject.teachers.includes(req.user._id)) {

        // user enrolled in subject

        //like the post
        if (comment.likes.includes(req.user._id)) {
            comment.likes.pop(req.user._id);
            comment = await comment.save();

            return res.status(201).json({
                message: "Comment disliked successfully",
                success: true,
                data: await Classes.findById(
                        subject._id)
                    .select("posts")
                    .populate(
                        "posts",
                        "content updatedAt user comments likes")
                    .populate({
                        path: "posts",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            select: "content updatedAt user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "likes",
                            select: "user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "user",
                                select: "name role",
                            }
                        },

                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "likes",
                                select: "users",
                            },
                            options: {
                                sort: { createdAt: -1 }
                            }
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    }),
            })
        } else {
            comment.likes.push(req.user._id);
            comment = await comment.save();

            return res.status(201).json({
                message: "Comment liked successfully",
                success: true,
                data: await Classes.findById(
                        req.body.classroom_id)
                    .select("posts")
                    .populate(
                        "posts",
                        "content updatedAt user comments likes")
                    .populate({
                        path: "posts",
                        populate: {
                            path: "user",
                            select: "name role",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            select: "content updatedAt user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "likes",
                            select: "user",
                        }
                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "user",
                                select: "name role",
                            }
                        },

                    })
                    .populate({
                        path: "posts",
                        populate: {
                            path: "comments",
                            populate: {
                                path: "likes",
                                select: "users",
                            },
                            options: {
                                sort: { createdAt: -1 }
                            }
                        },
                        options: {
                            sort: { createdAt: -1 }
                        }
                    }),
            })
        }

    } else {
        return res.status(401).json({
            success: false,
            message: "User is not in class!",
        });
    }
}