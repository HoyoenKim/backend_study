const request = require('./lib/request');
const {read} = require('./lib/response');

const lib = require('./lib');

function makeRequest(url, data) {
    // send req
    // lib.reqeust.send
    request.send(url, data);
    // returnd data
    return read(data);
}

const resposenData = makeRequest('https://naver.com', 'dd');
console.log(resposenData);

// ecmascript javascript standard / commonjs nodejs standard

console.log(require.cache);