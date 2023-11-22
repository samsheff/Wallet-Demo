import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
} from "@chakra-ui/react";
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import { useEffect, useState } from "react";
import { useBalance } from "@root/src/shared/hooks/useWorker";
import { ethers } from "ethers";

const WalletHome = () => {
  const [address, setAddress] = useState([]);
  const { balances, loading, error } = useBalance(address);

  return (
    <div>
      <Stat>
        <StatLabel>{address[address.length - 1]}</StatLabel>
        <StatNumber>
          {balances.length > 0
            ? ethers
                .formatEther(balances[balances.length - 1].toString())
                .toString()
            : "0.0"}{" "}
          ETH
        </StatNumber>
        <StatHelpText>
          {loading ? "Loading..." : error ? error.message : "Address 1"}
        </StatHelpText>
      </Stat>
      <Button
        onClick={() => {
          WalletDataStorage.getAddress(0).then(async (addressOne) => {
            setAddress([addressOne]);
          });
          setTimeout(() => {
            address.push("0x9a85680EE7c24F198E84aF2b47d3002458e030b3");
            setAddress(address);
          }, 5000);
        }}
      >
        Test
      </Button>
    </div>
  );
};

export default WalletHome;
