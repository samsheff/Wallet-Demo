import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Onboarding } from '@reactive-labs/onboarding';
import WalletOnboardingStepOne from '../WalletOnboardingStepOne';
import { goTo } from 'react-chrome-extension-router';
import WalletDataStorage from '@root/src/shared/storages/walletDataStorage';
import WalletHome from '../../Wallet/Home';

const WalletOnboarding = () => {

  useEffect(() => {
    WalletDataStorage.get().then((wallet) => {
      if (wallet.initialized) {
        goTo(WalletHome)
      }
    });
  })

  return (
    <div>
        <WalletOnboardingStepOne></WalletOnboardingStepOne>
    </div>
  );
};

export default WalletOnboarding;
