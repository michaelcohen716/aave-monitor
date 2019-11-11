import { Contract, getDefaultProvider } from "ethers";
import LendingPool from "../contracts/LendingPool.json";
import Web3 from "web3"

const web3 = new Web3("https://kovan.infura.io/v3/07ed7736f59d4f8488a126f08c344233")

const LENDING_POOL_KOVAN = "0xB36017F5aafDE1a9462959f0e53866433D373404";
const provider = getDefaultProvider("kovan");

const contract = new Contract(LENDING_POOL_KOVAN, LendingPool, provider);
console.log('contract', contract)

// Kovan addresses
export const ASSET_MAPPING = {
  ETH: "0x804C0B38593796bD44126102C8b5e827Cf389D80",
  DAI: "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
  LINK: "0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789",
  MKR: "0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA",
  SUSD: "0xD868790F57B39C9B2B51b12de046975f986675f9",
  WBTC: "0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA",
  BAT: "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
  ZRX: "0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C",
  USDC: "0xe22da380ee6B445bb8273C81944ADEB6E8450422",
  REP: "0x260071C8D61DAf730758f8BD0d6370353956AE0E",
  KNC: "0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8",
  LEND: "0x1BCe8A0757B7315b74bA1C7A731197295ca4747a",
  TUSD: "0x1c4a937d171752e1313D70fb16Ae2ea02f86303e",
  AMPL: "0xd2eC3a70EF3275459f5c7a1d5930E9024bA3c4f3",
  USDT: "0x13512979ADE267AB5100878E2e0f485B568328a4",
  MANA: "0x738Dc6380157429e957d223e6333Dc385c85Fec7"
};

export const ASSETS = [
  "ETH",
  "DAI",
  "LINK",
  "MKR",
  "SUSD",
  "WBTC",
  "BAT",
  "ZRX",
  "USDC",
  "REP",
  "KNC",
  "LEND",
  "TUSD",
  "AMPL",
  "USDT",
  "MANA"
];

export async function getReserves(asset) {
  let resp = await contract.getReserveData(ASSET_MAPPING[asset]);
  return resp;
}

export async function getSummaryData(){
  const web3Contract = new web3.eth.Contract(LendingPool, LENDING_POOL_KOVAN)

  const allLogs = await web3Contract.getPastEvents({ fromBlock: 0, toBlock: "latest"})
  const depositLogs = await web3Contract.getPastEvents("Deposit", { fromBlock: 0, toBlock: "latest"})
  const borrowLogs = await web3Contract.getPastEvents("Borrow", { fromBlock: 0, toBlock: "latest"})
  const redeemLogs = await web3Contract.getPastEvents("RedeemUnderlying", { fromBlock: 0, toBlock: "latest"})
  const swapLogs = await web3Contract.getPastEvents("Swap", { fromBlock: 0, toBlock: "latest"})
  const repayLogs = await web3Contract.getPastEvents("Repay", { fromBlock: 0, toBlock: "latest"})
  const flashLogs = await web3Contract.getPastEvents("FlashLoan", { fromBlock: 0, toBlock: "latest"})

  const addresses = allLogs.map(log => log.returnValues["1"])
  const uniqueAddresses = [...new Set(addresses)];

  return {
    allTxs: allLogs.reverse(),
    totalTxs: allLogs.length,
    deposits: depositLogs.length,
    borrows: borrowLogs.length,
    redeems: redeemLogs.length,
    swaps: swapLogs.length,
    repays: repayLogs.length,
    flashes: flashLogs.length,
    uniques: uniqueAddresses.length
  }
}

export async function getUserData(address){
  const resp = await contract.getUserAccountData(address);
  return resp;
}

export async function getUserReserveData(reserve, user){
  const resp = await contract.getUserReserveData(reserve, user);
  return resp;
}