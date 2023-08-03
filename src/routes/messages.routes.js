const { Router } = require("express");
const { createMessage } = require("../controllers/messages.controllers");
const { createMessageValidator } = require("../validators/messages.validators");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

//rutas protegidas
router.post("/messages", authenticate, createMessageValidator, createMessage);

module.exports = router;
