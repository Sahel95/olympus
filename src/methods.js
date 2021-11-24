const subscribeToContract = require('./subscribeToContract')
const contracts = require('./constant/contracts')
const Tx = require('ethereumjs-tx').Transaction;
const myWallet = require('./constant/myWallet')
const Web3 = require('web3')

var crypto = require('crypto');



const sendTransaction = async (admin, data, contractAddress, provider, web3, key='') => {
    var count = await web3.eth.getTransactionCount(admin)
    var gasLimit = await web3.eth.estimateGas({
        "from"      : admin,       
        "nonce"     : web3.utils.toHex(count), 
        "to"        : contractAddress,     
        "data"      : data.encodeABI()
   })
    var rawTx = {
        "from":admin,
        "gasLimit":web3.utils.toHex(gasLimit),
        "to":contractAddress,
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count),
        "maxPriorityFeePerGas"  : web3.utils.toHex(web3.utils.toWei('1.5','gwei')),
        "type": 0x2
    };
    var tx = new Tx(rawTx, { "chain": "mainnet" });

    var algorithm = 'aes256';
    var decipher = crypto.createDecipher(algorithm, key);
    var privateKey = decipher.update(myWallet['encryptedPrivateKey'], 'hex', 'utf8') + decipher.final('utf8');
    privateKey = Buffer.from(privateKey, 'hex')
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    const result = await web3.eth.ham('0x' + serializedTx.toString('hex'))
    .on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
    })
    .on('receipt', (receipt) => {
        console.log('receipt', receipt);
    })
    .on('error', console.error);
    return result
}


const redeem = async (bond, admin, receiptAddress ,provider, web3, key ) => {
    console.log(':::::::::::::::::::::::redeem::::::::::::::::::');
    const bondContract = await subscribeToContract(bond, provider, web3, 'bonds')
    redeemData = await bondContract.methods.redeem(receiptAddress)
    const redeemResult = await sendTransaction(admin, redeemData, contracts['bonds'][bond]['address'],provider, web3, key)
    return redeemResult;
}


const pendingPayoutFor = async (ohmFork, bond, receiptAddress,provider ) => {
    const bondContract = await subscribeToContract(bond, provider, 'bonds')
    claimableRewards = await bondContract.methods.pendingPayoutFor(receiptAddress).call()
    return claimableRewards;
}


module.exports = {
    redeem,
}