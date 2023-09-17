interface Window {
  ethereum: any
}

enum WalletRequestType {
  Request,
  Response,
  ConflictRequest,
  ConflictResponse
}

if (window.ethereum) {
  setTimeout(() => {
    window.postMessage({type: WalletRequestType.ConflictRequest});
  }, 50);
  window.addEventListener('message', (event) => {
    console.log(event.data.type);
    if (event.data.type === WalletRequestType.ConflictResponse && event.data.inject === true) {
      injectProvider();
    }
  });
} else {
  injectProvider();
}

function injectProvider() {
  const provider = new Proxy({isConnected: false}, {
    get: function (target, method) {
      console.log(method)
      if (method === "isConnected") {
        return target.isConnected;
      }
      // Handle the RPC method call here and send a message to the background script
      return function (...data) {
        console.log(method)
        console.log(data)
        if (method === 'request') {
          const requestId = Math.floor(Math.random() * 100000).toString();
          return new Promise((resolve, reject) => {
            window.addEventListener('message', (event) => {
              if (event.data.type === WalletRequestType.Response && event.data.requestId == requestId) {
                target.isConnected = true;
                resolve(event.data.data);
              }
            });
            if (!target.isConnected) {
              setTimeout(() => {
                window.postMessage({type: WalletRequestType.Request, requestId, data}, "*");
              }, 50);
            } else {
              window.postMessage({type: WalletRequestType.Request, requestId, data}, "*"); 
            }

          });
        }
      };
    },
  });

  window.ethereum = provider;

  console.log("provider injected!")
}