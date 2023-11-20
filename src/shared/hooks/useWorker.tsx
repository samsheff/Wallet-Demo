import { Action } from "@root/src/pages/workers";

export default async function useWorker(
  action: Action,
  payload: unknown,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function
): Promise<any> {
  const worker = new Worker("/src/pages/worker/index.js", { type: "module" });

  worker.postMessage({ action, payload });

  worker.onmessage = function (e) {
    console.log(`useWorker Response: ${e.data}`);
    callback(e.data);
    worker.terminate();
  };
}
