// import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
// import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Tx } from "./components/Tx";
import { TxSend } from "./components/SendTx";
import { useLength, useContract } from "./wallet/hook";

export const Txlist = () => {
  const num = [];
  const [state, setState] = useState(0);
  const contract = useContract();
  let length = useLength();
  useEffect(() => {
    contract.on("wish", () => {
      setState(state + 1);
    });
    return contract.removeListener("wish");
  }, []);

  if (length) {
    for (let i = 0; i < length; i++) {
      num.push(i);
    }
  }
  return (
    <div className="txlist">
      <div>
        <div>
          <h1>Permanent Social</h1>
        </div>

        <TxSend />
        {length &&
          num.reverse().map((num) => <Tx txIndex={num.toString()} key={num} />)}
      </div>
    </div>
  );
};
