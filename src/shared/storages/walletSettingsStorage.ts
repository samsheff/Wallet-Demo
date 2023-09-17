import {
  BaseStorage,
  createStorage,
  StorageType,
} from "@src/shared/storages/base";

export type WalletSettings = {
  primaryWallet: boolean
};

type WalletSettingsStorageType = BaseStorage<WalletSettings> & {
  setPrimaryWallet: (primary: boolean) => void;
};

const storage = createStorage<WalletSettings>("walletsettings", {primaryWallet: false}, {
  storageType: StorageType.Sync,
});

const WalletSettingsStorage: WalletSettingsStorageType = {
  ...storage,
  // TODO: extends your own methods
  setPrimaryWallet: (primary) => {
    storage.set((walletSettings) => {
      walletSettings.primaryWallet = primary;

      return walletSettings;
    });
  },
};

export default WalletSettingsStorage;
