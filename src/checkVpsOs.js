const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');


var ovh = require('ovh')({
    endpoint: process.env.ENDPOINT,
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    consumerKey: process.env.CONSUMER_KEY

});

ovh.request('GET', '/vps',  function (error, vps) {
    if (!error) {
        let data = JSON.stringify(vps, null, 2);
        fs.writeFileSync('vps.json', data);
    }
    else {

        console.log(error);
    }
});