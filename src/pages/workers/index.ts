import { Wallet } from "ethers";
import * as ethers from "ethers";

console.log("worker loaded");

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/f7dbea80ef694c79a3019ccc0f44513c"
);

export enum Action {
  GetAddress = "getAddress",
  GetBalance = "getBalance",
}

type EventMessage = {
  data: WorkerMessage;
};

type WorkerMessage = {
  action: Action;
  payload: any;
};

onmessage = (e: EventMessage) => {
  console.log("Message received from main script");

  if (e.data.action === Action.GetAddress) {
    getAddress(e.data.payload);
  } else if (e.data.action === Action.GetBalance) {
    getBalance(e.data.payload);
  }
};

function getAddress(seed: string) {
  const pKey = Wallet.fromPhrase(seed);
  console.log(pKey.address);
  console.log("Posting message back to main script");
  postMessage(pKey.address);
}

async function getBalance(address: string) {
  const balance = await provider.getBalance(address);
  console.log(balance);
  console.log("Posting message back to main script");
  postMessage(balance);
}

export default {};
