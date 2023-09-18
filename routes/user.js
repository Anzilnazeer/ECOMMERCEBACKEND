const router = require("express").Router();
const userController = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/verifyToken");
router.get("/getUser", verifyToken, userController.getUser);
router.delete("/deleteUser", verifyToken, userController.getDelete);

module.exports = router;
