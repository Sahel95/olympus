const Web3 = require('web3')
const {writeFileSync} = require('fs')
const accounts = require('./constant/accounts')
const contracts = require('./constant/contracts')
const connectToProvider = require('./connector')
const subscribeToContract = require('./subscribeToContract')
const fetch = require('node-fetch');
const abiDecoder = require('abi-decoder');
const bondsPair = require('./constant/bondsPair')

const contractNameByAddress = require('./constant/findContractNameByAddress')



const getBondDetail = async(bond, account) => {
    const provider = connectToProvider()
    const web3 = new Web3(provider)
    let total, matured, bondDetails, price, truePrice, test

    const bondContract = subscribeToContract(bond, web3, 'bonds')

    bondDetails = await bondContract.methods.bondInfo(account).call();
    total = Number(bondDetails.payout.toString()) / Math.pow(10, 9);
    matured = await bondContract.methods.pendingPayoutFor(account).call();
    matured = web3.utils.fromWei(matured, 'gwei')

    price = await bondContract.methods.bondPrice().call()
    truePrice = await bondContract.methods.trueBondPrice().call()

    console.log(bondDetails ,total, matured, price, truePrice);
}


const bondDiscount = async () => {

    // value matured - total value - Price at issuance - Discount

    const provider = connectToProvider()
    const web3 = new Web3(provider)

    // const accountAddress = '0x06816ffa47afd9548b85f55943e32383fbb73b08'
    let bondsAddress=[], data=[], lpContract

    for (const [key, value] of Object.entries(contractNameByAddress)) {
        bondsAddress.push(key)
    }

    
    // let pages = toString(Math.ceil(count/offset))

    const startBlock = '0'
    const endBlock = '13702037'
    const ApiKeyToken = ''

    
    for (const [key, accountAddress] of Object.entries(accounts)){
        // if(key === '4' || key ==='5') {
        
        console.log(`account ${key} start:::::::::::::::::::::::::::::`);
        var count = await web3.eth.getTransactionCount(accountAddress)
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${accountAddress}&startblock=${startBlock}&endblock=${endBlock}&page=1&offset=${count}&sort=asc&apikey=${ApiKeyToken}`
    // console.log(url);
    let respones
    try {
        response = await fetch(url)
    } catch (error) {
        response = await fetch(url)
        
    }
    const body = await response.json()

    for await (const [index, tx] of body.result.entries()) {
        console.log(index);
        if (bondsAddress.includes(tx['to'])){
            var bond = contractNameByAddress[tx['to']]
            var abi = contracts['bonds'][bond]['abi']
            abiDecoder.addABI(abi)
            var inputData = abiDecoder.decodeMethod(tx['input']);
            
            if(inputData.name === 'deposit'){
                var obj={}
                obj['bond'] = bond
                obj['blockNumber'] = tx['blockNumber']
                if (bond !== 'mta'){
                    lpContract = subscribeToContract(bondsPair[bond], web3, '', true)
                    var decimal = await lpContract.methods.decimals().call()

                    obj['amount'] = inputData.params[0]['value']/Math.pow(10,decimal)
                    var reserves = await lpContract.methods.getReserves().call(undefined, tx['blockNumber'])
                    var reserve1 = reserves['_reserve1']
                    var totalSupply = await lpContract.methods.totalSupply().call(undefined, tx['blockNumber'])
                    var tokenValue = reserve1/totalSupply
                }else{
                    // var tokenValue = reserve1/totalSupply
                    continue
                }
                
                const txReceipt = await web3.eth.getTransactionReceipt(tx.hash)
                const logs = txReceipt.logs
                const tokensTransferred = []

                for await (const [index,log] of logs.entries()){
                    if (log.address.toUpperCase()  === contracts['tokens'][bond]['address'].toUpperCase() ){
                        tokensTransferred.push(BigInt(log.data))
                    }
                    
                }
                
                var reward = Number(tokensTransferred[0] - tokensTransferred[1])/Math.pow(10,18)
                var discount = (reward/(tokenValue*obj['amount']*2)) - 1

                // console.log('lp', obj['amount']);
                // console.log('tokenValue= reserve1/totalSupply', reserve1/totalSupply);
                // console.log('reward= tokensTransferred[0] - tokensTransferred[1]', reward);
                // console.log('t = tokenValue*LP*2', tokenValue*obj['amount']*2);
                // console.log('reward/t', reward/(tokenValue*obj['amount']*2));
                // console.log('discount', discount);
                
                obj['discount'] = discount
                obj['accountAddress'] = accountAddress
                
                data.push(obj)

            }
        }}
        

        console.log(`account ${key} DONE`);

    }
    let group = data.reduce((r, a) => {
        var t = a.accountAddress
        delete a.accountAddress
        r[t] = [...r[t] || [], a];
        return r;
       }, {});
     
        writeFileSync('./src/bondsDiscount.json',JSON.stringify(group)) 
}

getBondDetail('bond', accounts[1])
// bondDiscount()