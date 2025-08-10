

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const notesRoutes = require('./notes');

const app = express();

// CORS for all origins (testing only — lock down in production)
app.use(cors({ origin: '*' }));
app.use(express.json());

// Test route (bypasses Mongo)
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit if DB fails to connect
  });

// Routes
app.use('/api/notes', notesRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
