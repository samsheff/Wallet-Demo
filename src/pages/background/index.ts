import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { ethers } from "ethers";
import { WalletRpcData } from "@root/src/shared/rpc/types";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('/src/pages/newtab/index.html')
    });
  }
});

chrome.runtime.onMessage.addListener(function (request: WalletRpcData, sender, sendResponse) {
  const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/f7dbea80ef694c79a3019ccc0f44513c")
  console.log(request);
  for (let i = 0; i < request.data.length; i++) {
    provider.send(request.data[i].method, request.data[i].params).then((response) => {
      console.log(response);
      sendResponse({ requestId: request.requestId, data: response });
    })
  }
  return true;

});