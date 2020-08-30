#!/usr/bin/env node

const program = require('commander');
require("dotenv").config();

const env = {
  setup: require('./src/env/setup.js').setup,
  get: require('./src/env/env.js').env.get,
  config: require('./src/env/env.js').env.config,
  change: require('./src/env/env.js').env.change,
  validate: require('./src/env/env.js').env.validate
};

const { dcu } = require('./src/dcu/dcu.js');

function showHelpAndExit() {
  program.help();
  process.exit(1);
}

program
  .version(require('./package.json').version)
  .description('A CLI to manage OCC development at Driven.cx.')
  .option('-s, --start',               'env: start the environment setup')
  .option('-e, --env <operation>',     'env: start the environment manager [change|config|current]')
  .option('-g, --grab',                'dcu: start grab on the current environment')
  .option('-r, --refresh <path>',      'dcu: refresh path')
  .option('-pa, --putAll <path>',      'dcu: upload the entire path')
  .option('-p, --put <file>',          'dcu: upload a file')
  .option('-t, --transfer <file>',     'dcu: transfer the file between current and target environment')
  .option('-ta, --transferAll <path>', 'dcu: transfer the entire path between current and target environment')
  .on('command:*', () => { showHelpAndExit(); })
  .parse(process.argv);

const emptyCommand = (process.argv.length == 2);
if (emptyCommand) showHelpAndExit();

if (program.start) {
  console.log("--start");
  env.setup.start();
}

if (program.env) {
  switch (program.env) {
    case 'config':
      console.log("--env config");
      env.config();
      break;
    case 'change':
      console.log("--env change");
      env.change();
      break;
    case 'current':
      console.log("--env current");
      const {selectedEnv, adminUrl, appKey} = env.get();
      console.log(`Environment: ${selectedEnv}\nURL: ${adminUrl}\nKEY: ${appKey}`);
      break;
    default:
      console.log("The environment operation must be change, config or current.");
      break;
  }
}

if (!env.validate()) {
  console.log('.env not found, use the -s option to setup the environment.');
  process.exit(1);
}

if (program.grab) {
  console.log("--grab");
  dcu.grab();
}

if (program.refresh) {
  console.log("--refresh");
  dcu.refresh(program.refresh);
}

if (program.putAll) {
  console.log("--putAll");
  dcu.putAll(program.putAll);
}

if (program.put) {
  console.log("--put");
  dcu.put(program.put);
}

if (program.transfer) {
  console.log("--transfer");
  dcu.transfer(program.transfer);
}

if (program.transferAll) {
  console.log("--transferAll");
  dcu.transferAll(program.transferAll);
}