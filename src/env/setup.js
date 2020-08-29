const { env } = require('./env');

exports.setup = {
  start: async () => {
    console.log("start env setup");

    if (env.hasEnv()) {
      console.log('.env found, delete it and try again or use the -e option.');
      return;
    }

    console.log("There is no env file yet, lets fix it");
    const envData = await env.promptEnvData();
    env.writeEnvFile(envData);
  }
};