import { useTx } from "../wallet/hook";
import spin from "../img/tail-spin.svg";

export const Tx = ({ txIndex }) => {
  const transaction = useTx(txIndex);

  return (
    <div className="txtest">
      {transaction ? (
        <div className="tx">
          <div>
            <div className="senderWrap">{`${transaction[0].substring(
              0,
              6
            )}...${transaction[0].substring(transaction[0].length - 4)}`}</div>
          </div>
          <p>{transaction[1]}</p>
        </div>
      ) : (
        <div className="loadingWrap">
          <img src={spin} alt="loading" />
        </div>
      )}
    </div>
  );
};
