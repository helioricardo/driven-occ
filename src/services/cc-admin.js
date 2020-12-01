require('dotenv').config();
const axios = require('axios');

const DEVELOPMENT = axios.create({
    baseURL: `${process.env.OCC_DEVELOPMENT_ADMIN_URL}/ccadmin/v1`,
});

const STAGE = axios.create({
    baseURL: `${process.env.OCC_STAGE_ADMIN_URL}/ccadmin/v1`,
});

const PRODUCTION = axios.create({
    baseURL: `${process.env.OCC_PRODUCTION_ADMIN_URL}/ccadmin/v1`,
});

exports.ccAdminApi = {
    DEVELOPMENT,
    STAGE,
    PRODUCTION,
};
