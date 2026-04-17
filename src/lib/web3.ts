/**
 * Mock Web3 Service for Shieldtag
 * Implements wallet abstraction and dual model logic (Consumable/Durable)
 */

export const walletService = {
  getOrCreateWallet: () => {
    const existing = localStorage.getItem('shieldtag_wallet');
    if (existing) return existing;
    const newWallet = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    localStorage.setItem('shieldtag_wallet', newWallet);
    return newWallet;
  }
};

export const web3Service = {
  // Consumable
  mintToken: async (productId: string) => {
    console.log(`[Web3] Minting utility token for consumable product: ${productId}`);
    return `tx_token_${Math.random().toString(36).substr(2, 9)}`;
  },
  burnToken: async (productId: string) => {
    console.log(`[Web3] Burning token for product: ${productId}`);
    return `tx_burn_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Durable
  mintNFT: async (productId: string) => {
    console.log(`[Web3] Minting NFT for durable product: ${productId}`);
    return `tx_nft_${Math.random().toString(36).substr(2, 9)}`;
  },
  transferNFT: async (productId: string, to: string) => {
    console.log(`[Web3] Transferring NFT for product: ${productId} to ${to}`);
    return `tx_transfer_${Math.random().toString(36).substr(2, 9)}`;
  }
};
