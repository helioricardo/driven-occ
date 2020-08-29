const fs = require('fs');


module.exports.env = {
  hasEnv: () => {
    return fs.existsSync('.env');
  }
};