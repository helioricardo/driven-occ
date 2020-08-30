const axios = require('axios');

let tokens = {};
let inited = false;

function login(adminUrl, appKey) {
  return axios({
    method: "POST",
    url: `${adminUrl}/ccadmin/v1/login`,
    responseType: "json",
    params: {
      "grant_type": "client_credentials"
    },
    headers: {
      "Authorization": `Bearer ${appKey}`,
      "content-type": "application/x-www-form-urlencoded"
    }
  });
}

const api = {
  generateToken: async ({ adminUrl, appKey }) => {
    await login(adminUrl, appKey, inited)
      .then(data => {
        tokens[adminUrl] = data.access_token;
        console.log(`Login on ${adminUrl}/ccadmin/v1/login completed`);
        return data.access_token;
      })
      .catch(error => {
        console.log(error);
      });
  }
};

exports.api = api;