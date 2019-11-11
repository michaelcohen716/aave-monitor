import React from "react";
import NumberFormat from "react-number-format";

const textMapping = {
  totalLiquidity: "Total Liquidity",
  availableLiquidity: "Available Liquidity",
  totalBorrowsFixed: "Total Borrows - Fixed",
  totalBorrowsVariable: "Total Borrows - Variable",
  liquidityRate: "Liquidity Rate",
  variableBorrowRate: "Variable Borrow Rate",
  fixedBorrowRate: "Fixed Borrow Rate",
  averageFixedBorrowRate: "Avg. Fixed Borrow Rate",
  utilizationRate: "Utilization Rate",
  borrows: "Borrows",
  deposits: "Deposits",
  redeems: "Redeems",
  repays: "Repays",
  swaps: "Swaps",
  totalTxs: "Total Transactions",
  uniques: "Unique Addresses",
  flashes: "Flash Loans",
  availableBorrowsETH: "Available Borrows - ETH",
  totalBorrowsETH: "Total Borrows - ETH",
  totalCollateralETH: "Total Collateral - ETH",
  totalLiquidityETH: "Total Liquidity ETH",
  ltv: "Loan to Value",
  healthFactor: "Health Factor",
  currentLiquidationThreshold: "Current Liquidation Threshold",
  borrowRate: "Borrow Rate",
  currentATokenBalance: "Current aToken Balance",
  currentBorrowBalance: "Current Borrow Balance",
  originationFee: "Origination Fee",
  principalBorrowBalance: "Principal Borrow Balance"
};

function InfoUnit({ title, value, asset }) {
  const formatVal = () => {
    switch (title) {
      case "totalLiquidity":
      case "totalBorrowsFixed":
      case "totalBorrowsVariable":
      case "availableBorrowsETH":
      case "totalBorrowsETH":
      case "totalCollateralETH":
      case "totalLiquidityETH":
      case "currentBorrowBalance":
      case "principalBorrowBalance":
    case "currentATokenBalance":
      case "availableLiquidity": {
        const val = (value / 10 ** 18).toFixed(0);
        return (
          <NumberFormat
            value={val}
            displayType={"text"}
            thousandSeparator={true}
          />
        );
      }
      case "originationFee": {
        return String(Math.round(value) / 10 ** 18).slice(0, 6);
      }

      case "healthFactor": {
        return String(value / 10 ** 18).slice(0, 3) + "x";
      }

      case "variableBorrowRate":
      case "liquidityRate":
      case "fixedBorrowRate":
      case "averageFixedBorrowRate":
      case "borrowRate":
      case "utilizationRate": {
        return String(Math.round(value) / 10 ** 25).slice(0, 4) + " %";
      }

      case "ltv": {
        return String(value) + "%";
      }

      case "currentLiquidationThreshold": {
        return value;
      }

      case "borrows":
      case "deposits":
      case "redeems":
      case "repays":
      case "swaps":
      case "totalTxs":
      case "flashes":
      case "uniques": {
        return value;
      }

      default: {
        return null;
      }
    }
  };

  const inWei = [
    "totalLiquidity",
    "availableLiquidity",
    "totalBorrowsFixed",
    "totalBorrowsVariable",
    "availableBorrowsETH",
    "totalBorrowsETH",
    "totalCollateralETH",
    "totalLiquidityETH"
  ];

  const exclude = [
    "borrowRateMode",
    "currentUnderlyingBalance",
    "lastUpdateTimestamp",
    "liquidityRate",
    "usageAsCollateralEnabled",
    "variableBorrowIndex",
    "allTxs"
  ];

  if (exclude.includes(title)) return null;

  const suffix = inWei.includes(title) ? asset : "";
  return (
    <div className="d-flex flex-column p-2 info-unit">
      <div className="my-2">{textMapping[title]}</div>
      <div className="font-weight-bold">
        {formatVal()} {suffix}
      </div>
    </div>
  );
}

export default InfoUnit;
