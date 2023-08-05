import { send } from './request2.mjs';
import {read} from './response2.mjs';

function makeRequest(url, data) {
    // send req
    send(url, data);
    // returnd data
    return read(data);
}

const resposenData = makeRequest('https://naver.com', 'dd');
console.log(resposenData);

// ecmascript javascript standard / commonjs nodejs standard