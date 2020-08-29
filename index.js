#!/usr/bin/env node

const program = require('commander');
require("dotenv").config();

const envSetup = require('./src/env/setup.js');


program
  .version(require('./package.json').version)
  .description('A CLI to manage OCC development at Driven.cx.')
  .option('-s, --start', 'start the environment setup')
  .option('-e, --env <operation>', 'start the environment manager [change|config|current]')
  .parse(process.argv);

if (program.start) {
  console.log("--start");
  envSetup.start();
  process.exit(0);
}

if (program.env) {
  switch (program.env) {
    case 'config':
      console.log("--env config");
      break;
    case 'change':
      console.log("--env change");
      break;
    case 'current':
      console.log("--env current");
      break;
    default:
      console.log("The environment operation must be change, config or current");
      break;
  }
  process.exit(0);
}

console.log("Use -h for more information.");