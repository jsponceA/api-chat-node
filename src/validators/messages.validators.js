const { check } = require("express-validator");
const validateResult = require("../middlewares/validate.middleware");

const createMessageValidator = [
  // verificar cada una de las propiedades del req
  check("conversationId", "Error con el id de la conversación")
    .exists()
    .withMessage("Falta el id de la conversación")
    .notEmpty()
    .withMessage("El id de la conversación no debe estar vacio")
    .isInt()
    .withMessage("El id de la conversación no es un entero"),
  check("content", "Error con el contenido")
    .exists()
    .withMessage("Falta el contenido")
    .notEmpty()
    .withMessage("El contenido no debe estar vacio"),
  check("senderId", "Error con usuario emisor de la conversación")
    .exists()
    .withMessage("Falta el usuario emisor de la conversación")
    .notEmpty()
    .withMessage("El usuario emisor de la conversación no debe estar vacio")
    .isInt()
    .withMessage("El usuario emisor de la conversación no es un entero"),
  validateResult,
];

module.exports = {
  createMessageValidator,
};
