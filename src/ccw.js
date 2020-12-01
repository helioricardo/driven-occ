require('dotenv').config();
const childProcess = require('child_process');
const { constants } = require('./constants');

const CCW_BASE_COMMAND = `node ${constants.dcu.paths.ccw} -b ${constants.dcu.paths.src} -n ${process.env.OCC_ADMIN_URL} -k ${process.env.OCC_APP_KEY}`;

const Methods = {
    createWidget: () => {
        childProcess.execSync(`${CCW_BASE_COMMAND} -w`, { stdio: 'inherit' });
    },
    createElement: () => {
        childProcess.execSync(`${CCW_BASE_COMMAND} -e`, { stdio: 'inherit' });
    },
};

exports.ccw = Methods;
