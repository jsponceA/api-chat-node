const { Router } = require("express");
const {
  getConversationById,
  getAllConversationByUserId,
  createConversation,
  deleteConversation,
} = require("../controllers/conversations.controllers");
const {
  createConversationValidator,
} = require("../validators/conversations.validators");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

// rutas protegidas
router.get("/conversation/:id", authenticate, getConversationById);
router.get("/conversations-user/:id", authenticate, getAllConversationByUserId);
router.post(
  "/conversations",
  authenticate,
  createConversationValidator,
  createConversation
);
router.delete("/conversations/:id", authenticate, deleteConversation);

module.exports = router;
