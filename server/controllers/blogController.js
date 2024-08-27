const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username');
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const createBlog = async (req, res) => {
    const { title, excerpt, content,author } = req.body;
    
    try {
        const blog = await Blog.create({
            title,
            excerpt,
            content,
            author:req.user._id,
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error });
        //console.log({error})
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const { title, excerpt, content } = req.body;

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        // Update only the fields that are provided
        if (title !== undefined) blog.title = title;
        if (excerpt !== undefined) blog.excerpt = excerpt;
        if (content !== undefined) blog.content = content;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteBlog = async (req, res) => {

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        if (blog.author.toString()!== req.user._id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={getBlogs,getBlog,createBlog,updateBlog,deleteBlog}