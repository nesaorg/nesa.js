const {
    describe,
    it,
} = require('node:test');
const assert = require('node:assert');
const {
    ChatClient
} = require('./dist/index.js')
const defaultChainInfo = {
    chainId: 'nesa-testnet-3',
    chainName: 'Nesa Testnet',
    chainSymbolImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/chain.png",
    rest: 'https://lcd.test.nesa.ai',
    rpc: 'https://rpc.test.nesa.ai',
    nodeProvider: {
        name: "Nesa",
        email: "dev@nesa.ai",
        website: "https://nesa.ai/",
    },

    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "nesa",
        bech32PrefixAccPub: "nesa" + "pub",
        bech32PrefixValAddr: "nesa" + "valoper",
        bech32PrefixValPub: "nesa" + "valoperpub",
        bech32PrefixConsAddr: "nesa" + "valcons",
        bech32PrefixConsPub: "nesa" + "valconspub",
    },
    currencies: [{
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
    }, ],
    feeCurrencies: [{
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        gasPriceStep: {
            low: 0.01,
            average: 0.02,
            high: 0.1,
        },
    }, ],
    stakeCurrency: {
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        gasPriceStep: {},
        features: ["cosmwasm"],
    },
};
const nesaTestChain = {
    chainId: "nesa-testnet-2",
    chainName: "Nesa Testnet dev 2",
    chainSymbolImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/chain.png",
    rest: "http://47.238.190.19:9032",
    rpc: "http://47.238.190.19:11007",
    // rest: "https://cosmos-rest.tpblock.io",
    // rpc: "https://cosmos-rpc.tpblock.io",
    nodeProvider: {
        name: "Nesa",
        email: "dev@nesa.ai",
        website: "https://nesa.ai/",
    },
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "nesa",
        bech32PrefixAccPub: "nesa" + "pub",
        bech32PrefixValAddr: "nesa" + "valoper",
        bech32PrefixValPub: "nesa" + "valoperpub",
        bech32PrefixConsAddr: "nesa" + "valcons",
        bech32PrefixConsPub: "nesa" + "valconspub",
    },
    currencies: [{
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
    }, ],
    feeCurrencies: [{
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        gasPriceStep: {
            low: 0.01,
            average: 0.02,
            high: 0.1,
        },
    }, ],
    stakeCurrency: {
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        gasPriceStep: {},
        features: ["cosmwasm"],
    },
};
const privateKey = 'c2769207c112c66a980dc50b74775e7a3cdb5e37a79884ebed2ae50417a7e237'
// const requestSessionModel = 'meta-llama/Meta-Llama-3-70B'
// const requestChatModel = 'meta-llama/Meta-Llama-3-70B'
const requestSessionModel = "Chat-GLM3"
const requestChatModel = 'Chat-GLM3'
const ChatClientUtils = new ChatClient({
    chainInfo: nesaTestChain,
    privateKey: privateKey,
    modelName: requestSessionModel,
})

describe('Request session', () => {
    console.log('Request session')
    const datas = []
    it('should be able to get the request Session correct result', async () => {
        const result = new Promise((resolve, reject) => {
            const ChatClientUtils = new ChatClient({
                chainInfo: nesaTestChain,
                privateKey: privateKey,
                modelName: requestSessionModel,
            })
            ChatClientUtils.requestSession()
                .then((dataStream) => {
                    dataStream.on("data", (msg) => {
                        datas.push(msg)
                        if (msg.code > 310) {
                            reject(msg)
                        }
                    });
                    dataStream.on("end", () => {
                        resolve(datas)
                    })
                })
                .catch(err => {
                    console.log('err: ', err)
                    reject(err)
                })
        })
        await result
        ChatClientUtils.requestCloseHeartbeat()
        assert.equal(datas.length, 5);
        assert.equal(datas[0].code, 301);
        assert.equal(datas[1].code, 302);
        assert.equal(datas[2].code, 200);
        assert.equal(datas[3].code, 303);
        assert.equal(datas[4].code, 304);
    });
})

