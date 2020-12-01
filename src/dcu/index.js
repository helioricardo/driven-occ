const shell = require('shelljs');
require("dotenv").config();

const { constants } = require('../constants');
const { mkdirIfNotExists } = require('../global');
const { env } = require('../env');

const DCU_BASE_COMMAND = `npx dcu -b ${constants.dcu.paths.src} -n ${process.env.OCC_ADMIN_URL} -k ${process.env.OCC_APP_KEY}`;

const dcu = {
  grab: () => {
    mkdirIfNotExists(constants.dcu.paths.src);

    const shellScript = `${DCU_BASE_COMMAND} -g -c`;
    shell.exec(shellScript, { async: false });
  },

  refresh: (path) => {
    const shellScript = `${DCU_BASE_COMMAND} -e "${path.replace(/\/$/g, '')}"`;
    shell.exec(shellScript, { async: false });
  },

  putAll: path => {
    const shellScript = `${DCU_BASE_COMMAND} -m "${path.replace(/\/$/g, '')}"`;
    shell.exec(shellScript, { async: false });
  },

  put: file => {
    const shellScript = `${DCU_BASE_COMMAND} -t "${file.replace(/\/$/g, '')}" -i`;
    shell.exec(shellScript, { async: false });
  },

  transferAll: async path => {
    const { selectedEnv } = await env.environmentSelector("Select an environment to transfer:");

    if (!env.validate(selectedEnv)) {
      console.log(`${selectedEnv} is not configured.`);
      return;
    }

    const { adminUrl, appKey } = env.get(selectedEnv);
    const dcuBaseCommand = `npx dcu -b ${constants.dcu.paths.src} -n ${adminUrl} -k ${appKey}`;
    const shellScript = `${dcuBaseCommand} -x "${path.replace(/\/$/g, '')}" -o`;
    shell.exec(shellScript, { async: false });
  },

  transfer: async file => {
    const { selectedEnv } = await env.environmentSelector("Select an environment to transfer:");

    if (!env.validate(selectedEnv)) {
      console.log(`${selectedEnv} is not configured.`);
      return;
    }

    const { adminUrl, appKey } = env.get(selectedEnv);
    const dcuBaseCommand = `npx dcu -b ${constants.dcu.paths.src} -n ${adminUrl} -k ${appKey}`;
    const shellScript = `${dcuBaseCommand} -r "${file.replace(/\/$/g, '')}" -o`;
    shell.exec(shellScript, { async: false });
  }
};

exports.dcu = dcu;
