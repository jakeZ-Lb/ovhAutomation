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
        var imageId = "d83393ec-1356-45bf-abc9-d0e1dbbbbcd5";
        console.log("Starting ");
        // if (vpsName.endsWith(".ca")) {
        //     imageId = process.env.CA_ID
        // } else {
        //     imageId = process.env.NET_ID
        // }

        const body = {
            "doNotSendPassword": true,
            "imageId": imageId,
            "installRTM": false,
            "sshKey": process.env.SSH_KEY_NAME
        }

        const url = "/vps/" + vpsName + "/rebuild"
        ovh.request('POST', url, body, callback)

    },
    function (error, rebuildResponse) {
        if (!error) {
            console.log(rebuildResponse);
            successLog.push(rebuildResponse);
        }
        else {
            console.log("Error",{ "error": error, "vps": rebuildResponse });
            erroredVps.push(rebuildResponse.id)
            errorLog.push({ "error": error, "vps": rebuildResponse });
        }
    }
);

