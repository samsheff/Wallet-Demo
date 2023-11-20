import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Action } from "@root/src/pages/workers";
import useWorker from "@root/src/shared/hooks/useWorker";

const WalletHome = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0.0");
  let worker: Worker;

  useEffect(() => {
    WalletDataStorage.getAddress(0).then(async (address) => {
      setAddress(address);
      useWorker(Action.GetBalance, address, (balance: string) => {
        setBalance(ethers.formatEther(balance));
      });
    });
  });

  return (
    <div>
      <Stat>
        <StatLabel>{address}</StatLabel>
        <StatNumber>{balance} ETH</StatNumber>
        <StatHelpText>Address 1</StatHelpText>
      </Stat>
    </div>
  );
};

export default WalletHome;
