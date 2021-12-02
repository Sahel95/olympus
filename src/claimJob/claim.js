const Web3 = require('web3')
const {readFileSync} = require('fs')
const commandLineArgs = require('command-line-args')
const fetch = require('node-fetch');
const prompt = require('prompt');
const crypto = require('crypto');

const connectToProvider = require('../connector')
const {redeem, sendTransaction} = require('../methods')
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
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) {
        console.log(err);
        return 1;
     }
    job(result.password)
});


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


const checkBalance = async (data, web3, sender, count,inputBaseFeePerGas) => {
    var {maxpriority} = commandLineArgs(optionDefinitions)
    if(maxpriority === undefined){
        maxpriority=''
    }

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

    

    if (maxpriority ==='' && inputBaseFeePerGas === ''){
        var maxPriorityFeePerGas = web3.utils.toWei('1.5','gwei')
    }else if (maxpriority ===''  && inputBaseFeePerGas !== ''){
        var maxPriorityFeePerGas = web3.utils.toWei('2.5','gwei')
    } else {
        var maxPriorityFeePerGas = web3.utils.toWei(maxpriority.toString(),'gwei')
    }

    

    if (inputBaseFeePerGas === ''){
        var block = await web3.eth.getBlock('latest')
        var baseFeePerGas = block.baseFeePerGas
       } else {
        var baseFeePerGas = inputBaseFeePerGas
    }

    console.log('maxpriority',maxPriorityFeePerGas);
    console.log('baseFeePerGas',baseFeePerGas);


    var maxFeePerGas = baseFeePerGas + Number(maxPriorityFeePerGas)
    var estimate = gasLimit * maxFeePerGas * Number(transactionNum)

    var balance = await web3.eth.getBalance(sender);

    console.log('balance', balance);
    console.log('estimate', estimate);
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
    
    const bondDetails = await bondContract.methods.bondInfo(receiptAddress).call()
    const total = Number(bondDetails.payout.toString())
    console.log('14', total);
    
    var fromTokenAddress = contracts['tokens'][bond]['address']
    if (bond === 'xsdt'){
        var fromTokenAddress = contracts['tokens']['sdt']['address']
    }

    const url = `https://api.1inch.exchange/v3.0/1/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${contracts['tokens']['usd']['address']}&amount=${claimable}`
    try {
        response = await fetch(url)
    } catch (error) {
        response = await fetch(url)  
    }

    const body = await response.json()

    var claimableUsd = body.toTokenAmount
    if (bond === 'xsdt'){
        claimableUsd = 1.17 * claimableUsd
    }

    console.log('claimableUsd',claimableUsd/Math.pow(10, 6));

    if(claimable/total < 0.25 && claimableUsd/Math.pow(10, 6) < 2000){
        return false
    } else {
        return true
    }

    // try {
    //     console.log('16');
    //     const uniswapRouterContract = await subscribeToContract('UniswapRouter', web3)
    //     const claimableUsd = await uniswapRouterContract.methods.getAmountsOut(claimable, route).call()
    //     console.log('17', claimableUsd[1]);
    //     return [claimableUsd,claimable,total]

    // } catch (error) {
    //     console.log('18');
    //     const sushiswapRouterContract = await subscribeToContract('SushiswapRouter', web3)
    //     const claimableUsd = await sushiswapRouterContract.methods.getAmountsOut(claimable, route).call()
    //     console.log('19', claimableUsd[1]);
    //     return [claimableUsd,claimable,total]
    // }


}


const claim = async (sender, web3 ,data, count, privateKey  ) => {
    var {lowgas: inputBaseFeePerGas, force, maxpriority} = commandLineArgs(optionDefinitions)
    if(maxpriority === undefined){
        maxpriority=''
    }
    if(inputBaseFeePerGas === undefined){
        inputBaseFeePerGas=''
    }
    console.log('10', maxpriority);
    console.log('11', force);
    let nonce = count
    for (const [bond, accountList] of Object.entries(data)){
        for (const item of accountList){
            console.log(`account ${item} : ${bond}`);
            var receiptAddress = accounts[item]
            console.log('12');

            const bondContract = await subscribeToContract(bond, web3, 'bonds')
            redeemData = await bondContract.methods.redeem(receiptAddress)

            if(force){
                console.log(`account ${item} : start to claim ${bond}`);
                await sendTransaction(sender, redeemData, contracts['bonds'][bond]['address'], web3, bond, nonce, maxpriority, privateKey, inputBaseFeePerGas)
                nonce ++
                console.log(`account ${item} : ${bond} redeemed`);
            } else {
                var checkClaimableResult = await checkClaimable(bond,receiptAddress, web3)
                if(checkClaimableResult){
                    console.log(`account ${item} : start to claim ${bond}`);
                    await sendTransaction(sender, redeemData, contracts['bonds'][bond]['address'], web3, bond, nonce, maxpriority, privateKey, inputBaseFeePerGas)
                    nonce ++
                    console.log(`account ${item} : ${bond} redeemed`);
                } else {
                    console.log(`account ${item} : claimable ${bond} is not enough`);
                }
            }}

    }

    // process.exit(1)
}


const job = async (key) => {

    var {lowgas: inputBaseFeePerGas} = commandLineArgs(optionDefinitions)
    if(inputBaseFeePerGas === undefined){
        inputBaseFeePerGas=''
    }

    console.log('1',inputBaseFeePerGas);
    const data = JSON.parse(readFileSync('./src/claimJob/bondsToClaim.json'))
    const provider = connectToProvider(key, inputBaseFeePerGas)
    const web3 = new Web3(provider)
    const [sender, _] = await web3.eth.getAccounts()
    const count = await web3.eth.getTransactionCount(sender)

    var algorithm = 'aes256';
    var decipher = crypto.createDecipher(algorithm, key);
    var privateKey = myWallet['encryptedPrivateKey']
    if(inputBaseFeePerGas){
        console.log('ttttttttttttttt');
        privateKey = myWallet['lowGas']['encryptedPrivateKey']
    }
    privateKey = decipher.update(privateKey, 'hex', 'utf8') + decipher.final('utf8');
    privateKey = Buffer.from(privateKey, 'hex')

    await checkBalance(data, web3, sender, count, inputBaseFeePerGas)
    await claim(sender, web3 , data, count, privateKey )

    // if (inputBaseFeePerGas){
    //     while(true){
    //         var block = await web3.eth.getBlock('latest')
    //         var baseFeePerGas = block.baseFeePerGas
    //         console.log('3',banm,seFeePerGas);
    //         console.log(inputBaseFeePerGas * Math.pow(10,9));
    //         if(inputBaseFeePerGas * Math.pow(10,9) >= baseFeePerGas ){
    //             console.log('4');
    //             await checkBalance(data, web3, sender, count)
    //             await claim(sender, web3 , data, count, privateKey )
    //         }else{
    //             console.log('5');
    //             await delay(15*1000)
    //         }
    //     }
    // } else {
    //     console.log('6');
    //     await checkBalance(data, web3, sender, count)
    //     await claim(sender, web3 , data, count, privateKey )
    // } 
}

// job()


