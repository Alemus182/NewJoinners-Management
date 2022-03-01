const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { joinerService } = require('../services');
const logger = require('../config/logger');

const createJoiner = catchAsync(async (req, res) => {
  const joiner = await joinerService.createJoiner(req.body);
  res.status(httpStatus.CREATED).send(joiner);
});

const getJoiner = catchAsync(async (req, res) => {
 
  logger.info(req.params.joinerId);
  const user = await joinerService.getJoinerById(req.params.joinerId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'joiner not found');
  }
  res.send(user);
});

const updateJoiner = catchAsync(async (req, res) => {
  const user = await joinerService.updateJoinerById(req.params.joinerId, req.body);
  res.send(user);
});

module.exports = {
  createJoiner,
  getJoiner,
  updateJoiner
};
