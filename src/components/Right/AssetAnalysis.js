import React from "react";
import { connect } from "react-redux";
import InfoUnit from "./InfoUnit";
import "./Right.css";

const exclude = [
    "liquidityIndex",
    "variableBorrowIndex",
    "lastUpdateTimestamp",
    "aTokenAddress"
]

function AssetAnalysis({ assetInfo, activeAsset }) {
  if (assetInfo) {
    return (
      <div className="d-flex flex-wrap pb-3">
        {Object.keys(assetInfo).map((info, i) => {
          if (!exclude.includes(info)) {
            return (
              <InfoUnit
                asset={activeAsset}
                key={i}
                title={info}
                value={assetInfo[info]}
              />
            );
          }
        })}
      </div>
    );
  } else {
    return <div>Loadng...</div>;
  }
}

function mapState({ main }) {
  return {
    activeAsset: main.activeAsset,
    assetInfo: main[main.activeAsset]
  };
}

export default connect(mapState)(AssetAnalysis);
