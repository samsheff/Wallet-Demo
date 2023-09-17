import WalletDataStorage, { WalletData } from "@root/src/shared/storages/walletDataStorage";
import WalletSettingsStorage, { WalletSettings } from "@root/src/shared/storages/walletSettingsStorage";
import { useEffect, useState } from "react";
import { startHandlingRpcRequests } from "@root/src/shared/rpc";
import ConflictResolutionModal from "@root/src/components/ConflictResolutionModal";

export default function ContentApp() {

  const [showConflictModal, setShowConflictModal] = useState(false);

  useEffect(() => {

    startHandlingRpcRequests(function (conflictResponseHandler) {
      WalletDataStorage.getInitialized().then((initialized) => {
        if (initialized === false) {
          return;
        }

        setShowConflictModal(true);

        chrome.storage.sync.onChanged.addListener((changes) => {
          if (changes["walletsettings"]) {
            if (changes["walletsettings"].newValue["primaryWallet"] === true) {
              WalletSettingsStorage.setPrimaryWallet(true);
              conflictResponseHandler(true);
            } else {
              conflictResponseHandler(false);
            };
          }
        })
      })
    })
  }, []);

  return (
    <>
      {showConflictModal ?
        <ConflictResolutionModal></ConflictResolutionModal> : ""
      }
    </>
  )
}
