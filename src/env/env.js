const fs = require('fs');
const inquirer = require('inquirer');

const { constants } = require('../constants.js');
const { parseObjectToStrings } = require('../global.js');

function promptEnvToSetup(message) {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectedEnv',
        message: message || 'Select an environment:',
        choices: constants.env.list,
      }
    ]);
}

function promptAccessInfo() {
  return inquirer
    .prompt([{
        name: 'adminUrl',
        message: 'Admin URL:',
      },
      {
        name: 'appKey',
        message: 'AppKey:',
      },
    ]);
}

const env = {
  hasEnv: () => {
    return fs.existsSync('.env');
  },

  promptEnvData: async () => {
    const { selectedEnv } = await promptEnvToSetup();
    const { adminUrl, appKey } = await promptAccessInfo();

    return { selectedEnv, adminUrl, appKey };
  },

  writeEnvFile: ({ selectedEnv, adminUrl, appKey }, setEnvironment) => {
    let envFile = {};

    if (selectedEnv && adminUrl && appKey && setEnvironment) {
      envFile.ACTIVE_ENV = selectedEnv;
      envFile.OCC_ADMIN_URL = adminUrl;
      envFile.OCC_APP_KEY = appKey;
    } else {
      envFile.ACTIVE_ENV = process.env.ACTIVE_ENV || '';
      envFile.OCC_ADMIN_URL = process.env.OCC_ADMIN_URL || '';
      envFile.OCC_APP_KEY = process.env.OCC_APP_KEY || '';
    }

    constants.env.list.forEach(envName => {
      if (envName == selectedEnv) {
        envFile[`OCC_${envName}_ADMIN_URL`] = adminUrl;
        envFile[`OCC_${envName}_APP_KEY`] = appKey;
      } else {
        envFile[`OCC_${envName}_ADMIN_URL`] = process.env[`OCC_${envName}_ADMIN_URL`] || '';
        envFile[`OCC_${envName}_APP_KEY`] = process.env[`OCC_${envName}_APP_KEY`] || '';
      }
    });

    fs.writeFileSync('.env', parseObjectToStrings(envFile));
  },

  get: () => (
    {
      selectedEnv: process.env.ACTIVE_ENV || '',
      adminUrl: process.env.OCC_ADMIN_URL || '',
      appKey: process.env.OCC_APP_KEY || ''
    }
  ),

  config: async () => {
    const envData = await env.promptEnvData();
    env.writeEnvFile(envData);
  }
};

exports.env = env;