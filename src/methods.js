const Web3 = require('web3')

const subscribeToContract = require('./subscribeToContract')

const contracts = require('./constant/contracts')
const myWallet = require('./constant/myWallet')

const { FeeMarketEIP1559Transaction } = require( '@ethereumjs/tx' );
const Common = require( '@ethereumjs/common' ).default;
const Tx = require('ethereumjs-tx').Transaction;
const crypto = require('crypto');
const { lowGas } = require('./constant/myWallet');



const sendTransaction = async (sender, data, contractAddress, web3,bond='', count='', maxpriority='',privateKey, inputBaseFeePerGas='') => {
    if (count === ''){
        var count = await web3.eth.getTransactionCount(sender)
    }

    if (maxpriority ==='' && inputBaseFeePerGas === ''){
        var maxPriorityFeePerGas = web3.utils.toWei('1.5','gwei')
    }else if (maxpriority ===''  && inputBaseFeePerGas !== ''){
        var maxPriorityFeePerGas = web3.utils.toWei('2.5','gwei')
    } else {
        var maxPriorityFeePerGas = web3.utils.toWei(maxpriority.toString(),'gwei')
    }

    if (inputBaseFeePerGas === ''){
        var block = await web3.eth.getBlock('latest')
        var maxFeePerGas = (2 * block.baseFeePerGas) + Number(maxPriorityFeePerGas)
       } else {
        var maxFeePerGas = (2 * inputBaseFeePerGas * Math.pow(10,9)) + Number(maxPriorityFeePerGas)
    }

    console.log('FeePerGas',(maxFeePerGas-Number(maxPriorityFeePerGas))/(2 * Math.pow(10,9)));
    console.log('maxPriorityFeePerGas', maxPriorityFeePerGas);

    var gasLimit = await web3.eth.estimateGas({
        "from"      : sender,       
        "nonce"     : web3.utils.toHex(count), 
        "to"        : contractAddress,     
        "data"      : data.encodeABI()
   })

   gasLimit = Math.ceil(gasLimit * 1.05)
   
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
    // var chain = new Common( { chain : 'mainnet', hardfork : 'london' } );
    var tx = FeeMarketEIP1559Transaction.fromTxData( rawTx );
    const signedTransaction = tx.sign(privateKey);
    return '2'
    web3.eth.sendSignedTransaction( '0x' + signedTransaction.serialize().toString( 'hex' ) )    
    .on('transactionHash', (hash) => {
        console.log(`${bond} transaction hash`, hash);
    })
    .on('receipt', (receipt) => {
        console.log(`${bond} receipt`, receipt);
    })
    .on('error', (error) => {
        console.log(`${bond} error`, console.log(error));
    })
    
}


const redeem = async (bond, sender, receiptAddress , web3, privateKey='', count='', maxpriority='', inputBaseFeePerGas='' ) => {
    const bondContract = await subscribeToContract(bond, web3, 'bonds')
    redeemData = await bondContract.methods.redeem(receiptAddress)
    const redeemResult = await sendTransaction(sender, redeemData, contracts['bonds'][bond]['address'], web3, bond, count, maxpriority, privateKey, inputBaseFeePerGas)
    return redeemResult;
}


const pendingPayoutFor = async (bond, receiptAddress,web3 ) => {
    const bondContract = await subscribeToContract(bond, web3, 'bonds')
    claimableRewards = await bondContract.methods.pendingPayoutFor(receiptAddress).call()
    return claimableRewards;
}


module.exports = {
    redeem,
    sendTransaction
}