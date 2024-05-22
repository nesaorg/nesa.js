# NESA SDK

The SDK is designed to be integrated into frontend projects, allowing seamless integration with the Keplr wallet extension. It enables users to perform signing and messaging functionalities within the frontend project.

## If using SDK in nodejs environment, please refer to the /demo folder

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

### Get instructions about chat progress

The SDK will return a total of 7 statuses, see the table below. The specific status will be returned through the interfaces **requestSession** and **requestChat**, the specific status is as follows:

| Code | Message                                | Remark                                                                                                           | Api                |
| ---- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------ |
| -    | Connecting to Nesa chain               | Default step. The initialization SDK displays this state by default. The SDK will not output this step.(Default) | -                  |
| 301  | Connected to Nesa chain                | Nesa chain is connected, and returns after the chain parameters are initialized. (After click 'start inference') | **requestSession** |
| 302  | Choosing an inference validator        | Signature successful, Choosing an inference validator                                                            | **requestSession** |
| 303  | Connecting to the validator            | Connecting to the validator                                                                                      | **requestSession** |
| 304  | Waiting for query                      | Waiting for query                                                                                                | **requestSession** |
| 305  | Conducting inference                   | Conducting inference (After click 'start query')                                                                 | **requestChat**    |
| 306  | Receiving responses                    | Receiving responses                                                                                              | **requestChat**    |
| 307  | Task completed, wait for another query | Task completed, wait for another query                                                                           | **requestChat**    |

#### `requestSession`: First initiate a signature

This is a promise that will call back a **readableStream** object. You can get the conversation information through **readableStream.on('data')**, which will return an object:

```
  {
    code: 200,          // code
    message: "message", //  message
  }
```

Return Code and message

| Code | Message                          | Remark                                                                           |
| ---- | -------------------------------- | -------------------------------------------------------------------------------- |
| 200  | TransactionHash                  | requestSession transaction Hash                                                  |
| 301  | Connected to Nesa chain          | Nesa chain is connected, and returns after the chain parameters are initialized. |
| 302  | Choosing an inference validator  | Signature successful, Choosing an inference validator                            |
| 303  | Connecting to the validator      | Connecting to the validator                                                      |
| 304  | Waiting for query                | Waiting for query                                                                |
| 311  | LockAmount cannot be less than x | LockAmount check                                                                 |
| 312  | Sign register session failed     | Sign register session failed message                                             |
| 313  | Register session error           | Register session failed error                                                    |
| 314  | Chain params format error        | Chain params format error                                                        |
| 315  | Chain params error               | Chain params error message                                                       |
| 316  | SDK client init error            | SDK client init error                                                            |
| 317  | Wallet connect error             | Wallet connect error message                                                     |

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

| Code | Message                                          | Remark                                 |
| ---- | ------------------------------------------------ | -------------------------------------- |
| 200  | Normal response                                  |
| 201  | No signature found or the signature has expired. |
| 202  | Illegal link                                     |
| 203  | Current chat contributions                       |
| 204  | `websocket` connection error message             |
| 205  | Business error information returned              |
| 305  | Conducting inference                             | Conducting inference                   |
| 306  | Receiving responses                              | Receiving responses                    |
| 307  | Task completed, wait for another query           | Task completed, wait for another query |

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
        //  200 : requestSession transaction Hash

        //  301 : Connected to Nesa chain
        //  302 : Choosing an inference validator
        //  303 : Connecting to the validator
        //  304 : Waiting for query

        //  311 : LockAmount cannot be less than x, LockAmount check
        //  312 : Sign register session failed
        //  313 : Register session error
        //  314 : Chain params format error
        //  315 : Chain params error
        //  316 : SDK client init error
        //  317 : Wallet connect error
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
        //  305 : Conducting inference
        //  306 : Receiving responses
        //  307 : Task completed, wait for another query
    })
    readableStream.on("end",() => {
        // End of transmission
    })
  })
  .catch(error => {
    // Error handling
  });
```
