const dotenv = require('dotenv');
dotenv.config();

var ovh = require('ovh')({
    endpoint: process.env.ENDPOINT,
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET
  });
  
  ovh.request('POST', '/auth/credential', {
    'accessRules': [
      { 'method': 'GET', 'path': '/*'},
      { 'method': 'POST', 'path': '/*'},
      { 'method': 'PUT', 'path': '/*'},
      { 'method': 'DELETE', 'path': '/*'}
    ]
  }, function (error, credential) {
    console.log(error || credential);
  });