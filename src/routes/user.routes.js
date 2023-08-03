const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  loginUser,
} = require("../controllers/users.controller");
const {
  loginUserValidator,
  registerUserValidator,
} = require("../validators/users.validators");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

router.post("/users", registerUserValidator, createUser); //
router.post("/login", loginUserValidator, loginUser);

// rutas protegidas
router.get("/users", authenticate, getAllUsers);

module.exports = router;
