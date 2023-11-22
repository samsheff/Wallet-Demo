import { Action } from "@root/src/pages/workers";
import { useState, useEffect } from "react";

export class DefiWorker {
  private static instance: DefiWorker;
  public initialized = false;
  public worker: Worker;

  constructor() {
    this.worker = new Worker("/src/pages/worker/index.js", { type: "module" });
  }

  static getInstance(): DefiWorker {
    if (!DefiWorker.instance) {
      DefiWorker.instance = new DefiWorker();
    }
    return DefiWorker.instance;
  }
}

async function useWorker(action: Action, payload: unknown): Promise<unknown> {
  return new Promise((res, rejects) => {
    DefiWorker.getInstance().worker.postMessage({ action, payload });

    DefiWorker.getInstance().worker.onmessage = function (e) {
      console.log(`useWorker Response: ${e.data}`);
      res(e.data);
    };

    DefiWorker.getInstance().worker.onerror = function (e) {
      console.log(`Error from Worker: ${e.error}`);
      rejects(e.error);
    };
  });
}

// Custom hook that fetches data from a specified API URL
const useBalance = (inputAddresses) => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBalances = async () => {
      try {
        // Start loading
        setLoading(true);

        // Reset error state
        setError(null);

        for (let index = 0; index < inputAddresses.length; index++) {
          if (inputAddresses[index]) {
            balances.push(
              (await useWorker(
                Action.GetBalance,
                inputAddresses[index]
              )) as string
            );
          }
        }

        // Set data state with the response data
        console.log(balances);
      } catch (err) {
        // If an error occurs, set error state with error information
        setError(err.message);
      } finally {
        // Stop loading whether we succeeded or failed
        setLoading(false);
      }
    };

    getBalances();
  }, [inputAddresses]); // Only re-run the effect if url changes

  // Custom hook returns data, loading state, and error state
  return { balances, loading, error };
};

export { useBalance, useWorker };
