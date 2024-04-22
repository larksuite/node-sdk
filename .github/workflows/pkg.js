var data = require('../../package.json');
var fs = require('fs');
var path = require('path');
//Manipulate data
data.name = '@whyun/feishu-node-sdk';
data.version = process.env.PKG_VERSION || data.version;
if (data.version.startsWith('v')) {
    data.version = data.version.slice(1);
}
fs.writeFileSync(
    path.join(__dirname, '../../package.json'),
    JSON.stringify(data, null, 2),
    'utf-8'
)
