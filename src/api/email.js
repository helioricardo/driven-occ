const { api } = require('./');
const { env } = require('../env');

const email = {
  download: async () => {
    api.generateToken(env.get());
  }
};

exports.email = email;