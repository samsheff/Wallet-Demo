import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import WalletSettingsStorage from '@root/src/shared/storages/walletSettingsStorage';

const ConflictResolutionModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  function setPrimaryWallet(primaryWallet: boolean) {
    WalletSettingsStorage.setPrimaryWallet(primaryWallet);
    setIsOpen(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wallet Provider Conflict!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>It looks like you have another wallet installed (Such as Metamask) that is conflicting with Lambda Wallet. To continue, please let us know if you'd like to set Lambda Wallet as the default or keep the existing one.</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={() => setPrimaryWallet(true)}>
              Use Lambda
            </Button>
            <Button variant='blue' onClick={() => setPrimaryWallet(false)}>
              Keep Existing Wallet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default ConflictResolutionModal;
