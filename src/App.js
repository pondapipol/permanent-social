import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "./connector";
import { useState } from "react";

import { Txlist } from "./Txlist";

function Account() {
  const { account } = useWeb3React();

  return (
    <div className="wrap">
      <div className="addressWrap">
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ""}
      </div>
    </div>
  );
}

export const App = () => {
  const context = useWeb3React();
  const { activate, deactivate, active, error } = context;

  const [loadingSim, setLoading] = useState(true);

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  return (
    <div className="main">
      <div className="seccond">
        {active && !isUnsupportedChainIdError ? (
          <div>
            <div>
              <Account />
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {isUnsupportedChainIdError && (
          // eslint-disable-next-line react/no-unescaped-entities
          <div className="error">Please connect to BSC Testnet</div>
        )}

        {!active && !error ? (
          <button
            className="connectButton"
            onClick={() => {
              activate(injected);
              localStorage.setItem("hasSignIn", 1);
              setTimeout(() => {
                setLoading(false);
                console.log(loadingSim);
              }, 10000);
            }}
          >
            Connect Wallet
          </button>
        ) : null}
        {active && (
          <button
            className="connectButton"
            onClick={() => {
              deactivate();
              localStorage.clear();
              setLoading(true);
            }}
          >
            Disconnect
          </button>
        )}
      </div>
      <Txlist />
    </div>
  );
};
