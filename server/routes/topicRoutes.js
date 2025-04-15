const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addTopic, markProblemDone } = require('../controllers/topicController');
const router = express.Router();

router.post('/add', protect, addTopic);
router.put('/mark/:topicId/:problemIndex', protect, markProblemDone);

module.exports = router;
