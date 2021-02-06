const dotenv = require('dotenv');
dotenv.config();

var ovh = require('ovh')({
    endpoint: process.env.ENDPOINT,
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    consumerKey: process.env.CONSUMER_KEY

  });
  
ovh.request('POST', '/auth/logout');