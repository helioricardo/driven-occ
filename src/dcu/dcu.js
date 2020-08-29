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
  }
};

exports.dcu = dcu;