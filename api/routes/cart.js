const Cart = require("../models/Cart");
const { verifyToken, verifyAdminToken, verifyAuthorizeToken } = require("../helpers/verifyToken");
const router = require("express").Router();

// init cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});


// add item to cart
router.put("/:id", verifyAuthorizeToken, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json({ data: updatedCart });
    } catch (error) {
        res.status(500).json(error);
    }
});


//fetch cart
router.get("/fetch/:userId", verifyAuthorizeToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json({ data: cart });
    } catch (error) {
        res.status(500).json(error);
    }
});


// clear cart
router.delete("/:id", verifyAuthorizeToken, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json(error);
    }
});


// get all carts
router.get("/", verifyAdminToken, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
