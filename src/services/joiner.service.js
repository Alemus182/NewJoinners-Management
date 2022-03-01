const httpStatus = require('http-status');
const { Joiner } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a joinner
 * @param {Object} joinerBody
 * @returns {Promise<Joiner>}
 */
const createJoiner = async (joinerBody) => {
  if (await Joiner.isDocumentTaken(joinerBody.identification_number)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Document number already taken');
  }
  return Joiner.create(joinerBody);
};

/**
 * Update joiner by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Joiner>}
 */
 const updateJoinerById = async (joinerId, updateBody) => {
    const joiner = await getJoinerById(joinerId);
    if (!joiner) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Joiner not found');
    }
    if (updateBody.identification_number && (await Joiner.isDocumentTaken(updateBody.identification_number, joinerId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Document number already taken');
    }
    Object.assign(joiner, updateBody);
    await joiner.save();
    return joiner;
  };

/**
 * Get joiner by id
 * @param {ObjectId} id
 * @returns {Promise<Joiner>}
 */
 const getJoinerById = async (id) => {
    return Joiner.findById(id);
  };


module.exports = {
  createJoiner,
  getJoinerById,
  updateJoinerById
};
