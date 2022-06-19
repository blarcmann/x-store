const User = require("../models/User");
const {
    verifyAdminToken,
    verifyAuthorizeToken,
} = require("../helpers/verifyToken");

const router = require("express").Router();

// update account details
router.put("/:id", verifyAuthorizeToken, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString();
    }
    const user = await User.findById(req.params.id);
    if (user) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            const { password, ...data } = updatedUser._doc;
            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({
            message: 'account not found'
        });
    }
});


// admin::fetch user
router.get("/fetch/:id", verifyAdminToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...data } = user._doc;
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json(error);
    }
});


// admin::fetch all users
router.get("/", verifyAdminToken, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json(error);
    }
});


// admin:: fetch user stats
router.get("/stats", verifyAdminToken, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error);
    }
});


// admin:: delete account
router.delete("/:id", verifyAuthorizeToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
