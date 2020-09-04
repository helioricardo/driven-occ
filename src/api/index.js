const axios = require('axios');

const { env } = require('../env/');

let tokens = {};

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
  env: env.get(),

  getEnvData: ({ adminUrl, appKey }) => {
    api.env.adminUrl = adminUrl || api.env.adminUrl;
    api.env.appKey = appKey || api.env.appKey;

    return api.env;
  },

  generateToken: async ({ adminUrl, appKey }) => {
    api.getEnvData({ adminUrl, appKey });

    if (tokens[api.env.adminUrl]) return tokens[api.env.adminUrl];

    return login(api.env.adminUrl, api.env.appKey)
      .then(({ data }) => {
        tokens[api.env.adminUrl] = data.access_token;
        console.log(`Login on ${api.env.adminUrl}/ccadmin/v1/login completed`);
        // console.log('Access Token', data.access_token);
        return data.access_token;
      })
      .catch(error => {
        console.log(error);
      });
  },

  sendRequest: async (options, { adminUrl, appKey }  = {}) => {
    const token = await api.generateToken({ adminUrl, appKey });

    const defaultHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-CCAsset-Language': 'en'
    };

    const defaultOptions = {
      method: 'GET',
      timeout: 10000,
      baseURL: `${api.env.adminUrl}/ccadmin/v1/`,
      headers: {
        ...defaultHeaders,
        ...options.headers || {}
      }
    };

    const finalOptions = {
      ...defaultOptions,
      ...options
    };

    return axios(finalOptions)
      .catch(error => {
        console.error('api.sendRequest error:');
        console.log('Config:', error.config);

        if (error.response) {
          console.error('Response Error:');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.error('Request Error:');
          console.log(error.request);
        } else {
          console.error('Other Error:', error.message);
        }
      });
  }
};

exports.api = api;