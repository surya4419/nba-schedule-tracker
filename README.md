# 🏀 nba-schedule-tracker

A full-stack web application to display upcoming NBA matches using the [BallDontLie API](https://www.balldontlie.io/). Built with React, Express, and Chakra UI. Includes dark/light mode, team logos, and match status.

---

## 🚀 Features

- 📅 Displays upcoming NBA games for the next 30 days
- 🌙 Dark / Light Mode toggle
- 🏀 Team logos, match status, and IST time display
- ⚡ Fast, responsive UI with Chakra UI
- 🔧 Built with Express.js backend and React frontend

---

## 🛠 Tech Stack

**Frontend:** React, Chakra UI, Axios  
**Backend:** Node.js, Express, dotenv  
**API:** [BallDontLie API](https://www.balldontlie.io/)

---

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/surya4419/nba-schedule-tracker.git
cd nba-schedule-tracker


# Backend
npm install
node server.js

# Frontend (if in separate folder)
cd client
npm install

#create .env file
BALLDONTLIE_API_KEY=your_api_key_here
PORT=5000

# Start backend
npm start

# Start frontend
cd client
npm start
