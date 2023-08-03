const { Messages } = require("../models");

const createMessage = async (req, res, next) => {
  try {
    const { conversationId, content, senderId } = req.body;
    // crear el mensaje
    const message = await Messages.create({
      conversationId,
      content,
      senderId,
    });

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
};
