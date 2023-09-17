import { Button, ButtonGroup, Stack, Badge } from "@chakra-ui/react";
import { useEffect, useState } from 'react'
import { Wallet, randomBytes } from "ethers";
import { entropyToMnemonic } from "bip39";
import { goTo } from 'react-chrome-extension-router';
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import WalletHome from "../../Wallet/Home";
import { Buffer as BufferPolyfill } from 'buffer'
import WalletSettingsStorage from "@root/src/shared/storages/walletSettingsStorage";
declare var Buffer: typeof BufferPolyfill;

const WalletOnboardingCreateNew = () => {

  const [mnemonic, setMnemonic] = useState('')

  useEffect(() => {
    if (mnemonic == '') {
      initWallet()
    }
  })

  const initWallet = () => {
    const generatedSeedPhrase = entropyToMnemonic(Buffer.from(randomBytes(16).buffer))
    setMnemonic(generatedSeedPhrase)
    console.log(generatedSeedPhrase)
    const wallet = Wallet.fromPhrase(generatedSeedPhrase)
    const address = wallet.address
    WalletDataStorage.initialize(generatedSeedPhrase, address)

    WalletSettingsStorage.setPrimaryWallet(false);
  }

  return (
    <div>
      <Stack direction='row'>
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