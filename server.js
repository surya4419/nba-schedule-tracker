require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to fetch upcoming games
app.get('/api/games', async (req, res) => {
  try {
    // Get today's date in IST
    const today = new Date();
    today.setHours(today.getHours() + 5);
    today.setMinutes(today.getMinutes() + 30);
    const startDate = today.toISOString().split('T')[0];

    // Get date 30 days from now
    const endDate = new Date(today.setDate(today.getDate() + 30))
      .toISOString()
      .split('T')[0];

    // Fetch games from balldontlie API
    const response = await axios.get(
      `https://api.balldontlie.io/v1/games?start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          'Authorization': process.env.BALLDONTLIE_API_KEY
        }
      }
    );

    // Format the response data
    const games = response.data.data.map(game => ({
      id: game.id,
      date: game.date,
      homeTeam: game.home_team.full_name,
      visitorTeam: game.visitor_team.full_name,
      status: game.status,
      time: game.time
    }));

    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
