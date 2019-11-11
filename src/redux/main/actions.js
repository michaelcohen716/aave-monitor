import {
  SET_ASSET,
  RECEIVE_ASSET,
  SET_ACTIVE_ASSET,
  RECEIVE_SUMMARY_DATA,
  RECEIVE_USER_DATA,
  RECEIVE_USER_RESERVE_DATA,
  SET_USER_ADDRESS
} from "./types";
import {
  getReserves,
  getSummaryData,
  getUserData,
  getUserReserveData,
  ASSET_MAPPING
} from "../../aave";

export const setAsset = asset => dispatch => {
  dispatch({ type: SET_ASSET, asset });
  return getReserves(asset).then(info => dispatch(receiveAsset(asset, info)));
};

const receiveAsset = (asset, info) => {
  return {
    type: RECEIVE_ASSET,
    asset,
    info
  };
};

export const setActiveAsset = asset => {
  return {
    type: SET_ACTIVE_ASSET,
    asset
  };
};

export const getSummaryStats = asset => dispatch => {
  return getSummaryData().then(data => dispatch(receiveSummaryData(data)));
};

const receiveSummaryData = data => {
  return {
    type: RECEIVE_SUMMARY_DATA,
    data
  };
};

export const getUser = address => dispatch => {
  return getUserData(address).then(data => dispatch(receiveUserData(data)));
};

const receiveUserData = data => {
  return {
    type: RECEIVE_USER_DATA,
    data
  };
};

export const getUserByReserve = (reserveAsset, user) => dispatch => {
  return getUserReserveData(ASSET_MAPPING[reserveAsset], user).then(data =>
    dispatch(receiveUserReserveData(data))
  );
};

const receiveUserReserveData = data => {
  return {
    type: RECEIVE_USER_RESERVE_DATA,
    data
  };
};

export const setUserAddress = address => {
  return {
    type: SET_USER_ADDRESS,
    address
  };
};
