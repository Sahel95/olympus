const {readFileSync} = require('fs')
const abiPath = './src/constant/abi/'
const bondsPath = './src/constant/abi/bonds/'
const tokensPath = './src/constant/abi/tokens/'

const contracts = {
    sample  : {  
        // address : '',
        // abi: JSON.parse(readFileSync( abiPath + '.json'))
    },
    bonds : {
        std: {
            address : '0x903dE5B04B9878696FfA08bD300Cc06b260fc5C9',
            abi: JSON.parse(readFileSync(bondsPath + 'StdEth.json'))
        },
        angle: {
            address : '0x9e5DBd96fD433D89612F84E4eEd4Cd61a6C50277',
            abi: JSON.parse(readFileSync(bondsPath + 'angle.json'))
        },
        bond: {
            address : '0x903dE5B04B9878696FfA08bD300Cc06b260fc5C9',
            abi: JSON.parse(readFileSync(bondsPath + 'bond.json'))
        },
        rook: {
            address : '0x21683a6eA8FE834ebeFC03621aAFf5Fd362e9299',
            abi: JSON.parse(readFileSync(bondsPath + 'rook.json'))
        },
        pool: {
            address : '0xD47C34a794287d624cc0C6ccA869cF087f9F0cd7',
            abi: JSON.parse(readFileSync(bondsPath + 'pool.json'))
        },
        xrune: {
            address : '0x78A9a411002c6Cc542CBAE44621A481d23A34F39',
            abi: JSON.parse(readFileSync(bondsPath + 'xrune.json'))
        },
        fox: {
            address : '0x270689EEEFAc9015EA8eA3C1c082F91af2a7f77c',
            abi: JSON.parse(readFileSync(bondsPath + 'fox.json'))
        },
        syn: {
            address : '0x89c4993E8A96E70BB507b31B38Fd6ADdf995394C',
            abi: JSON.parse(readFileSync(bondsPath + 'syn.json'))
        },
        premia: {
            address : '0x100d4127E19396b117Ff6ad47D2186F76f7FA50A',
            abi: JSON.parse(readFileSync(bondsPath + 'premia.json'))
        },
        mta: {
            address : '0xA8E5Fa0072D292646d49999ef0d7f9354ec8e7a5',
            abi: JSON.parse(readFileSync(bondsPath + 'mta.json'))
        },
    },
    tokens: {
        std  : {  
            address : '0x4dF87BA9eBD148E09117d9b82461b87091365E2c',
            abi: JSON.parse(readFileSync(tokensPath + 'Std.json'))
        },
        angle: {
            address : '0x31429d1856aD1377A8A0079410B297e1a9e214c2',
            abi: JSON.parse(readFileSync(tokensPath + 'angle.json'))
        },
        bond: {
            address : '0x0391D2021f89DC339F60Fff84546EA23E337750f',
            abi: JSON.parse(readFileSync(tokensPath + 'bond.json'))
        },
        rook: {
            address : '0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a',
            abi: JSON.parse(readFileSync(tokensPath + 'rook.json'))
        },
        pool: {
            address : '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e',
            abi: JSON.parse(readFileSync(tokensPath + 'pool.json'))
        },
        xrune: {
            address : '0x69fa0fee221ad11012bab0fdb45d444d3d2ce71c',
            abi: JSON.parse(readFileSync(tokensPath + 'xrune.json'))
        },
        fox: {
            address : '0xc770eefad204b5180df6a14ee197d99d808ee52d',
            abi: JSON.parse(readFileSync(tokensPath + 'fox.json'))
        },
        syn: {
            address : '0x0f2d719407fdbeff09d87557abb7232601fd9f29',
            abi: JSON.parse(readFileSync(tokensPath + 'syn.json'))
        },
        premia: {
            address : '0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70',
            abi: JSON.parse(readFileSync(tokensPath + 'premia.json'))
        },
        mta: {
            address : '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
            abi: JSON.parse(readFileSync(tokensPath + 'mta.json'))
        },
    }
}

module.exports = contracts