const { body, validationResult } = require('express-validator');

const categorias = [
  'Alimentação',
  'Saúde',
  'Moradia',
  'Transporte',
  'Educação',
  'Lazer',
  'Imprevistos',
  'Outras',
];

const despesaValidationRules = [
  body('descricao')
    .isLength({ min: 3 })
    .withMessage('É obrigatório e deve possuir ao menos 3 caracteres'),
  body('valor')
    .isCurrency()
    .withMessage('É obrigatório e deve ser uma únidade monetária válida'),
  body('data').isDate().withMessage('É obrigatório e deve ser uma data válida'),
  body('categoria')
    .optional({ nullable: true })
    .isIn(categorias)
    .withMessage(`Deve possuir um dos seguintes valores: ${categorias}`),
];

const receitaValidationRules = [
  body('descricao')
    .isLength({ min: 3 })
    .withMessage('É obrigatório e deve possuir ao menos 3 caracteres'),
  body('valor')
    .isCurrency()
    .withMessage('É obrigatório e deve ser uma únidade monetária válida'),
  body('data').isDate().withMessage('É obrigatório e deve ser uma data válida'),
];

const usuarioValidationRules = [
  body('nome')
    .isLength({ min: 3 })
    .withMessage('É obrigatório e deve possuir ao menos 3 caracteres'),
  body('email')
    .isEmail()
    .withMessage('É obrigatório e deve ser um e-mail válido'),
  body('senha')
    .isLength({ min: 6 })
    .withMessage('É obrigatório e deve possuir ao menos 6 caracteres'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    status: 400,
    error: 'Bad Request',
    message: 'Houve um erro de validação',
    validation: extractedErrors,
  });
};

module.exports = {
  despesaValidationRules,
  receitaValidationRules,
  usuarioValidationRules,
  validate,
};
