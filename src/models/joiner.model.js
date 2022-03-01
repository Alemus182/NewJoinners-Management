const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { stacks, roles, domainexperience, englishlevel } = require('../config/parametric');

const joinerSchema = mongoose.Schema(
  {
    identification_number: {
        type:Number,
        unique: true,
        required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    role: {
        type: String,
        enum: roles,
    },
    stack: {
        type: String,
        enum: stacks,
    },
    english_level: {
        type: String,
        enum: englishlevel,
    },
    domain_experience: {
        type: String,
        enum: domainexperience,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
joinerSchema.plugin(toJSON);
joinerSchema.plugin(paginate);


/**
 * Check if email is taken
 * @param {string} identification_number - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 joinerSchema.statics.isDocumentTaken = async function (identification_number, excludeUserId) {
  const user = await this.findOne({ identification_number, _id: { $ne: excludeUserId } });
  return !!user;
};


joinerSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef joinner
 */
const joiner = mongoose.model('joiner', joinerSchema);

module.exports = joiner;
