const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createJoiner = {
  body: Joi.object().keys({
    identification_number: Joi.number().required(),
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    role: Joi.string().required().valid('SC','EN','SE','ST'),
    stack: Joi.string().required().valid('net','java','python','node'),
    english_level: Joi.string().required().valid('A1', 'A2','B1','B2','C1','C2'),
    domain_experience: Joi.string().required().valid('Low', 'Medium','Advanced'),
  }),
};

const getJoiner = {
  params: Joi.object().keys({
    joinerId: Joi.string().custom(objectId),
  }),
};

const updateJoiner = {
  params: Joi.object().keys({
    joinerId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      last_name: Joi.string(),
      stack: Joi.string().valid('net','java','python','node'),
      role: Joi.string().valid('SC','EN','SE','ST'),
      english_level: Joi.string().valid('A1', 'A2','B1','B2','C1','C2'),
      domain_experience: Joi.string().valid('Low', 'Medium','Advanced')
    })
    .min(1),
};

module.exports = {
  createJoiner,
  getJoiner,
  updateJoiner
};
