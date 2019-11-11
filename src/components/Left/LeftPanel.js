import React, { useEffect } from "react";
import PanelContainer from "../common/PanelContainer";
import { connect } from "react-redux";
import { setActiveAsset, getUserByReserve } from "../../redux/main/actions";
import { ASSETS, ASSET_MAPPING } from "../../aave";
import "./Left.css";

function Asset({
  asset,
  setActiveAsset,
  active,
  userAddress,
  getUserByReserve
}) {
  return (
    <div
      className={`p-2 m-2 ${
        active ? "active-asset" : "inactive-asset"
      } asset-item`}
      onClick={() => {
        setActiveAsset(asset);
        if (userAddress) {
          getUserByReserve(asset, userAddress);
        }
      }}
    >
      {asset}
    </div>
  );
}

function LeftPanel({
  setActiveAsset,
  activeAsset,
  getUserByReserve,
  userAddress
}) {
  return (
    <div className="col-lg-3">
      <div className="mx-3 mt-5 d-flex flex-column">
        <PanelContainer headline="aAssets">
          <div className="d-flex flex-wrap p-2">
            {ASSETS.map((asset, i) => {
              return (
                <Asset
                  active={asset === activeAsset}
                  asset={asset}
                  setActiveAsset={setActiveAsset}
                  getUserByReserve={getUserByReserve}
                  userAddress={userAddress}
                  key={i}
                />
              );
            })}
          </div>
        </PanelContainer>
        <div className="my-2" />
        <PanelContainer headline="Participate">
          <a
            href={`https://testnet.aave.com/borrow/${activeAsset}`}
            target="_blank"
            className="aave-button p-2 mx-auto my-3"
          >
            Borrow {activeAsset} on Aave
          </a>
          <a
            href={`https://kovan.etherscan.io/address/${ASSET_MAPPING[activeAsset]}`}
            target="_blank"
            className="aave-button p-2 mx-auto my-3"
          >
            See a{activeAsset} on Etherscan
          </a>
        </PanelContainer>
      </div>
    </div>
  );
}

function mapState({ main }) {
  return {
    activeAsset: main.activeAsset,
    userAddress: main.userAddress
  };
}

export default connect(
  mapState,
  { setActiveAsset, getUserByReserve }
)(LeftPanel);
