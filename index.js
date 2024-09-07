const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
require('./db/mongoose');
const mainRouter = require('./routes/mainRouter');

const corsOptions = {
  origin: '*', // change in production!!!!!!!
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Serve static files from the 'client-build' directory
app.use(express.static(path.join(__dirname +'/public')));

app.use(express.json());

app.use('/', mainRouter);

// Catch-all route to serve React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
