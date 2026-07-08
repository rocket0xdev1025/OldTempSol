const BOUNTY_CUP_CONFIG = {
  contractAddress: "TBA",
  solMint: "So11111111111111111111111111111111111111112",
};

function getPumpSwapUrl() {
  const { contractAddress, solMint } = BOUNTY_CUP_CONFIG;
  return `https://swap.pump.fun/?input=${solMint}&output=${contractAddress}`;
}

function getDexScreenerUrl() {
  const { contractAddress } = BOUNTY_CUP_CONFIG;
  return `https://dexscreener.com/solana/${contractAddress}`;
}

function getDexScreenerEmbedUrl() {
  const { contractAddress } = BOUNTY_CUP_CONFIG;
  return `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`;
}
