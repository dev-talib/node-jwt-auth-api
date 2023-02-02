const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
const connectDb = require('./src/config/db');

dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoutes);

//connect db
connectDb();


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
