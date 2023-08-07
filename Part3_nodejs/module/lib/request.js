function encrypt(data) {
    return 'encryped data';
}

function send(url, data) {
    const encrypedData = encrypt(data);
    console.log(`${encrypedData} is being sent to ${url}...`);
}


module.exports = {
    send
}

module.exports.A = 1;

