const { env } = require('./env');

async function start() {
  console.log("start env setup");

  if(!env.hasEnv()) {
    console.log("there is no env file yet, lets fix it");
  }
}

module.exports.start = start;

