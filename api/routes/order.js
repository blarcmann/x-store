const Order = require("../models/Order");
const {
    verifyToken,
    verifyAdminToken,
    verifyAuthorizeToken,
} = require("../helpers/verifyToken");

const router = require("express").Router();


//init order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//admin:: update order
router.put("/:id", verifyAdminToken, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json({ data: updatedOrder });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json({
            message: 'order not found'
        });
    }
});

//fetch user's orders
router.get("/fetch/:userId", verifyAuthorizeToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json(error);
    }
});


//admin: fetch all orders
router.get("/", verifyAdminToken, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json(error);
    }
});


//admin: monthly income
router.get("/income", verifyAdminToken, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json({ data: income });
    } catch (error) {
        res.status(500).json(error);
    }
});

// admin:: delete order
router.delete("/:id", verifyAdminToken, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
