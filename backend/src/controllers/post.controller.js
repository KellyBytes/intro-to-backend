import { Post } from '../models/post.model.js';

// create a post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age)
      return res.status(400).json({
        message: 'All fields need to be filled!',
      });

    const existing = await Post.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Post already exists!' });
    }

    const post = await Post.create({
      name,
      description,
      age,
    });

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

// get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      posts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

// update a post
const updatePost = async (req, res) => {
  try {
    // basic validation to check if the body is empty
    // { name: x, description: y, age: z } → [name, description, age]
    // JavaScriptでは {} = truthy なので{}は使わない
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'No data provided for update',
      });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post)
      return res.status(400).json({
        message: 'Post not found',
      });

    res.status(200).json({
      message: 'Post updated successfully',
      post,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({
        message: 'Post not found',
      });

    res.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

export { createPost, getPosts, updatePost, deletePost };
