console.log("content loaded");

const inPage = document.createElement('script');
inPage.src = chrome.runtime.getURL('/src/pages/inpage/index.js');
document.documentElement.appendChild(inPage);

import('../../components/ContentScriptApp')



// window.addEventListener(
//   "message",
//   (event) => {
//     console.log(event)
//     if (event.data.type === "request") {
//       const method = event.data.data[0].method;

//       console.log(method)
//       if (["eth_requestAccounts", "eth_accounts"].includes(method)) {
//         chrome.storage.sync.get("walletdata", function (walletdata) {
//           console.log(walletdata.walletdata)
//           if (walletdata.walletdata.initialized === true && walletdata.walletdata.addresses.length > 0) {
//             window.postMessage({ type: "response", requestId: event.data.requestId, data: [walletdata.walletdata.addresses[0]] }, "*")
//           }
//         });
//       } else {
//         sendRpcRequest(event.data);
//       }
//     } else if (event.data.type === "conflictRequest") {
//       chrome.storage.sync.get("walletsettings", function (settings) {
//         console.log(settings.walletsettings)
//         if (!settings.walletsettings || settings.walletsettings.primaryWallet === false) {
//           window.postMessage({ type: "conflictResponse", inject: false }, "*")
//         } else {
//           window.postMessage({ type: "conflictResponse", inject: true }, "*")
//         }
//       });
//     }

//   },
//   false,
// );
  
// function sendRpcRequest(request) {
//   chrome.storage.sync.get("walletdata", function (walletdata) {
//     if (walletdata.walletdata.initialized === true) {
//       chrome.runtime.sendMessage(
//         request,
//         function (response) {
//           console.log(response);
//           window.postMessage({ type: "response", requestId: response.requestId, data: response.data }, "*")
//         }
//       )
//     }
//   });
// }