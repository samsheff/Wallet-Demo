import { Button, ButtonGroup, Stack, Badge } from "@chakra-ui/react";
import { useEffect, useState } from 'react'
import { Wallet, randomBytes } from "ethers";
import { entropyToMnemonic, generateMnemonic } from "bip39";
import { goTo } from 'react-chrome-extension-router';
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import WalletHome from "../../Wallet/Home";
import WalletSettingsStorage from "@root/src/shared/storages/walletSettingsStorage";

import { Buffer } from "buffer";
window.Buffer = Buffer;

const WalletOnboardingCreateNew = () => {

  const [mnemonic, setMnemonic] = useState('')

  useEffect(() => {
    if (mnemonic == '') {
      initWallet()
    }
  })

  const initWallet = () => {
    const generatedSeedPhrase = generateMnemonic()
    setMnemonic(generatedSeedPhrase)
    
    const wallet = Wallet.fromPhrase(generatedSeedPhrase)
    const address = wallet.address

    WalletDataStorage.initialize(generatedSeedPhrase, address)
    WalletSettingsStorage.setPrimaryWallet(false);
  }

  return (
    <div>
      { mnemonic.length > 0 ? 
        <h4>
          Your Wallet Seed Phrase
        </h4> : ''}
      <Stack direction='row' marginBottom={"20px"}>
        {mnemonic.split(' ').map(word =>
          <Badge colorScheme='blue'>{word}</Badge>
        )}
      </Stack>
      <ButtonGroup gap='4'>
        <Button colorScheme='blue' variant='solid' size='lg' onClick={() => { navigator.clipboard.writeText(mnemonic) }}>Copy Seed Phrase</Button>
        <Button colorScheme='blue' variant='solid' size='lg' onClick={() => goTo(WalletHome)}>Got it!</Button>
      </ButtonGroup>
    </div>
  )
}

export default WalletOnboardingCreateNew;