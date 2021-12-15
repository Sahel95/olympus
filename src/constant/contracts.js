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
    UniswapRouter: {
        address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        abi: JSON.parse(readFileSync( abiPath + 'UniswapRouter.json'))
    },
    SushiswapRouter: {
        address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
        abi: JSON.parse(readFileSync( abiPath + 'SushiswapRouter.json'))
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
        xsdt: {
            address : '0x903dE5B04B9878696FfA08bD300Cc06b260fc5C9',
            abi: JSON.parse(readFileSync(bondsPath + 'xsdt.json'))
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
        },
        weth_alcx: {
            address: '0x6D987Dda4358a9Ba4F695Ca4e6AA3933D7Bc1B08',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        alcxEth: {
            address: '0x1e5b7412f4B4B713b93D0e82260BD27810984B6e',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        dai: {
            address: '0x105cD312418311dd49Bc1e88459019Ed4eF218DC',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        bankEth1: {
            address: '0xC9CE759C809E8026C8Fc1b66536031d81d6c3d1C',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        fraxWeth: {
            address: '0xD35509ab8fC94c81fDc8c26ABe4fc581741C0C8A',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        pandleEth: {
            address: '0x11Ac5C608C6b2C57ED58ee43281F7ba52205b17a',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        groPwrd: {
            address: '0x202a5F109802334B7ADa438f22481D22806E2783',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        bankEth2: {
            address: '0x1e5924A216eD739FCFE681FD8784f9AE2430Ba22',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        iqEth: {
            address: '0x652775a0331d495F3539C4690C9aB392F220ccaa',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        divineEth: {
            address: '0xe187C0d652277230c507A62786A5124dd636E3D8',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        bottoEth: {
            address: '0x0Dc91da5fA5F2d6B3f84e966cd1Ea86cA1250C5A',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        bptEth: {
            address: '0x93de01EbCCEdf8bB40CaEa0C4BD8BB4b5dc1F56B',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        weth_bpt: {
            address: '0x0A1f162AcFcDc8d0696a6716AF0dDc0aDDb3664c',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'KP3R-ETH': {
            address: '0x886fC242Af5BF90E839d8B4817748e184cBa7D97',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'USDC-ibAUD': {
            address: '0x4785Ae4aCfE79CdaF37aCf39300fe0b5f7FD0173',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'USDC-ibCHF': {
            address: '0xCf21b29de6f3088689Db33DC44fCeB155E6b38d7',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'USDC-ibEUR': {
            address: '0x9BFb385c1aDB607a427183Bd3eB7dc687f639F26',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'USDC-ibGBP': {
            address: '0x38C10BCb6f4DDc16C676bC164e8C665C431D3e60',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'USDC-ibJPY': {
            address: '0x3C0BFa27DF3f71860ADe71c4f3c88Bd02B8DFE05',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'USDC-ibKRW': {
            address: '0xCFc5Cd985DEa7382258697c6E41cc6E1cA9b821c',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'oneUNI-ICHI': {
            address: '0x56db5d12a2438bFD258bc72CBA45206c11D33239',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'THOR-ETH': {
            address: '0xee8911D69d5a49aeC8B17419D7C8Cb5A08b449Ba',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'RUNE-ETH': {
            address: '0xf7092a510f154FfF7F90d18d3a053b08B7c7e417',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'RUNE': {
            address: '0x3Ea7eBDcf8Ce93903420e5db4036d0899564cE5E',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'USF-ETH': {
            address: '0xCBC2E3e10475A1BDe447D2B67e6C302b07542e5d',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        'QUARTZ-USDC': {
            address: '0x871eECEFE9c1AA35b9f2AfED48a5f5fA696eb4F0',
            abi: JSON.parse(readFileSync(bondsPath + 'inv.json'))
        },
        

        
    },
    tokens: {
        weth:{
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            abi: JSON.parse(readFileSync(tokensPath + 'weth.json'))
        },
        xsdt  : {  
            address : '0xac14864ce5a98af3248ffbf549441b04421247d3',
            abi: JSON.parse(readFileSync(tokensPath + 'xsdt.json'))
        },
        sdt  : {  
            address : '0x73968b9a57c6E53d41345FD57a6E6ae27d6CDB2F',
            abi: JSON.parse(readFileSync(tokensPath + 'sdt.json'))
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