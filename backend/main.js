const express = require('express');
const mongoose = require('mongoose');
const calculatePoints = require('./jobs/calculatePoints');
const calculatePrize = require('./jobs/calculatePrize');
const updateUserScore = require('./jobs/updateUserScore');
const User = require('./models/user');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cookie-clicker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint to handle button click
app.post('/click', async (req, res) => {
  const { userId } = req.body;
  try {
    const points = calculatePoints();
    const prizeWon = calculatePrize();
    const updatedUser = await updateUserScore(userId, points, prizeWon);

    res.json({
      message: prizeWon ? 'You won a prize!' : `You earned ${points} points!`,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to fetch user data
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/user', async (req, res) => {
  const { username } = req.body;
  try {
    const user = new User({ username, totalScore: 0, prizesWon: 0 });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
