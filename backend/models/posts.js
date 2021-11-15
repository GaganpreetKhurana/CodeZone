const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema({

    data: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;