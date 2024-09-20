const { exit } = require('process')
const ChatClient = require('../dist/chatClient').default
const readline = require("node:readline");

const address = 'nesa143gwwdtxaxspv5rqesyxnza8sxd9gjkyvapc7f'
const privateKey = 'c2769207c112c66a980dc50b74775e7a3cdb5e37a79884ebed2ae50417a7e237'
const modelName = 'Orenguteng/Llama-3-8B-Lexi-Uncensored'

const nesaTestChain = {
    chainId: 'nesa-testnet-3',
    chainName: 'Nesa Testnet',
    chainSymbolImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/chain.png",
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
    currencies: [
        {
            coinDenom: "NES",
            coinMinimalDenom: "unes",
            coinDecimals: 6,
            coinGeckoId: "nesa",
            coinImageUrl:
                "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "NES",
            coinMinimalDenom: "unes",
            coinDecimals: 6,
            coinGeckoId: "nesa",
            coinImageUrl:
                "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
            gasPriceStep: {
                low: 0.01,
                average: 0.02,
                high: 0.1,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "NES",
        coinMinimalDenom: "unes",
        coinDecimals: 6,
        coinGeckoId: "nesa",
        coinImageUrl:
            "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nesa/nes.png",
        gasPriceStep: {},
        features: ["cosmwasm"],
    },
}

const requestSession = (chatClient) => {
    chatClient.requestSession()
        .then((dataStream) => {
            dataStream.on("data", msg => { });
            dataStream.on("end", () => { });
        })
        .catch((error) => {
            console.error('requestSession error: ', error);
        });
}

const requestChat = (chatClient, question) => {
    const messageData = {
        model: modelName,
        messages: [{ role: "user", content: question }],
        stream: true,
        // To be included in production builds, from 'bson'/'mongodb' package
        // session_id: {
        //     session_id: new ObjectId(),
        //     user_id: new ObjectId()
        // }
    };
    chatClient.requestChat(messageData)
        .then((dataStream) => {
            let answer = ''
            dataStream.on("data", (msg) => {
                if (msg?.code === 200) {
                    console.info(`${new Date().toLocaleTimeString(undefined, { timeStyle: 'medium'})}: ${msg?.message}`);
                    answer = answer + msg?.message
                }
            });
            dataStream.on("end", () => {
                console.log('Answer: ', answer);
                exit();
            });
        })
        .catch((error) => {
            console.error('requestChat error: ', error)
            exit();
        });
}

const main = async () => {
    const chatClient = new ChatClient({
        chainInfo: nesaTestChain,   //  chain info
        privateKey: privateKey,     //  private key
        modelName: modelName, // model name
    });
    const readlineClient = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const statusStream = await chatClient.requestChatStatus();
    statusStream.on('data', msg => {
        if (msg?.code === 304) {
            readlineClient.question("Please input question: \n", (question) => {
                console.log(`Asking: ${question}`);
                requestChat(chatClient, question)
            });
        }
    });
    statusStream.on('error', error => {
        console.error('statusStream error: ', error);
    });

    requestSession(chatClient);
}

main().catch(e => { console.error(e); process.exit(1) });
