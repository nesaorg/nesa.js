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
const ChatUtils = new ChatClient({modelName: ""})
```

#### `requestSession`: First initiate a signature

#### `requestChat`: Start Conversation Interface

| Return Code | Message                                          |
| ----------- | ------------------------------------------------ |
| 200         | Normal response                                  |
| 201         | No signature found or the signature has expired. |
| 202         | Illegal link                                     |
| 203         | Current Chat contributions                       |
| 204         | `websocket` connection error message             |
| 205         | `websocket` connection close reason , See below  |

### 205 Business Error Codes

| Error Code | Error Message              |
| ---------- | -------------------------- |
| 0          | Operation successful       |
| 1001       | Websocket upgrade failed   |
| 1002       | Init connection failed     |
| 1003       | Read message failed        |
| 1004       | Invalid param              |
| 1005       | Denom mismatch             |
| 1006       | Duplicate query            |
| 1007       | Recover public key failed  |
| 1008       | Verify session info failed |
| 1009       | Save session info failed   |
| 1010       | Write message failed       |
| 1011       | Invalid payment            |
| 1012       | Session already exists     |
| 1013       | Write chat message failed  |
| 1014       | Invalid channel            |
| 1015       | Balance insufficient       |
| 1016       | Internal db error          |

### Please note:

1. Setting up the Keplr wallet plugin:

```
Path: Settings -> Advanced -> Modify connection point
Choose: Cosmos Hub Testnet, set
RPC: http://156.249.28.51:11007
LCD: http://156.249.28.51:9032

```

### Example

```
import { ChatClient } from 'nesa-sdk';

const ChatUtils = new ChatClient({
    modelName: "meta-llama/Llama-2-13b-hf",  // At this stage, "meta-llama/Llama-2-13b-hf" must be filled in
    chainInfo: ChainInfo // optional, The current chain information is the rpc address : "http://156.249.28.51:11007",
    lockAmount: lockAmount // optional, default is 1000
  })

// This method can be called once
ChatUtils.requestSession()
  .then(result => {
    if (result?.transactionHash) {
      // Signature success
      // After successfully detecting the signature, call the requestChat method
    }else{
      // Signature failed
    }
  })
  .catch(error => {
    // Error handling
  });

// Please call ChatUtils.requestSession before calling and successfully get the callback
ChatUtils.requestChat({
  "messages": [
    {'role': 'user', 'content': QUESTION}
    // ...you can add history messages
  ],
  // you can add other hyperparameter,like:
  "frequency_penalty": 0.5,
})
  .then(readableStream => {
    readableStream.on("data",(data) => {
        // Processing transmission data
        // Return different messages according to different code codes
        //  200 : Normal data return
        //  201 : No signature found or the signature has expired
        //  202 : Illegal agent websocket link
        //  203 : Current query contributions
        //  204 : Websocket connection abnormality error message
        //  205 : Websocket business error information returned ,Please see the **205 Business Error Codes** table above
    })
    readableStream.on("end",() => {
        // End of transmission
    })
  })
  .catch(error => {
    // Error handling
  });
```
