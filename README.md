# SDK API Interface Document

### Install
```
  npm install @idena/vrf-js @lionello/secp256k1-js
```

### Init SDK

 ```
 import ChatSDK from "/nesaSdk/chatSDK";
 const ChatUtils = new ChatSDK({modelId: ""});
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

## Calling Example

### Example

```
import ChatSDK from "/nesaSdk/chatSDK";

const ChatUtils = new ChatSDK({modelId: "modelId"})
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