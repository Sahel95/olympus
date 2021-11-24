const Web3 = require('web3')
const connectToProvider = require('./connector')
const contracts = require('./constant/contracts')


const subscribeToContract = (name, provider, web3 ,poolType='') => {
    let abi, address
    // const provider = connectToProvider()

    
    if (poolType === 'tokens'){
        address = contracts['tokens'][name]['address'];
        abi = contracts['tokens'][name]['abi']
    } else if (poolType === 'bonds') {
        address = contracts['bonds'][name]['address'];
        abi = contracts['bonds'][name]['abi']
    } else {
        address = contracts[name]['address'];
        abi = contracts[name]['abi']
    }


    const contract = new web3.eth.Contract(
        abi,
        address
    )
    

    // console.log(contract);

    // result = {
    //     web3,
    //     contract
    // }

    return contract
}

// subscribeToContract()

module.exports = subscribeToContract

