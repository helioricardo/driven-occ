const fs = require('fs');
const replace = require("replace-in-file");

const { constants } = require('../constants.js');

const patch = {
  grabber: () => {
    if (!fs.existsSync(constants.env.textGrabber.path)) {
      console.log(`Text snippet grabber (${constants.env.textGrabber.path}) not found! Contact your tech lead.`);
      return;
    }

    const options = {
      files: constants.env.textGrabber.path,
      from: constants.env.textGrabber.search,
      to: constants.env.textGrabber.replace
    };

    try {
      let data = replace.sync(options);
      if(data[0].hasChanged) {
        console.log("File successfully patched:", data);
      } else {
        console.log("File already patched! If you still getting errors, contact your tech lead.");
      }
    } catch (error) {
      console.error("Error applying patch:", error);
    }
  }
}

exports.patch = patch;