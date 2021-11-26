const Web3 = require('web3')
const {readFileSync} = require('fs')
const prompt = require('prompt');


const accounts = require('../constant/accounts')
const contracts = require('../constant/contracts')

const connectToProvider = require('../connector')
const {redeem} = require('../methods')

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
    claim(result.password)
});


const claim = async (password) => {
    const data = JSON.parse(readFileSync('./src/claimJob/bondsToClaim.json'))
    const provider = connectToProvider(password)
    const web3 = new Web3(provider)
    const [admin, _] = await web3.eth.getAccounts()
    for (const [bond, accountList] of Object.entries(data)){
        for (const item of accountList){
            var receiptAddress = accounts[item]
            await redeem (bond, admin, receiptAddress , web3 , password)
            console.log('done');
        }
    }
    
}


