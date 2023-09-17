import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "@pages/options/Options.css";
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import WalletSettingsStorage from "@root/src/shared/storages/walletSettingsStorage";

const Options: React.FC = () => {

  const resetWalletData = () => {
    WalletDataStorage.reset()
    WalletSettingsStorage.setPrimaryWallet(false);
  }

  return (
    <div className="container text-lime-400">
      <div>
      <ButtonGroup gap='4'>
        <Button colorScheme='blue' variant='solid' size="lg" onClick={resetWalletData}>Reset Wallet Data</Button>
      </ButtonGroup>
      </div>
    </div>
  );
};

export default Options;
