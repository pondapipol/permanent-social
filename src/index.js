import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { App } from "./App";
import { Web3manager } from "./Web3manager";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Main = () => {
  return (
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3manager>
          <App />
        </Web3manager>
      </Web3ReactProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