describe('Request session', () => {
    const datas = []
    it('should return insufficient balance', async () => {
        const result = new Promise((resolve, reject) => {
            const ChatClientUtils = new ChatClient({
                chainInfo: nesaTestChain,
                privateKey: privateKey,
                modelName: requestSessionModel,
                lockAmount: '100000000000000000000'
            })
            ChatClientUtils.requestSession()
                .then((dataStream) => {
                    dataStream.on("data", (msg) => {
                        console.log('msg: ', msg)
                        datas.push(msg)
                    });
                    dataStream.on("end", () => {
                        resolve()
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
        await result
        ChatClientUtils.requestCloseHeartbeat()
        assert.equal(datas.length, 3);
        assert.equal(datas[0].code, 301);
        assert.equal(datas[1].code, 302);
        assert.equal(datas[2].code, 318);
    });
})

describe('Request chat', () => {
    it('should return chat message', async () => {
        const datas = []
        const chatDatas = []
        const ChatClientUtils = new ChatClient({
            chainInfo: nesaTestChain,
            privateKey: privateKey,
            modelName: requestSessionModel,
        })
        const requestSessionChat = new Promise((resolve, reject) => {
            ChatClientUtils.requestSession()
                .then((dataStream) => {
                    dataStream.on("data", (msg) => {
                        datas.push(msg)
                        if (msg.code > 310) {
                            reject()
                        }
                    });
                    dataStream.on("end", () => {
                        resolve()
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
        await requestSessionChat
        console.log('datas: ', datas)
        assert(datas[datas.length - 1].code === 304)
        const requestChat = new Promise((resolve, reject) => {
            ChatClientUtils.requestChat({
                    messages: [{
                        role: 'user',
                        content: 'hi'
                    }],
                    model: requestChatModel
                })
                .then((dataStream) => {
                    dataStream.on("data", (msg) => {
                        chatDatas.push(msg)
                        console.log('msg: ', msg)
                        if (msg.code === 201 ||
                            msg.code === 202 ||
                            msg.code === 204 ||
                            msg.code === 205
                        ) {
                            reject()
                        }
                    });
                    dataStream.on("end", () => {
                        resolve()
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
        await requestChat
        ChatClientUtils.requestCloseHeartbeat()
        console.log('requestChat: ', chatDatas)
        assert.equal(chatDatas[0].code, 305);
        assert.equal(chatDatas[1].code, 306);
        assert(chatDatas[chatDatas.length - 1].code === 307)
    });
})

describe('Request chat', () => {
    it('should return insufficient balance', async () => {
        const datas = []
        const chatDatas = []
        const ChatClientUtils = new ChatClient({
            chainInfo: nesaTestChain,
            privateKey: privateKey,
            modelName: requestSessionModel,
            lockAmount: '3000',
            singlePaymentAmount: '2000'
        })
        const requestSessionChat = new Promise((resolve, reject) => {
            ChatClientUtils.requestSession()
                .then((dataStream) => {
                    dataStream.on("data", (msg) => {
                        datas.push(msg)
                        if (msg.code > 310) {
                            reject()
                        }
                    });
                    dataStream.on("end", () => {
                        resolve()
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
        await requestSessionChat
        console.log('datas: ', datas)
        assert(datas[datas.length - 1].code === 304)
        const requestChat = new Promise((resolve, reject) => {
            console.log('requestChatrequestChat')
            ChatClientUtils.requestChat({
                    messages: [{
                        role: 'user',
                        content: 'hi'
                    }],
                    model: requestChatModel
                })
                .then((dataStream) => {
                    dataStream.on("data", (msg) => {
                        chatDatas.push(msg)
                    });
                    dataStream.on("end", () => {
                        console.log('chatDatas[chatDatas.length - 1].code: ', chatDatas[chatDatas.length - 1].code)
                        resolve()
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
        await requestChat
        ChatClientUtils.requestCloseHeartbeat()
        assert.equal(chatDatas[0].code, 305);
        assert.equal(chatDatas[1].code, 306);
        assert(chatDatas[chatDatas.length - 1].code === 205)
    });
})