import { useState } from "react";
import { ethers } from "ethers";
import { useTestProvider } from "../useActiveWeb3";
const wish = require("../abi/wish.json");
import { useWeb3React } from "@web3-react/core";
import spin from "../img/tail-spin.svg";

export const TxSend = () => {
  const [text, setText] = useState("");
  const [pendingCon, setPendingCon] = useState(false);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const { library, account, active, error } = useWeb3React();
  const provider = useTestProvider();

  const buttonContent = active ? "Send" : "Please Connect";

  const handleSendButton = async () => {
    console.log("send");
    setPendingCon(true);
    const { hash } = await send();
    setPendingCon(false);
    setText("");
    // setTxState("Transaction submitted");
    provider.once(hash, () => {
      //   setshowModal(false);
      //   setisPending(false);
    });
    // console.log(hash);
  };
  const send = async () => {
    try {
      const contract = new ethers.Contract(
        "0x8E3140Ce0e2Aaa6e772C6204180394e23f762221",
        wish,
        library.getSigner(account)
      );
      const tx = await contract.submitWish(text);
      return tx;
    } catch (e) {
      if (
        e.message == "MetaMask Tx Signature: User denied transaction signature."
      ) {
        setPendingCon(false);
      }
    }
  };
  return (
    <div className="sendwrap">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="sendInput"
        placeholder="Type you message here"
      />
      <button
        className="sendButton"
        onClick={handleSendButton}
        disabled={!active | error}
      >
        {pendingCon ? <img src={spin} alt="loading" /> : buttonContent}
      </button>
      <br></br>
    </div>
  );
};
