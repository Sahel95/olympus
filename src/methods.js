const subscribeToContract = require('./subscribeToContract')
const contracts = require('./constant/contracts')
const Tx = require('ethereumjs-tx').Transaction;
const myWallet = require('./constant/myWallet')
const Web3 = require('web3')

const { FeeMarketEIP1559Transaction } = require( '@ethereumjs/tx' );
const Common = require( '@ethereumjs/common' ).default;


const crypto = require('crypto');



const sendTransaction = async (admin, data, contractAddress, web3, key='') => {
    console.log('start to create tx');
    var count = await web3.eth.getTransactionCount(admin)
    var gasLimit = await web3.eth.estimateGas({
        "from"      : admin,       
        "nonce"     : web3.utils.toHex(count), 
        "to"        : contractAddress,     
        "data"      : data.encodeABI()
   })
   console.log('gasLimit', gasLimit);
   var block = await web3.eth.getBlock('latest')
   console.log('block', block);
   var maxPriorityFeePerGas = web3.utils.toWei('1.5','gwei')
   var maxFeePerGas = (2 * block.baseFeePerGas) + Number(maxPriorityFeePerGas)
   console.log('til');
    var rawTx = {
        "from":admin,
        "gasLimit":web3.utils.toHex(gasLimit),
        "to":contractAddress,
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count),
        "maxFeePerGas": web3.utils.toHex(maxFeePerGas),
        "maxPriorityFeePerGas"  :  web3.utils.toHex(maxPriorityFeePerGas),
        "type": 0x2,
        "accessList": []
    };
    console.log(rawTx);
    var chain = new Common( { chain : 'mainnet', hardfork : 'london' } );
    // var tx = new Tx(rawTx, { "chain": "mainnet" });
    var tx = FeeMarketEIP1559Transaction.fromTxData( rawTx , { chain } );
    console.log(tx);

    var algorithm = 'aes256';
    var decipher = crypto.createDecipher(algorithm, key);
    var privateKey = decipher.update(myWallet['encryptedPrivateKey'], 'hex', 'utf8') + decipher.final('utf8');
    privateKey = Buffer.from(privateKey, 'hex')
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


const redeem = async (bond, admin, receiptAddress , web3, key ) => {
    console.log(`redeem bond ${bond} for account ${receiptAddress}`);
    const bondContract = await subscribeToContract(bond, web3, 'bonds')
    redeemData = await bondContract.methods.redeem(receiptAddress)
    console.log('redeem DATA done');
    const redeemResult = await sendTransaction(admin, redeemData, contracts['bonds'][bond]['address'], web3, key)
    return redeemResult;
}


const pendingPayoutFor = async (bond, receiptAddress,web3 ) => {
    const bondContract = await subscribeToContract(bond, web3, 'bonds')
    claimableRewards = await bondContract.methods.pendingPayoutFor(receiptAddress).call()
    return claimableRewards;
}


module.exports = {
    redeem,
}