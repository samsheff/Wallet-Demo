import { WalletRpcData, WalletRequestType } from "./types";

export function startHandlingRpcRequests (permissionRequestCallback: Function) {
  window.addEventListener(
    "message",
    (event) => {
      if (event.data.type === WalletRequestType.Request) {
        handleRpcRequest(event.data);
      } else if (event.data.type === WalletRequestType.ConflictRequest) {
        handleProviderConflict(permissionRequestCallback);
      }
    },
  );
}

export function handleRpcRequest(data: WalletRpcData) {
  if (data.data.length === 0) {
    return;
  }

  const method = data.data[0].method;

  // Kinda hacky, but for a coding challenge I think this is enough :)
  if (["eth_requestAccounts", "eth_accounts"].includes(method)) {
    chrome.storage.sync.get("walletdata", function (walletdata) {
      if (walletdata.walletdata.initialized === true && walletdata.walletdata.addresses.length > 0) {
        window.postMessage({ type: WalletRequestType.Response, requestId: data.requestId, data: [walletdata.walletdata.addresses[0]] }, "*")
      }
    });
  } else {
    handleNetworkRpcRequest(data);
  }
}

export function handleProviderConflict(permissionRequestCallback: Function) {

  chrome.storage.sync.get("walletsettings", function (settings) {
    if (!settings.walletsettings || settings.walletsettings.primaryWallet === false) {
      if (permissionRequestCallback) {
        permissionRequestCallback(function (permissionGranted) {
          window.postMessage({ type: WalletRequestType.ConflictResponse, inject: permissionGranted }, "*") 
        })
      } else {
        window.postMessage({ type: WalletRequestType.ConflictResponse, inject: false }, "*")
      }
    } else {
      window.postMessage({ type: WalletRequestType.ConflictResponse, inject: true }, "*")
    }
  });
}

export function handleNetworkRpcRequest(data: WalletRpcData) {
  chrome.runtime.sendMessage(
    data,
    function (response) {
      window.postMessage({ type: WalletRequestType.Response, requestId: response.requestId, data: response.data }, "*")
    }
  )
}