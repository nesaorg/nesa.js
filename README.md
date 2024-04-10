# SDK API Interface Document

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
 const ChatUtils = new ChatClient({modelId:""})
 ```

#### `requestChat`: Start Conversation Interface

| params | remark                                          |
| ---- | ------------------------------------------------ |
| question  | question                                  |


| Code | Message                                          |
| ---- | ------------------------------------------------ |
| 200  | Normal response                                  |
| 401  | No signature found or the signature has expired. |
| 402  | Illegal link                                     |
| 403  | Chat ended normally                              |
| 404  | `websocket` connection error                     |

## Please note:

1. If there is an error related to VRF, publicKey or other related words during the call process, please try calling again. This is an occasional issue and we are working to resolve it.

2. Setting up the Keplr wallet plugin:
```
Path: Settings -> Advanced -> Modify connection point
Choose: Cosmos Hub Testnet, set 
RPC: http://47.238.190.19:11007
LCD: http://47.238.190.19:9032

```
### Example

```
import { ChatClient } from 'nesa-sdk';

const ChatUtils = new ChatClient({modelId:""})

ChatUtils.requestChat(question)
  .then(readableStream => {
    readableStream.on("data",(data) => {
        // Processing transmission data
    })
    readableStream.on("end",() => {
        // End of transmission
    })
  })
  .catch(error => {
    // Error handling
  });

```