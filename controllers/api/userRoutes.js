const router = require('express').Router();
const { Router } = require('express');
const User = require('../../models/users');

// Get route for retrieving users
router.get('/', async (req, res) => {
    const userData = await User.findByPk;
    console.log('userData', userData);
    return res.json(userData);
});

router.post('/', async (req, res) => {
    const userData = await User.create(req.params.user);
    return res.json(userData);
});





