const fs = require('fs');
const inquirer = require('inquirer');

const { constants } = require('../constants');
const { parseObjectToStrings } = require('../global');

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
    return fs.existsSync(".env");
  },

  environmentSelector: (message) => {
    return inquirer
      .prompt([{
        type: 'list',
        name: 'selectedEnv',
        message: message || 'Select an environment:',
        choices: constants.env.list,
      }]);
  },

  promptEnvData: async () => {
    const { selectedEnv } = await env.environmentSelector();
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
      envFile.ACTIVE_ENV = process.env.ACTIVE_ENV || "";
      envFile.OCC_ADMIN_URL = process.env.OCC_ADMIN_URL || "";
      envFile.OCC_APP_KEY = process.env.OCC_APP_KEY || "";
    }

    constants.env.list.forEach((envName) => {
      if (envName == selectedEnv) {
        envFile[`OCC_${envName}_ADMIN_URL`] = adminUrl;
        envFile[`OCC_${envName}_APP_KEY`] = appKey;
      } else {
        envFile[`OCC_${envName}_ADMIN_URL`] =
          process.env[`OCC_${envName}_ADMIN_URL`] || "";
        envFile[`OCC_${envName}_APP_KEY`] =
          process.env[`OCC_${envName}_APP_KEY`] || "";
      }
    });

    fs.writeFileSync(".env", parseObjectToStrings(envFile));
  },

  get: (environment) => {
    if (!environment)
      return {
        selectedEnv: process.env.ACTIVE_ENV || "",
        adminUrl: process.env.OCC_ADMIN_URL || "",
        appKey: process.env.OCC_APP_KEY || "",
      };

    return {
      adminUrl: process.env[`OCC_${environment}_ADMIN_URL`] || "",
      appKey: process.env[`OCC_${environment}_APP_KEY`] || "",
    };
  },

  config: async () => {
    const envData = await env.promptEnvData();
    env.writeEnvFile(envData);
  },

  change: async () => {
    const { selectedEnv } = await env.environmentSelector();
    const { adminUrl, appKey } = env.get(selectedEnv);

    if (!adminUrl || !appKey) {
      console.log(`${selectedEnv} environment is incomplete, use -e option.`);
      return;
    }

    env.writeEnvFile({ selectedEnv, adminUrl, appKey }, true);
  },

  validate: (environment) => {
    if (!env.hasEnv()) return false;

    const { adminUrl, appKey } = env.get(environment);
    return adminUrl && appKey;
  },
};

exports.env = env;