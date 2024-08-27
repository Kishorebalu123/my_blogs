const Comment = require('../models/Comment');

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const addComment = async (req, res) => {
    const { text } = req.body;
 //   console.log(req.user._id)
    try {
        const comment = await Comment.create({
            text,
            blog: req.params.id,
            author: req.user._id,
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={getComments,addComment}