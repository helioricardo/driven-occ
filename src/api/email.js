const fs = require('fs');
const zipper = require('zip-local');

const { api } = require('./');
const { mkdirIfNotExists } = require('../global');

const email = {
  getList: async () => {
    const options = {
      'url': 'email/notificationTypes'
    };

    return await api.sendRequest(options)
      .then(response => {
        const templates = [];

        Object.entries(response.data).map((template) => {
          if (template[0] == 'links') return false;

          templates.push({
            'name': template[0],
            'description': template[1].displayName,
            'active': template[1].enabled
          });
        });

        return templates;
      });
  },

  list: async () => {
    const templates = await email.getList();
    console.table(templates);
  },

  getTemplateArchive: async (template, site = '') => {
    const options = {
      'url': `email/types/${template}/templates`,
      'params': {
        'x-ccsite': site
      },
      'responseType': 'stream'
    };
    const path = `./emails/${template}.zip`;
    const writer = fs.createWriteStream(path);
    const response = await api.sendRequest(options);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  },

  download: async (template, site = '') => {
    const path = `./emails/${template}`;
    const zipFile = `./emails/${template}.zip`;

    console.log(`Downloading ${template}.`);

    fs.rmdirSync(path, {'recursive': true});
    mkdirIfNotExists(path);

    await email.getTemplateArchive(template);

    zipper.sync.unzip(zipFile).save(path);
    fs.unlinkSync(zipFile);
  },

  downloadAll: async () => {
    const templates = await email.getList();
    templates.forEach((template) => {
      email.download(template.name);
    });
  }
};

exports.email = email;