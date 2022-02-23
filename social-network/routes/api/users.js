const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// access   Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Not valid email').isEmail(),
        check('password', 'Not valid password').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;

        try {
            // If user exists
            let user = await User.findOne({ email});

            if (user) {
                return res.status(400).json({ errors: [{ message: 'User already exists' }]});
            }

            // Get user avatar
            const avatar = gravatar.url(email, {
                s: '200',    //size
                r: 'pg',     //reading
                d: 'mm'     // default
            });

            user = new User({
                name,
                email,
                avatar,
                password
            })

            // Encript password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                }
            }

            // Return jsonwebtoken
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );

        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
})

module.exports = router;
