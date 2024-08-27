const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authMiddleware');

const { getBlogs, getBlog, createBlog ,updateBlog,deleteBlog} = require('../controllers/blogController');
//const { protect } = require('../middleware/authMiddleware');


router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', authenticateUser, createBlog);
router.put('/:id',authenticateUser, updateBlog);
router.delete('/:id',authenticateUser, deleteBlog);


module.exports = router;
