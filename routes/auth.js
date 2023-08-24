// don't forget to change variables in code and in .env file for your project

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const passport = require('passport');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.get('/hello', (req, res) => {
    res.send('Hello World');
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: 'Email not found.' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password.' });

        const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');  // Replace 'YOUR_SECRET_KEY' with a strong secret key
        res.header('auth-token', token).json({ token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/logout', (req, res) => {
    res.header('auth-token', '').send('Logged out');
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/reset-password', async (req, res) => {
    // ... Find user by email ...
    // Generate a reset token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send the reset email
    let mailOptions = {
        from: 'your-email@gmail.com',
        to: req.body.email,
        subject: 'Password Reset',
        text: `Click on this link to reset your password: http://your-frontend-url/reset/${token}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.status(500).send(err);
        else res.send('Email sent: ' + info.response);
    });
});

router.post('/confirm-reset', async (req, res) => {
    try {
        // Validate the token, reset the password
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/authorize/:role', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, 'YOUR_SECRET_KEY');
        const user = await User.findById(verified._id);
        if (user.roles.includes(req.params.role)) {
            res.status(200).json({ authorized: true });
        } else {
            res.status(403).json({ authorized: false });
        }
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
});



// TODO: OAuth


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    // TODO: Handle user data here, either save or find in the database
    // const user = await User.findOrCreate({ googleId: profile.id }, { ... });  // TODO: This is pseudo-code, actual implementation may vary
    done(null, user);
}));

passport.use(new FacebookStrategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: '/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
    // TODO: Handle user data here, either save or find in the database
    // const user = await User.findOrCreate({ facebookId: profile.id }, { ... });  // TODO: This is pseudo-code, actual implementation may vary
    done(null, user);
}));

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Here, you can generate a JWT for the user and send it to the client or redirect to another route.
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send({ token });
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send({ token });
});

module.exports = router;
