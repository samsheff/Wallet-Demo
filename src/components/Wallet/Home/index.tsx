import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import WalletDataStorage from "@root/src/shared/storages/walletDataStorage";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const WalletHome = () => {

  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('0.0')
  const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/f7dbea80ef694c79a3019ccc0f44513c")

  useEffect(() => {
    
    WalletDataStorage.getAddress(0).then(async (address) => {
      setAddress(address)
      setBalance(ethers.formatEther(await provider.getBalance(address)))
    })
  })
  
  return (
    <div>
      <Stat>
        <StatLabel>{address}</StatLabel>
        <StatNumber>{balance} ETH</StatNumber>
        <StatHelpText>Address 1</StatHelpText>
      </Stat>
    </div>
  )
}

export default WalletHome;