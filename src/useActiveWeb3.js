// import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

export const useProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  );
  return provider;
};

export const useTestProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  );
  return provider;
};
