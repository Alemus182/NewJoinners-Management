const { version } = require('../../../package.json');
const config = require('../config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'newJoinners-API',
    version,
    license: {
      name: 'MIT'
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
