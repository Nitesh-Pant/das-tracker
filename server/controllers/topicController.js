const User = require('../models/User');

exports.addTopic = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const topics = Array.isArray(req.body) ? req.body : [req.body];

    topics.forEach(({ topicName, problems }) => {
      const updatedProblems = problems.map(problem => ({
        ...problem,
        isCompleted: false,
      }));

      user.progress.push({
        name: topicName,
        problems: updatedProblems,
      });
    });

    await user.save();

    res.json(user.progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to add topic(s)" });
  }
};

exports.markProblemDone = async (req, res) => {
  const { topicId, problemIndex } = req.params;

  const user = await User.findById(req.user._id);

  const topic = user.progress.id(topicId);
  if (topic) {
    // topic.problems[problemIndex].isCompleted = true;
    topic.problems[problemIndex].isCompleted = !topic.problems[problemIndex].isCompleted;
    await user.save();
    return res.json({ success: true });
  }

  res.status(404).json({ msg: 'Topic not found' });
};
