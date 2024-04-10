import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {GasPrice} from '@cosmjs/stargate';
import { NesaClient } from "./src/client";
import Long from "long";

const mnemonic = // Replace with your own mnemonic
  "will win clip toss grab swamp drastic flower point control silent multiply coffee flush increase endless dance walk liberty long enhance collect mango drill";
const myAddress = "cosmos12udhv0tw6yvr8zgxj8kq0xd44geffjqxv5pztv";

(async ()=>{
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    { prefix: "cosmos" }, // Replace with your own Bech32 address prefix
  );
  const nesaClient = await NesaClient.connectWithSigner(
    "http://47.238.190.19:11007",
    signer,
    myAddress,
    {
      gasPrice: GasPrice.fromString('0.025uatom'),
      estimatedBlockTime: 6,
      estimatedIndexerTime: 5,
    }
  );
  // const result = await nesaClient.registerModel('llama', '17');
  // console.table(JSON.stringify(result));
  const result = await nesaClient.getModel(Long.fromInt(1));
  console.log('result ', result)
})();
