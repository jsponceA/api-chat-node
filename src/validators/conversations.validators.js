const { check } = require("express-validator");
const validateResult = require("../middlewares/validate.middleware");

const createConversationValidator = [
  // verificar cada una de las propiedades del req
  check("createdBy", "Error con usuario creador de la conversación")
    .exists()
    .withMessage("Falta el usuario creador de la conversación")
    .notEmpty()
    .withMessage("El usuario creador de la conversación no debe estar vacio")
    .isInt()
    .withMessage("El usuario creador de la conversación no es un entero"),
  check("type", "Error con el tipo de conversación")
    .exists()
    .withMessage("Falta tipo de conversación")
    .notEmpty()
    .withMessage("El tipo de conversación no debe estar vacio"),
  validateResult,
];

module.exports = {
  createConversationValidator,
};
