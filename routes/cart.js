const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const cartController = require("../controllers/cartControllers");
router.post("/addcart", verifyToken, cartController.addCart);
router.get("/getcart", verifyToken, cartController.getCart);
router.delete("/delete:cartItem", verifyToken, cartController.deleteCart);

module.exports = router;
