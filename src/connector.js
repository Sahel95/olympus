const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const myWallet = require('./constant/myWallet')
const url = require('./constant/nodes.js')
var crypto = require('crypto');


const connectToProvider =  (key='') => {
    let privateKey
    if (key !== ''){
        var algorithm = 'aes256';
    var decipher = crypto.createDecipher(algorithm, key);
    privateKey = decipher.update(myWallet['encryptedPrivateKey'], 'hex', 'utf8') + decipher.final('utf8');
    } else {
        privateKey = myWallet['privateKey']
    }
    
    const provider = new HDWalletProvider(
        privateKey,
        url
    )
    // console.log(provider);

    return provider
}

// connectToProvider()

module.exports =  connectToProvider

