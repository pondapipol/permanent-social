import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "./hooks";
import { injected } from "./connector";

export const Web3manager = ({ children }) => {
  const context = useWeb3React();
  const {
    connector,
    // library,
    // chainId,
    // account,
    activate,
    // deactivate,
    active,
    error,
  } = context;

  const triedEager = useEagerConnect();
  // const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    // if (activatingConnector && activatingConnector === connector) {
    //   setActivatingConnector(undefined);
    // }
    if (triedEager && !active && error) {
      activate(injected);
    }
  }, [triedEager, connector, active, error, activate]);

  useInactiveListener(!triedEager);
  return children;
};
