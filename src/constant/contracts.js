const {readFileSync} = require('fs')
const abiPath = './src/constant/abi/'
const bondsPath = './src/constant/abi/bonds/'
const tokensPath = './src/constant/abi/tokens/'
const lpPath = './src/constant/abi/lp/'

const contracts = {
    sample  : {  
        address : '',
        // abi: JSON.parse(readFileSync( abiPath + '.json'))
    },
    UniswapEthFoxLP: {
        address: '0x470e8de2eBaef52014A47Cb5E6aF86884947F08c',
        abi: JSON.parse(readFileSync( lpPath + 'UniswapEthFoxLP.json'))
    },
    SushiSwapStdWethLP :{
        address: '0x22DEF8cF4E481417cb014D9dc64975BA12E3a184',
        abi: JSON.parse(readFileSync( lpPath + 'SushiSwapStdWethLP.json'))
    },
    SushiSwapAngleAgeurLP  : {  
        address : '0x1f4c763bde1d4832b3ea0640e66da00b98831355',
        abi: JSON.parse(readFileSync( lpPath + 'SushiSwapAngleAgeur.json'))
    },
    UniswapBondUsdcLP  : {  
        address : '0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244',
        abi: JSON.parse(readFileSync( lpPath + 'UniswapBondUsdcLP.json'))
    },
    UniswapRookWethLP  : {  
        address : '0x70ec2fA6Eccf4010eaf572d1C1a7bCbC72DEC983',
        abi: JSON.parse(readFileSync( lpPath + 'UniswapRookWethLP.json'))
    },
    UniswapPoolEthLP  : {  
        address : '0x85Cb0baB616Fe88a89A35080516a8928F38B518b',
        abi: JSON.parse(readFileSync( lpPath + 'UniswapPoolEthLP.json'))
    },
    SushiSwapXruneWethLP  : {  
        address : '0x95cFa1f48faD82232772d3B1415Ad4393517F3b5',
        abi: JSON.parse(readFileSync( lpPath + 'SushiSwapXruneWethLP.json'))
    },
    SushiSwapSynEthLP  : {  
        address : '0x4a86c01d67965f8cb3d0aaa2c655705e64097c31',
        abi: JSON.parse(readFileSync( lpPath + 'SushiSwapSynEthLP.json'))
    },
    SushiSwapPremiaWethLP  : {  
        address : '0x93E2F3a8277E0360081547D711446e4a1F83546D',
        abi: JSON.parse(readFileSync( lpPath + 'SushiSwapPremiaWethLP.json'))
    },
    bonds : {
        sdt: {
            address : '0x903dE5B04B9878696FfA08bD300Cc06b260fc5C9',
            abi: JSON.parse(readFileSync(bondsPath + 'StdEth.json'))
        },
        angle: {
            address : '0x9e5DBd96fD433D89612F84E4eEd4Cd61a6C50277',
            abi: JSON.parse(readFileSync(bondsPath + 'angle.json'))
        },
        bond: {
            address : '0x4dF87BA9eBD148E09117d9b82461b87091365E2c',
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
            abi: JSON.parse(readFileSync(bondsPath + 'fox.json')),
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
        inv: {
            address: '0x34eB308C932fe3BbdA8716a1774eF01d302759D9',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        }
    },
    tokens: {
        sdt  : {  
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
        usd: {
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            abi: JSON.parse(readFileSync(tokensPath + 'usd.json'))
        },
        inv: {
            address: '0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68',
            abi: JSON.parse(readFileSync(tokensPath + 'inv.json'))
        }
    }
}

module.exports = contracts