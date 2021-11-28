const Web3 = require('web3')

const subscribeToContract = require('./subscribeToContract')

const contracts = require('./constant/contracts')
const myWallet = require('./constant/myWallet')

const { FeeMarketEIP1559Transaction } = require( '@ethereumjs/tx' );
const Common = require( '@ethereumjs/common' ).default;
const Tx = require('ethereumjs-tx').Transaction;
const crypto = require('crypto');



const sendTransaction = async (sender, data, contractAddress, web3, key='') => {
    console.log('start to create tx');
    var count = await web3.eth.getTransactionCount(sender)
    var gasLimit = await web3.eth.estimateGas({
        "from"      : sender,       
        "nonce"     : web3.utils.toHex(count), 
        "to"        : contractAddress,     
        "data"      : data.encodeABI()
   })
   var block = await web3.eth.getBlock('latest')
   var maxPriorityFeePerGas = web3.utils.toWei('1.5','gwei')
   var maxFeePerGas = (2 * block.baseFeePerGas) + Number(maxPriorityFeePerGas)

   console.log('count', count);
   console.log('gasLimit', gasLimit);
   console.log('block', block);
   console.log('maxPriorityFeePerGas',maxPriorityFeePerGas);
   console.log('maxFeePerGas', maxFeePerGas);
   console.log('sender', sender);


    var rawTx = {
        "from":sender,
        "gasLimit":web3.utils.toHex(gasLimit),
        "to":contractAddress,
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count),
        "maxFeePerGas": web3.utils.toHex(maxFeePerGas),
        "maxPriorityFeePerGas"  :  web3.utils.toHex(maxPriorityFeePerGas),
        "type": "0x02",
        // "chainId": "0x03" 
    };

    console.log(count);

    var chain = new Common( { chain : 'mainnet', hardfork : 'london' } );
    var tx = FeeMarketEIP1559Transaction.fromTxData( rawTx );

    var algorithm = 'aes256';
    var decipher = crypto.createDecipher(algorithm, key);
    var privateKey = decipher.update(myWallet['encryptedPrivateKey'], 'hex', 'utf8') + decipher.final('utf8');
    privateKey = Buffer.from(privateKey, 'hex')

    const signedTransaction = tx.sign(privateKey);
    const result = await web3.eth.sendSignedTransaction( '0x' + signedTransaction.serialize().toString( 'hex' ) )    .on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
    })
    .on('receipt', (receipt) => {
        console.log('receipt', receipt);
    })
    .on('error', console.error);
    return result
}


const redeem = async (bond, sender, receiptAddress , web3, key ) => {
    console.log(`redeem bond ${bond} for account ${receiptAddress}`);
    const bondContract = await subscribeToContract(bond, web3, 'bonds')
    redeemData = await bondContract.methods.redeem(receiptAddress)
    console.log('redeem DATA done');
    const redeemResult = await sendTransaction(sender, redeemData, contracts['bonds'][bond]['address'], web3, key)
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