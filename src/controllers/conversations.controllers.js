const { Conversations, Participants, Messages } = require("../models");

const getConversationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversations = await Conversations.findAll({
      where: {
        id,
      },
      include: [Participants, Messages],
    });
    res.status(200).json({
      conversations,
    });
  } catch (error) {
    next(error);
  }
};

const getAllConversationByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversations = await Conversations.findAll({
      include: [
        {
          model: Participants,
          where: {
            userId: id,
          },
        },
      ],
    });
    res.status(200).json({
      conversations,
    });
  } catch (error) {
    next(error);
  }
};

const createConversation = async (req, res, next) => {
  try {
    // body: { createdBy: 2, participant: 4  }
    const { createdBy, participants, type } = req.body;
    // crear la conversacion
    const conversation = await Conversations.create({ createdBy, type });
    // conversation = { id, title, creattedBy, type, createdAt, updatedAt}
    // tomar el id de la conversacion creada y agreagar a los participantes
    const { id } = conversation;
    // agregar a los participantes en la tabla pivote
    const participitantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));
    participitantsArray.push({ userId: createdBy, conversationId: id });
    await Participants.bulkCreate(participitantsArray);

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    // antes de eliminar la conversacion 3
    // elimino todos los registros en participantes que usen ese id
    await Conversations.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversationById,
  getAllConversationByUserId,
  createConversation,
  deleteConversation,
};

// [3, 5, 7, 8, 9]
// tranformar el arreglo de participantes
/* 
[
  { userId: 3, conversationId: id },
  { userId: 5, conversationId: id },
  { userId: 7, conversationId: id },
  { userId: 8, conversationId: id },
  { userId: 9, conversationId: id }
]

const participats = participatns.map(participant => (
  {userId: participant, conversationId: id}
));


*/
