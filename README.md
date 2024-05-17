# NESA SDK

The SDK is designed to be integrated into frontend projects, allowing seamless integration with the Keplr wallet extension. It enables users to perform signing and messaging functionalities within the frontend project.

### Install & Usage

```
npm install
npm run build
npm link
```

```
// in your project
npm link nesa-sdk
```

### Init SDK

```
import { ChatClient } from 'nesa-sdk';
const ChatUtils = new ChatClient({
  modelName: "",  //  model name
  lockAmount: "", //  optional. lock amount , default 1000
  chainInfo: {}   //  optional. chainInfo , Refer to the defaultChainInfo format in src/default.config.ts
  walletName: ""  //  optional. walletName , default keplr , When using metamask, please set this parameter to: npm:@leapwallet/metamask-cosmos-snap
  singleLockUpAmount: ""  //  optional. Number of single signed payment , default 100
  lowBalance: ""  //  optional. The remaining unused amount of payment. If unused payment is lower than this value, payment will be regenerated., default 10
})
```

#### `requestSession`: First initiate a signature

This is a promise that will call back a **readableStream** object. You can get the conversation information through **readableStream.on('data')**, which will return an object:

```
  {
    code: 200,          // code
    message: "message", //  message
  }
```

Return Code and message

| Code | Message                         | Remark                                                                                                   |
| ---- | ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 200  | TransactionHash                 | requestSession transaction Hash                                                                          |
| 301  | Connecting to Nesa chain        | Default step. The initialization SDK displays this state by default. The SDK will not output this state. |
| 302  | Connected to Nesa chain         | Nesa chain is connected, and returns after the chain parameters are initialized.                         |
| 303  | Choosing an inference validator | Signature successful, Choosing an inference validator                                                    |
| 304  | Connecting to the validator     | Connecting to the validator                                                                              |
| 305  | Waiting for query               | Waiting for query                                                                                        |

#### `requestChat`: Start Conversation Interface

This is a promise that will call back a **readableStream** object. You can get the conversation information through **readableStream.on('data')**, which will return an object:

```
  {
    code: 200,  // code
    message: "hello", //  message
    total_payment: {  //  total_payment , If code is 200 it will return
      amount: 10, //  total_payment amount
      denom: 'unes' //  denom
    }
  }
```

Return Code and message

| Code | Message                                          | Remark                                                                        |
| ---- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| 200  | Normal response                                  |
| 201  | No signature found or the signature has expired. |
| 202  | Illegal link                                     |
| 203  | Current chat contributions                       |
| 204  | `websocket` connection error message             |
| 205  | Business error information returned              |
| 305  | Waiting for query                                | Waiting for query                                                             |
| 306  | Conducting inference                             | Conducting inference                                                          |
| 307  | Receiving responses                              | Receiving responses                                                           |
| 308  | Task completed                                   | Task completed.If you want to continue chat, you need to requestSession again |

### Please note:

1. Setting up the Keplr wallet plugin:

```
Path: Settings -> Advanced -> Modify connection point
Choose: Nesa Testnet, set
RPC: https://rpc.test.nesa.ai
LCD: https://lcd.test.nesa.ai

```

### Example

```
import { ChatClient } from 'nesa-sdk';

const ChatUtils = new ChatClient({
    modelName: "",
    chainInfo: ChainInfo // optional, The default chain config is src/default.config.ts,
    lockAmount: lockAmount // optional, default is 1000
  })

// This method can be called once
ChatUtils.requestSession()
  .then(result => {
    readableStream.on("data",(data) => {
        //  Processing transmission data
        const {code, message} = data
        if (code === 200) {
          // Streaming data return for TransactionHash
          const transactionHash = message
          ...
        } else {
          // Exception information prompt
          const progressMessage = message
          ...
        }
        //  For detailed code and message, please refer to the above API
        //  200 :  requestSession transaction Hash
        //  302 :  Connected to Nesa chain
        //  303 :  Choosing an inference validator
        //  304 :  Connecting to the validator
        //  305 :  Waiting for query
    })
    readableStream.on("end",() => {
        // End of transmission
    })}
  })
  .catch(error => {
    // Error handling
  });

// Please call ChatUtils.requestSession before calling and successfully get the callback
ChatUtils.requestChat({
  "messages": [
    // ...you can add history messages
    //  Please follow the following rules to set role:
    //  Use "user" for user queries (unless you know that the model side uses a different name);
    //  The content of the assistant's answer is always returned using "assistant".
    //  For example:
    {'role': 'user', 'content': 'user question 1'},
    {'role': 'assistant', 'content': 'assistant answer 1'},
    {'role': 'user', 'content': 'user question 2'},
    {'role': 'assistant', 'content': 'assistant answer 2'},
    ...
  ],
  "model": "",  //  model name
  // you can add other hyperparameter,like:
  "frequency_penalty": 0.5,
})
  .then(readableStream => {
    readableStream.on("data",(data) => {
        //  Processing transmission data
        const {code, message, total_payment} = data
        if (code === 200) {
          // Streaming data return for normal conversation
          const nextChatResponse = message
          const totalPayment = total_payment
          ...
        } else {
          // Exception information prompt
          const infoMessage = message
          ...
        }
        //  For detailed code and message, please refer to the above API
        //  200 : Normal data return
        //  201 : No signature found or the signature has expired
        //  202 : Illegal agent websocket link
        //  203 : Current query contributions
        //  204 : Websocket connection abnormality error message
        //  205 : Websocket business error information returned

        //  Processing transmission data
        //  305 : Waiting for query
        //  306 : Conducting inference
        //  307 : Receiving responses
        //  308 : Task completed
    })
    readableStream.on("end",() => {
        // End of transmission
    })
  })
  .catch(error => {
    // Error handling
  });
```
