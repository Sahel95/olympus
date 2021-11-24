const connectToProvider = require('./connector')
const subscribeToContract = require('./subscribeToContract')
const contracts = require('./constants/contractsDetail')
const Tx = require('ethereumjs-tx').Transaction;
const myWallet = require('./constants/myWallet')
const Web3 = require('web3')
const ethereumjs_common = require ('ethereumjs-common').default;



const sendTransaction = async (admin, data, contractAddress, provider, value) => {
    const web3 = new Web3(provider)
    var count = await web3.eth.getTransactionCount(admin)
    var gasPrice = await web3.eth.getGasPrice()
    var gasLimit = await web3.eth.estimateGas({
        "from"      : admin,       
        "nonce"     : web3.utils.toHex(count), 
        "to"        : contractAddress,     
        "data"      : data.encodeABI()
   })
    var common = ethereumjs_common.forCustomChain (
        'ropsten', { networkId: 43114, chainId: 43114, name: 'geth' },
        'muirGlacier'
      );


    var rawTx = {
        "from":admin,
        "gasPrice":web3.utils.toHex(gasPrice),
        "gasLimit":web3.utils.toHex(gasLimit),
        "to":contractAddress,
        // "value":web3.utils.toHex(value),
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count),
        "chainId": web3.utils.toHex(43114)
    };
    console.log('transaction::::::::::::::::::::::::::::',rawTx);
    var tx = new Tx(rawTx, { "common": common }); //chain????
    const privateKey = Buffer.from(myWallet['privateKey'], 'hex')
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
    })
    .on('receipt', (receipt) => {
        console.log('receipt', receipt);
    })
    .on('error', console.error);
    return result
}


const redeem = async (ohmFork, bond, admin, receiptAddress ,provider, web3 ) => {
    console.log(':::::::::::::::::::::::redeem::::::::::::::::::');
    const contractDetail = contracts[ohmFork]
    const bondContract = await subscribeToContract(bond, provider, 'Bonds', ohmFork)
    redeemData = await bondContract.methods.redeem(receiptAddress, true)
    const redeemResult = await sendTransaction(admin, redeemData, contractDetail['Bonds'][bond]['address'],provider)
    return redeemResult;
}


const pendingPayoutFor = async (ohmFork, bond, receiptAddress,provider ) => {
    const bondContract = await subscribeToContract(bond, provider, 'Bonds', ohmFork)
    claimableRewards = await bondContract.methods.pendingPayoutFor(receiptAddress).call()
    return claimableRewards;
}



// redeem()

module.exports = {
    redeem,
}