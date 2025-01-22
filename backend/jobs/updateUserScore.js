const User = require('../models/user');

const updateUserScore = async (userId, points, prizeWon) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.totalScore += points;
  if (prizeWon) user.prizesWon += 1;

  await user.save();
  return user;
};

module.exports = updateUserScore;
