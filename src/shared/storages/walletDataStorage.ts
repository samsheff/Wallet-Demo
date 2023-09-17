import {
  BaseStorage,
  createStorage,
  StorageType,
} from "@src/shared/storages/base";

export type WalletData = {
  initialized: boolean,
  addresses: Array<string>,
  menmonic: string
};

type WalletDataStorageType = BaseStorage<WalletData> & {
  initialize: (mnemonic, address) => void;
  getAddress: (index) => Promise<string>;
  getInitialized: () => Promise<boolean>;
  reset: () => void;
};

const storage = createStorage<WalletData>("walletdata", {initialized: false, addresses: [], menmonic: null}, {
  storageType: StorageType.Sync,
});

const WalletDataStorage: WalletDataStorageType = {
  ...storage,
  // TODO: extends your own methods
  initialize: (mnemonic, address) => {
    storage.set((walletdata) => {
      walletdata.menmonic = mnemonic;
      walletdata.addresses.push(address);
      walletdata.initialized = true;

      return walletdata;
    });
  },

  getAddress: async (index) => {
    const walletData = await storage.get();
    if (index < walletData.addresses.length) {
      return walletData.addresses[index];
    } else {
      return null;
    }
  },

  getInitialized: async () => {
    const walletData = await storage.get();
    return walletData.initialized;
  },

  reset: () => {
    storage.set((walletData) => {
      walletData.initialized = false;
      walletData.addresses = [];
      walletData.menmonic = null;

      return walletData;
    })
  }
};

export default WalletDataStorage;
