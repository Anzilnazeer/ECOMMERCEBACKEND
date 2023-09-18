const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");
const orderController = require("../controllers/ordersControllers");
router.get("/getOrders", verifyToken, orderController.getUserOrders);

module.exports = router;
