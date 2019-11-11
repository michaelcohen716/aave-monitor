import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  getUser,
  getUserByReserve,
  setUserAddress
} from "../../redux/main/actions";
import InfoUnit from "./InfoUnit";
import "./Right.css";

function UserAnalysis({
  getUser,
  userData,
  getUserByReserve,
  activeAsset,
  userReserveData,
  setUserAddress
}) {
  const [address, setAddress] = useState("");
  const [queried, toggleQueried] = useState(false);

  const queryAddress = async () => {
    setUserAddress(address);
    await getUser(address);
    await getUserReserve();
    toggleQueried(true);
  };

  const getUserReserve = async () => {
    await getUserByReserve(activeAsset, address);
  };

  const setExampleAddress = () => {
    setAddress("0xafdD26Aad47DAeC8edA9332d7203bee2c77C44f1");
  };

  return (
    <div className="d-flex flex-column mt-3">
      {queried ? (
        Object.keys(userData).length && Object.keys(userReserveData).length ? (
          <div className="d-flex flex-column">
            <h4 className="my-2">ETH</h4>
            <div className="d-flex flex-wrap pb-2">
              {Object.keys(userData).map((info, i) => {
                return <InfoUnit key={i} title={info} value={userData[info]} />;
              })}
            </div>
            <h4 className="my-2">{activeAsset} Token</h4>
            <div className="mt-2 d-flex flex-wrap pb-3">
              {Object.keys(userReserveData).map((info, i) => {
                return (
                  <InfoUnit
                    key={i}
                    title={info}
                    value={userReserveData[info]}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <Fragment>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="address-input mx-auto p-1 mt-3 mb-2"
            placeholder="User Address"
          />
          <div className="example-text" onClick={setExampleAddress}>
            Use example address
          </div>
          <div className="m-3 pb-2">
            <div className="aave-button p-2" onClick={queryAddress}>
              Search
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

function mapState({ main }) {
  return {
    userData: main.userData,
    activeAsset: main.activeAsset,
    userReserveData: main.userReserveData
  };
}

export default connect(
  mapState,
  { getUser, getUserByReserve, setUserAddress }
)(UserAnalysis);
