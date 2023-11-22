import { Button, ButtonGroup, Stack, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { goTo } from "react-chrome-extension-router";
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import WalletHome from "../../Wallet/Home";
import WalletSettingsStorage from "@root/src/shared/storages/walletSettingsStorage";

import { Buffer } from "buffer";
import { Action } from "@root/src/pages/workers";
import { useWorker } from "@root/src/shared/hooks/useWorker";
window.Buffer = Buffer;

const WalletOnboardingCreateNew = () => {
  const [mnemonic, setMnemonic] = useState("");

  useEffect(() => {
    if (mnemonic == "") {
      initWallet();
    }
  });

  const initWallet = async () => {
    const generatedSeedPhrase = generateMnemonic();
    setMnemonic(generatedSeedPhrase);
    const address = await useWorker(Action.GetAddress, mnemonic);
    WalletDataStorage.initialize(mnemonic, address);
    WalletSettingsStorage.setPrimaryWallet(false);
    console.log("Response: " + address);
  };

  return (
    <div>
      {mnemonic.length > 0 ? <h4>Your Wallet Seed Phrase</h4> : ""}
      <Stack direction="row" marginBottom={"20px"}>
        {mnemonic.split(" ").map((word) => (
          <Badge colorScheme="blue" key={word}>
            {word}
          </Badge>
        ))}
      </Stack>
      <ButtonGroup gap="4">
        <Button
          colorScheme="blue"
          variant="solid"
          size="lg"
          onClick={() => {
            navigator.clipboard.writeText(mnemonic);
          }}
        >
          Copy Seed Phrase
        </Button>
        <Button
          colorScheme="blue"
          variant="solid"
          size="lg"
          onClick={() => goTo(WalletHome)}
        >
          Got it!
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default WalletOnboardingCreateNew;
