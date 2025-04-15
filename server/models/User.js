const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: String,
  youtubeLink: String,
  codeLink: String,
  articleLink: String,
  level: { type: String}, //, enum: ['Easy', 'Medium', 'Hard'] },
  isCompleted: { type: Boolean, default: false },
});

const topicSchema = new mongoose.Schema({
  name: String,
  problems: [problemSchema],
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  progress: [topicSchema],
});

module.exports = mongoose.model('User', userSchema);
