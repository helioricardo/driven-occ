#!/usr/bin/env node

const program = require('commander');
require("dotenv").config();

const env = {
  setup: require('./src/env/setup').setup,
  get: require('./src/env').env.get,
  config: require('./src/env').env.config,
  change: require('./src/env').env.change,
  validate: require('./src/env').env.validate,
  patch: require('./src/env/patch').patch,
};

const { dcu } = require('./src/dcu');
const { email } = require('./src/api/email');
const { dev } = require('./src/dev');
const { occEnv } = require('./src/occEnv');
const { ccw } = require('./src/ccw');
const { sse } = require('./src/sse');

function showHelpAndExit() {
  program.help();
  process.exit(1);
}

program
  .version(require('./package.json').version)
  .description('A CLI to manage OCC development at Driven.cx.')
  .option('-s, --start', 'start the environment setup')
  .option('-e, --env <operation>', 'start the environment manager [change|config|current]')
  .option('-g, --grab', 'start grab on the current environment')
  .option('-gp, --grabPatch', 'if you get a HTTP error grabbing, try to patch the oracle DCU')
  .option('-r, --refresh <path>', 'refresh path')
  .option('-pa, --putAll <path>', 'upload the entire path')
  .option('-p, --put <file>', 'upload a file')
  .option('-t, --transfer <file>', 'transfer the file between current and target environment')
  .option('-ta, --transferAll <path>', 'transfer the entire path between current and target environment')
  .option('-el, --emailList', 'list email templates')
  .option('-ed, --emailDownload <template>', 'download email template')
  .option('-eda, --emailDownloadAll', 'download all email templates')
  .option('-d, --dev', 'start watcher + Browsersync')
  .option('-c, --create <type>', 'create widget or element [widget|element]')
  .option('-x, --sse <operation>', 'transfer SSE between current and target environment')
  .on('command:*', () => { showHelpAndExit(); })
  .parse(process.argv);

const emptyCommand = (process.argv.length == 2);
if (emptyCommand) showHelpAndExit();

if (program.start) {
  console.log("--start");
  env.setup.start();
} else {
  if (occEnv.validate()) {
    if (program.dev) {
      dev.start();
    }

    if (program.grabPatch) {
      console.log("--grabPatch");
      env.patch.grabber();
    }

    if (!program.start && !env.validate()) {
      console.log(".env not found, use the -s option to setup the environment.");
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

    if (program.emailList) {
      console.log("--emailList");
      email.list();
    }

    if (program.emailDownload) {
      console.log("--emailDownload");
      email.download(program.emailDownload);
    }

    if (program.emailDownloadAll) {
      console.log("--emailDownloadAll");
      email.downloadAll();
    }

    if (program.sse) {
      switch (program.sse) {
        case 'download':
          sse.download();
          break;
        case 'upload':
          sse.upload();
          break;
        case 'transfer':
          sse.transfer();
          break;
      }
    }
    
    if (program.create) {
      switch (program.create) {
        case 'widget':
          ccw.createWidget();
          break;
        case 'element':
          ccw.createElement();
          break;
      }
    }
  }
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
