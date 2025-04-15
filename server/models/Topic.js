const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: String,
  youtubeLink: String,
  leetcodeLink: String,
  articleLink: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
  },
});

const TopicSchema = new mongoose.Schema({
  name: String,
  problems: [ProblemSchema],
});

module.exports = mongoose.model('Topic', TopicSchema);
