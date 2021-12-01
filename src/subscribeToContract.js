const contracts = require('./constant/contracts')


const subscribeToContract = (name, web3 ,poolType='') => {
    let abi, address
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
    return contract
}

// subscribeToContract()

module.exports = subscribeToContract

