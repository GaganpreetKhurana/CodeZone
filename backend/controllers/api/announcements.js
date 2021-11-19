const Announcement = require("../../models/announcement");
const Classes = require("../../models/class");

//to create a new post
module.exports.create = async function(req, res) {

    // get subject
    let subject = await Classes.findById(req.body.classroom_id);
    if (!subject) {
        return res.status(404).json({
            message: "Subject not found!",
        });
    }


    if (subject.teachers.includes(req.user._id)) {

        // user enrolled in subject

        //create post object
        let newAnnouncement = await Announcement.create({
            creator: req.user._id,
            content: req.body.content,
            class: subject,
        })

        // if object created
        if (newAnnouncement) {
            newAnnouncement.save()
            subject.announcements.push(newAnnouncement)
            subject.save();

            return res.status(201).json({
                message: "Announcement created successfully",
                success: true,
                data: {
                    content: newAnnouncement.content,
                    time: newAnnouncement.updatedAt,
                    id: newAnnouncement._id,
                },
            });
        } else {
            return res.status(400).json({
                message: "Error in creating Announcement!",
            });
        }

    } else {
        return res.status(401).json({
            message: "User is not a teacher in class!",
        });
    }
}

//to delete a post
module.exports.delete = async function(req, res) {

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
    if (req.user._id == post.user._id || subject.teachers.includes(req.user._id)) {

        // user created the post

        subject.posts.pop(post._id);
        subject.save();

        for (let index = post.comments.length - 1; index > -1; index--) {
            console.log(post.comments[index]);

            Comment.findByIdAndDelete(post.comments[index]._id);
        }
        console.log("comments deleted!");
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