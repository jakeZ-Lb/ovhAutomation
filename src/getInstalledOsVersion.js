const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const vps = JSON.parse(fs.readFileSync('filteredVps.json'))
var async = require('async');
var ovh = require('ovh')({
    endpoint: process.env.ENDPOINT,
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    consumerKey: process.env.CONSUMER_KEY

});

const errorLog = []
const erroredVps = []
const successLog = []
console.log(vps.length);

async.map(
    vps,
    function (vpsName, callback) {
        ovh.request('GET', "/vps/" + vpsName + "/images/current", callback);
    },
    
    function (err, response) {
        if (err) {
            
            console.log(err,response);
        } else {
            console.log(response);
        }

    }
);