const Web3 = require('web3')
const {readFileSync} = require('fs')
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
    const provider = connectToProvider()
    const web3 = new Web3(provider)
    const address = '0xb92667E34cB6753449ADF464f18ce1833Caf26e0'
    let bondsAddress=[], data=[], lpContract

    for (const [key, value] of Object.entries(contractNameByAddress)) {
        bondsAddress.push(key)
    }


    var count = await web3.eth.getTransactionCount(address)
    // let pages = toString(Math.ceil(count/offset))

    const startBlock = '13652095'
    const endBlock = '13652751'
    const ApiKeyToken = ''

    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=1&offset=${count}&sort=asc&apikey=${ApiKeyToken}`
    const response = await fetch(url)
    const body = await response.json()
    for await (const [index, tx] of body.result.entries()) {
        // console.log(tx);
        if (bondsAddress.includes(tx['to'])){
            var bond = contractNameByAddress[tx['to']]
            var abi = contracts['bonds'][bond]['abi']
            abiDecoder.addABI(abi)
            var inputData = abiDecoder.decodeMethod(tx['input']);
            
            if(inputData.name === 'deposit'){
                console.log(tx);
                var obj={}
                obj['bond'] = bond
                obj['blockNumber'] = tx['blockNumber']
                obj['contract'] = tx['to']
                obj['amount'] = inputData.params[0]['value']/Math.pow(10,18)
                console.log(obj);

                lpContract = subscribeToContract(bondsPair[bond], web3)
                var reserves = await lpContract.methods.getReserves().call(undefined, tx['blockNumber'])
                var reserve1 = reserves['_reserve1']
                var totalSupply = await lpContract.methods.totalSupply().call(undefined, tx['blockNumber'])
                var value = reserve1/totalSupply

                const bondContract = subscribeToContract(bond, web3, 'bonds')
                var nextBlock = tx['blockNumber']+1
                console.log(nextBlock);
                var bondDetails = await bondContract.methods.bondInfo(address).call(undefined, 136520951)
                var pending = Number(bondDetails.payout.toString()) / Math.pow(10, 9);

                console.log(pending);
                // var discount = 1-(reward/(value*obj['amount']*2))



                data.push(obj)
            }
        }}
}


// getBondDetail('fox', accounts[1])
bondDiscount()