declare module "stream-browserify"
declare module "@idena/vrf-js"
declare module "@lionello/secp256k1-js"
interface Window {
  nesaSdkVersion: string
  ethereum?: any,
  keplr?: any;
  getOfflineSigner?: any;
}
