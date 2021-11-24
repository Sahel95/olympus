const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const {privateKey} = require('./constant/myWallet')

const nodes = require('./constant/nodes.js')


const connectToProvider =  () => {
    const provider = new HDWalletProvider(
        privateKey,
        nodes['moralis']
    )
    // console.log(provider);

    return provider
}

// connectToProvider()

module.exports =  connectToProvider

