const router = require("express").Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const newAccount = new User({
            username: req.body.username,
            email: req.body.email,
            admin: req.body.admin,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString(),
        });

        try {
            await newAccount.save();
            res.status(201).json({
                message: 'success'
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: 'error'
            });
        }
    } else {
        res.status(403).json({
            message: 'Email already used'
        })
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json({
                message: "We can't identify this account"
            });
        }
        const passwordHash = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const passwordString = passwordHash.toString(CryptoJS.enc.Utf8);
        if (passwordString !== req.body.password) {
            res.status(401).json({
                message: "Your email or password is wrong"
            });
        }

        const token = jwt.sign(
            {
                admin: user.admin,
                id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "3d" }
        );
        const { password, ...data } = user._doc;
        res.status(200).json({ data, token });
    } catch (err) {
        res.status(500).json({
            err,
            message: 'An error occured'
        });
    }
});

module.exports = router;
