const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const myWallet = require('./constant/myWallet')

const nodes = require('./constant/nodes.js')
var crypto = require('crypto');



const connectToProvider =  (key) => {
    
    var algorithm = 'aes256';
    var decipher = crypto.createDecipher(algorithm, key);
    var privateKey = decipher.update(myWallet['encryptedPrivateKey'], 'hex', 'utf8') + decipher.final('utf8');
    const provider = new HDWalletProvider(
        privateKey,
        nodes['moralis']
        // nodes['infura']
    )
    // console.log(provider);

    return provider
}

// connectToProvider()

module.exports =  connectToProvider

