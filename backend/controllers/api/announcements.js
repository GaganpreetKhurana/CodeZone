const Announcement = require("../../models/announcement");
const Classes = require("../../models/class");
const sanitizer = require('sanitizer')

//to create a new announcement
module.exports.create = async function(req, res) {

    // get subject
    let subject = await Classes.findById(req.body.classroom_id);
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found!",
        });
    }


    if (subject.teachers.includes(req.user._id)) {

        // user is teacher for this subject

        //create announcement object
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
                data: await Classes.findById(
                        req.body.classroom_id)
                    .select("announcements")
                    .populate({
                        path: "announcements",
                        populate: {
                            path: "creator",
                            select: "name",
                        }
                    }),
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Error in creating Announcement!",
            });
        }

    } else {
        return res.status(401).json({
            success: false,
            message: "User is not a teacher in class!",
        });
    }
}

//to delete an announcement
module.exports.delete = async function(req, res) {


    // get announcement
    let announcement = await Announcement.findById(sanitizer.escape(req.param.announcement_id));
    if (!announcement) {
        return res.status(404).json({
            success: false,
            message: "Announcement not found!",
        });
    }
    // get subject
    let subject = await Classes.findById(announcement.class._id);
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found!",
        });
    }


    if (subject.teachers.includes(req.user._id)) {

        // user is a teacher for this subject

        subject.announcements.pop(announcement)
        subject.save();
        Announcement.findByIdAndDelete(announcement._id).exec();

        return res.status(200).json({
            message: "Announcement deleted!",
            success: true,
            data: await Classes.findById(
                    subject._id)
                .select("announcements")
                .populate({
                    path: "announcements",
                    populate: {
                        path: "creator",
                        select: "name",
                    }
                })
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "User is not a teacher in this class!",
        });
    }

}

//to update an announcement
module.exports.update = async function(req, res) {


    // get announcement
    let announcement = await Announcement.findById(req.body.announcement_id);
    if (!announcement) {
        return res.status(404).json({
            success: false,
            message: "Announcement not found!",
        });
    }

    // get subject
    let subject = await Classes.findById(announcement.class._id);
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found!",
        });
    }


    if (subject.teachers.includes(req.user._id) && announcement.user._id == req.user._id) {

        // user is a teacher for this subject
        announcement.content = req.subject.content;
        announcement.save();

        return res.status(200).json({
            message: "Announcement Updated!",
            success: true,
            data: await Classes.findById(
                    subject._id)
                .select("announcements")
                .populate({
                    path: "announcements",
                    populate: {
                        path: "creator",
                        select: "name",
                    }
                })
        });
    } else {
        if (!subject.teachers.includes(req.user._id)) {
            return res.status(401).json({
                success: false,
                message: "User is not a teacher in this class!",
            });
        }
        return res.status(401).json({
            success: false,
            message: "User did not create this announcement!",
        });
    }

}