const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema({

    data: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;