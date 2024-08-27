const express = require('express');
const { getComments, addComment } = require('../controllers/commentController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id/comments',authenticateUser, getComments);
router.post('/:id/comments',authenticateUser, addComment);

module.exports = router;
