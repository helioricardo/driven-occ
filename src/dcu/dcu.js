const shell = require('shelljs');
require("dotenv").config();

const { constants } = require('../constants.js');
const { mkdirIfNotExists } = require('../global.js');

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
    const shellScript = `${DCU_BASE_COMMAND} -t "${file.replace(/\/$/g, '')}"`;
    shell.exec(shellScript, { async: false });
  },
};

exports.dcu = dcu;