const dotenv = require('dotenv');
dotenv.config();
let vpsRegex = /vps-[\w]+/g;
const fs = require('fs');
const vps = JSON.parse(fs.readFileSync('vps.json'))
const offline = JSON.parse(fs.readFileSync('offlineNodes.json'))
const offLineNodesNameArr = []



offline.forEach(element => {
    if (vpsRegex.test(element.providerCode)) {
        offLineNodesNameArr.push(element.providerCode.match(vpsRegex)[0])
    }

});



var filteredVps = vps.filter((vpsElement) => {    
        
    for (const offLineNode of offLineNodesNameArr) {
        if (vpsElement.includes(offLineNode)) {
            return true
        }
    }    
    return false;
});

console.log(filteredVps.length)

let data = JSON.stringify(filteredVps, null, 2);
fs.writeFileSync('filteredVps.json', data);


// console.log(offline);

// var toBeReinstalled = vps.filter(function (vpsElement) {
//     offline.forEach(offlineObj => {

//     });
// })

// let data = JSON.stringify(toBeReinstalled, null, 2);
// fs.writeFileSync('ToBeReinstalled.json', data);




// var ovh = require('ovh')({
//     endpoint: process.env.ENDPOINT,
//     appKey: process.env.APP_KEY,
//     appSecret: process.env.APP_SECRET,
//     consumerKey: process.env.CONSUMER_KEY

// });

// ovh.request('GET', '/vps',  function (error, vps) {
//     if (!error) {
//         let data = JSON.stringify(vps, null, 2);
//         fs.writeFileSync('vps.json', data);
//     }
//     else {

//         console.log(error);
//     }
// });