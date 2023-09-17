import { Button, Input } from "@chakra-ui/react";
import { useState } from 'react'
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import { Wallet } from "ethers";
import { goTo } from 'react-chrome-extension-router';
import WalletHome from "../../Wallet/Home";
import WalletSettingsStorage from "@root/src/shared/storages/walletSettingsStorage";

const WalletOnboardingImportSeed = () => {

  const [mnemonic, setMnemonic] = useState('')
  const handleMnemonicChange = (event) => setMnemonic(event.target.value)

  const initWallet = () => {
    const wallet = Wallet.fromPhrase(mnemonic)
    const address = wallet.address
    WalletDataStorage.initialize(mnemonic, address);
    WalletSettingsStorage.setPrimaryWallet(false);

    goTo(WalletHome)
  }

  return (
    <div>
      <Input size='lg' placeholder='Seed Phrase'
        value={mnemonic}
        onChange={handleMnemonicChange} />
      <Button colorScheme='blue' variant='solid' size='lg' onClick={initWallet}>Import Seed Phrase</Button>
    </div>
  )
}

export default WalletOnboardingImportSeed;