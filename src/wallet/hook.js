import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useProvider, useTestProvider } from "../useActiveWeb3";
const wish = require("../abi/wish.json");
const abi = require("../abi/erc20.json");

export function useBalance() {
  const [balanceOf, setbalance] = useState();

  const { account } = useWeb3React();
  const provider = useProvider();
  const rbhContract = new ethers.Contract(
    "0xd5779f2f9d7d239228e4e78bc78f50768661a081",
    abi,
    provider
  );
  useEffect(() => {
    fetchBalance();
    console.log(balanceOf);
  }, [account]);
  async function fetchBalance() {
    try {
      const balance = await rbhContract.balanceOf(account);
      setbalance(Number(ethers.utils.formatUnits(balance, 18)).toFixed(2));
      console.log(Number(ethers.utils.formatUnits(balance, 18)).toFixed(2));
    } catch (err) {
      return;
    }
  }

  return balanceOf;
}

export const useTx = (txindex) => {
  const [Tx, setTx] = useState();
  const provider = useTestProvider();
  const contract = new ethers.Contract(
    "0x8E3140Ce0e2Aaa6e772C6204180394e23f762221",
    wish,
    provider
  );

  useEffect(() => {
    getTransaction();
    console.log("tx fetch");
  }, []);

  const getTransaction = async () => {
    const wwish = await contract.getWish(txindex);
    setTx(wwish);
    // console.log(JSON.stringify(wwish));
  };

  return Tx;
};

export const useLength = () => {
  const [length, setLength] = useState();
  const provider = useTestProvider();
  const contract = new ethers.Contract(
    "0x8E3140Ce0e2Aaa6e772C6204180394e23f762221",
    wish,
    provider
  );

  useEffect(() => {
    getLength();
  }, []);

  const getLength = async () => {
    const llength = await contract.getCount();
    setLength(llength);
  };

  return length;
};

export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
}

export function useContract() {
  const provider = useTestProvider();
  const contract = new ethers.Contract(
    "0x8E3140Ce0e2Aaa6e772C6204180394e23f762221",
    wish,
    provider
  );
  return contract;
}
