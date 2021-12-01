const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const myWallet = require('./constant/myWallet')
const url = require('./constant/nodes.js')
var crypto = require('crypto');


const connectToProvider =  (key='', inputBaseFeePerGas='') => {
    let privateKey
    if (key !== ''){
        privateKey = myWallet['encryptedPrivateKey']
        if(inputBaseFeePerGas !== ''){
            privateKey = myWallet['lowGas']['encryptedPrivateKey']
        }
        var algorithm = 'aes256';
        var decipher = crypto.createDecipher(algorithm, key);
        privateKey = decipher.update(privateKey, 'hex', 'utf8') + decipher.final('utf8');
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

