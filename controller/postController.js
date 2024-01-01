// controller/postController.js
const { default: mongoose } = require("mongoose");
const Post = require("../Model/posts");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId").populate("productId");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLikes = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({productId: postId}).populate("likedBy");
    res.json({ likes: post? post: {} });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user ? req.user._id : null;

  console.log(userId);

  const postfound = await Post.findOne({ productId: postId })
  // console.log(postfound)
  if (postfound) {
    const userIndex = postfound.likedBy.findIndex(user => user.toString() === userId.toString());
    console.log('index...', userIndex);
    if (userIndex !== -1) {
      // User found in likedBy, meaning the user wants to unlike the post
      postfound.likesCount -= 1;
      postfound.likedBy.splice(userIndex, 1);
      await postfound.save();
      return res.json(postfound);
    } else {
      // User not found in likedBy, meaning the user wants to like the post
      postfound.likesCount += 1;
      postfound.likedBy.push(userId);
      await postfound.save();
      return res.json(postfound);
    }
  }
  const post = await Post.create({
    likedBy:[userId],
    productId: postId,
    likesCount : 1
   })
   return res.json(post)
  
  try {

    
    const post = await Post.findOne();

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Rest of your code for liking the post...
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  getAllPosts,
  getLikes,
  likePost,
};
