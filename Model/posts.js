// models/Post.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const PostSchema = new Schema({
  productId: {
    type:  Number
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
