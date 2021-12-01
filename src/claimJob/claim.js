const Web3 = require('web3')
const {readFileSync} = require('fs')
const commandLineArgs = require('command-line-args')
const prompt = require('prompt');
const crypto = require('crypto');

const connectToProvider = require('../connector')
const {redeem} = require('../methods')
const subscribeToContract = require('../subscribeToContract')

const myWallet = require('../constant/myWallet')
const accounts = require('../constant/accounts')
const contracts = require('../constant/contracts')

const optionDefinitions = [
    { name: 'force', alias: 'f', type: Boolean },
    { name: 'maxpriority', alias: 'p', type: Number },
    { name: 'lowgas', alias: 'g', type:Number}
]

const properties = [
    {
        name: 'password',
        hidden: true
    }
]


// prompt.start();

// prompt.get(properties, function (err, result) {
//     if (err) { 
//         console.log(err);
//         return 1;
//      }
//     job(result.password)
// });


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


const checkBalance = async (data, web3, sender, count, maxpriority) => {
    console.log('7');
    var transactionNum = Object.keys(data).length
    var firstBond =  Object.keys(data)[0]
    var firstAccount = accounts[data[firstBond][0]]
    const bondContract = await subscribeToContract(firstBond, web3, 'bonds')
    redeemData = await bondContract.methods.redeem(firstAccount)
    var gasLimit = await web3.eth.estimateGas({
        "from"      : sender,       
        "nonce"     : web3.utils.toHex(count), 
        "to"        : bondContract._address,     
        "data"      : redeemData.encodeABI()
    })
    if (maxpriority ==='' || maxpriority === undefined){
        var maxPriorityFeePerGas = web3.utils.toWei('1.5','gwei')
    } else {
        var maxPriorityFeePerGas = web3.utils.toWei(maxpriority.toString(),'gwei')
    }
    console.log('8',maxPriorityFeePerGas);
    
    var block = await web3.eth.getBlock('latest')
    var baseFeePerGas = block.baseFeePerGas

    var maxFeePerGas = (1 * baseFeePerGas) + Number(maxPriorityFeePerGas)
    var estimate = gasLimit * maxFeePerGas * Number(transactionNum)

    var balance = await web3.eth.getBalance(sender);
    if (balance > estimate){
        console.log('9');
        return true
    } else {
        console.log(`Insuffient balance. You need ${estimate-balance} more`);
        process.exit(1)
    }

}


const checkClaimable = async (bond,receiptAddress, web3) => {
    
    const bondContract = await subscribeToContract(bond, web3, 'bonds')
    const claimable = await bondContract.methods.pendingPayoutFor(receiptAddress).call()
    console.log('13',claimable);
    // const claimable = web3.utils.toWei('0.01', 'ether')
    const bondDetails = await bondContract.methods.bondInfo(receiptAddress).call()
    const total = Number(bondDetails.payout.toString())
    console.log('14', total);
    
    const route = [contracts['tokens'][bond]['address'],contracts['tokens']['usd']['address']]

    console.log('15', route);

    // TODO
    try {
        console.log('16');
        const uniswapRouterContract = await subscribeToContract('UniswapRouter', web3)
        const claimableUsd = await uniswapRouterContract.methods.getAmountsOut(claimable, route).call()
        console.log('17', claimableUsd[1]);
        return [claimableUsd,claimable,total]

    } catch (error) {
        console.log('18');
        const sushiswapRouterContract = await subscribeToContract('SushiswapRouter', web3)
        const claimableUsd = await sushiswapRouterContract.methods.getAmountsOut(claimable, route).call()
        console.log('19', claimableUsd[1]);
        return [claimableUsd,claimable,total]
    }
}


const claim = async (sender, web3 ,data, count, privateKey  ) => {
    const {maxpriority, force} = commandLineArgs(optionDefinitions)
    console.log('10', maxpriority);
    console.log('11', force);
    let nonce = count
    for (const [bond, accountList] of Object.entries(data)){
        for (const item of accountList){
            var receiptAddress = accounts[item]
            console.log('12');
            var [claimableUsd,claimable,total] = await checkClaimable(bond,receiptAddress, web3)
            console.log(claimableUsd[1]/Math.pow(10, 6), claimable,total);
            var checkClaimableResult = true
            if(claimable/total < 0.25 && claimableUsd[1]/Math.pow(10, 6) < 2000){
                checkClaimableResult = false
            }

            if (checkClaimableResult || force){
                console.log(`account ${item} : start ${bond}`);
                await redeem (bond, sender, receiptAddress , web3 , privateKey, nonce, maxpriority)
                nonce ++
                console.log(`account ${item} : ${bond} redeemed`);
            } else {
                console.log(`account ${item} : claimable ${bond} is not enough`);
            }
        }
    }
    process.exit(1)
}


const job = async (key='za1wiephiepie7xeiwoH3kiek') => {
    const {lowgas: inputBaseFeePerGas, maxpriority} = commandLineArgs(optionDefinitions)
    // { force: true, maxpriority: 3, lowgas: 2 }

    console.log('1',inputBaseFeePerGas);
    console.log('2',maxpriority);
    const data = JSON.parse(readFileSync('./src/claimJob/bondsToClaim.json'))
    const provider = connectToProvider(key)
    const web3 = new Web3(provider)
    const [sender, _] = await web3.eth.getAccounts()
    const count = await web3.eth.getTransactionCount(sender)

    var algorithm = 'aes256';
    var decipher = crypto.createDecipher(algorithm, key);
    var privateKey = decipher.update(myWallet['encryptedPrivateKey'], 'hex', 'utf8') + decipher.final('utf8');
    privateKey = Buffer.from(privateKey, 'hex')

    if (inputBaseFeePerGas){
        while(true){
            var block = await web3.eth.getBlock('latest')
            var baseFeePerGas = block.baseFeePerGas
            console.log('3',baseFeePerGas);
            if(inputBaseFeePerGas >= baseFeePerGas ){
                console.log('4');
                await checkBalance(data, web3, sender, count, maxpriority)
                await claim(sender, web3 , data, count, privateKey )
            }else{
                console.log('5');
                await delay(15*1000)
            }
        }
    } else {
        console.log('6');
        await checkBalance(data, web3, sender, count, maxpriority)
        await claim(sender, web3 , data, count, privateKey )
    } 
}

job()


