const BOUNTY_CUP_CONFIG = {
  contractAddress: "7FxskNY3K5t3uoedZ99D47iDnn9Z1p33d736FaWxpump",
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
