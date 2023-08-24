require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const passport = require('passport');

const app = express();
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
app.use(passport.initialize());

// Use middlewares, routes, etc.
// ...

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log('Auth Service running on port ', PORT);
});
