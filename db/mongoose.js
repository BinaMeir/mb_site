const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connection String (from environment variables for security)
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Export the connection (optional if needed elsewhere)
module.exports = mongoose.connection;
