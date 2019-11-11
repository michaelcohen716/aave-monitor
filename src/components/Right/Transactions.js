import React, { useState } from "react";
import { connect } from "react-redux";
import { ASSET_MAPPING } from "../../aave";
import goTo from "../../assets/go-to.png";

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

const REVERSE_MAPPING = swap(ASSET_MAPPING);

function Tx({ token, userAddress, amount, txHash, timestamp }) {
  const date = new Date(timestamp * 1000);
  const displayDate =
    date.toString() === "Invalid Date"
      ? "-"
      : date
          .toString()
          .split(" ")
          .slice(1, 3)
          .join(" ");

  return (
    <div className="d-flex p-2">
      <div className="tx-token my-auto font-weight-bold">{token}</div>
      <div className="mx-2 tx-address my-auto">
        {userAddress.slice(0, 8) + "..."}
      </div>
      <div className="mx-2 tx-token my-auto">
        {String(amount / 10 ** 18).slice(0, 4)}
      </div>
      <div className="mx-2 tx-token my-auto">{displayDate}</div>

      <a
        className="mx-2 tx-token px-2"
        href={`https://kovan.etherscan.io/tx/${txHash}`}
        target="_blank"
      >
        <img src={goTo} className="img-fluid go-to" />
      </a>
    </div>
  );
}

function Transactions({ transactions }) {
  const [activePage, setActivePage] = useState(0);

  const changePage = direction => {
    if (direction === "prev" && activePage > 0) {
      setActivePage(activePage - 1);
    }

    if (direction === "next") {
      setActivePage(activePage + 1);
    }
  };

  if (transactions && transactions.length) {
    return (
      <div className="d-flex flex-column mx-auto py-3">
        {transactions
          .slice(activePage * 10, activePage * 10 + 10)
          .map((tx, i) => {
            const retVal = tx.returnValues;
            return (
              <Tx
                token={
                  REVERSE_MAPPING[retVal["0"]] ||
                  REVERSE_MAPPING[retVal["0"].toLowerCase()]
                }
                userAddress={retVal["1"]}
                amount={retVal["2"]}
                txHash={tx.transactionHash}
                timestamp={retVal["4"]}
                key={i}
              />
            );
          })}
        <div className="d-flex flex-column">
          <div className="arrows d-flex justify-content-center mt-2">
            <div
              className="mr-2 arrow font-weight-bold"
              onClick={() => changePage("prev")}
            >
              Prev
            </div>
            <div
              className="ml-2 arrow font-weight-bold"
              onClick={() => changePage("next")}
            >
              Next
            </div>
          </div>
          <div className="mt-2">Page {activePage + 1}</div>
        </div>
      </div>
    );
  } else {
    return <div className="my-5">Loading...</div>;
  }
}

function mapState({ main }) {
  return {
    transactions: main.summaryData.allTxs
  };
}

export default connect(mapState)(Transactions);
