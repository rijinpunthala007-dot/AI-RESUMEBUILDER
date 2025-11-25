require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/imagekit', require('./routes/imagekit'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/resume', require('./routes/resume'));

app.get('/', (req, res) => {
    res.send('AI Resume Builder API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
