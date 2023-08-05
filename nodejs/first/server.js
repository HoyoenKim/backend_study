const axios = require('axios');

axios.get('http://naver.com')
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)});