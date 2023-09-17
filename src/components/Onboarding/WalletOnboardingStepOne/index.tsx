import { Button, ButtonGroup } from "@chakra-ui/react";
import { goTo } from 'react-chrome-extension-router';
import WalletOnboardingImportSeed from "../WalletOnboardingImportSeed";
import WalletOnboardingCreateNew from "../WalletOnboardingCreateNew";

const WalletOnboardingStepOne = () => {

  return (
    <div>
      <ButtonGroup gap='4'>
        <Button colorScheme='blue' variant='solid' size="lg" onClick={() => goTo(WalletOnboardingImportSeed)}>Import From Seed Phrase</Button>
        <Button colorScheme='blue' variant='solid' size="lg" onClick={() => goTo(WalletOnboardingCreateNew)}>Create New Wallet</Button>
      </ButtonGroup>
    </div>
  )
}

export default WalletOnboardingStepOne;