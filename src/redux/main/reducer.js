import {
  RECEIVE_ASSET,
  RECEIVE_SUMMARY_DATA,
  SET_ACTIVE_ASSET,
  RECEIVE_USER_DATA,
  RECEIVE_USER_RESERVE_DATA,
  SET_USER_ADDRESS
} from "./types";

const INITIAL_STATE = {
  activeAsset: "ETH",
  assetInfo: {},
  fixedBorrowRate: {},
  variableBorrowRate: {},
  summaryData: {},
  userData: {},
  userReserveData: {},
  userAddress: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_ASSET: {
      return {
        ...state,
        activeAsset: action.asset
      };
    }

    case SET_USER_ADDRESS: {
      return {
        ...state,
        userAddress: action.address
      };
    }

    case RECEIVE_ASSET: {
      const assetInfo = {};
      let fixedBorrowRateObj = Object.assign({}, state.fixedBorrowRate);
      let variableBorrowRateObj = Object.assign({}, state.variableBorrowRate);

      Object.keys(action.info).map(item => {
        if (isNaN(item)) {
          assetInfo[item] = action.info[item].toString();
        }

        if (item === "fixedBorrowRate") {
          fixedBorrowRateObj[action.asset] = String(
            Number(action.info[item].toString()) / 10 ** 25
          );
        }

        if (item === "variableBorrowRate") {
          variableBorrowRateObj[action.asset] = String(
            Number(action.info[item].toString()) / 10 ** 25
          );
        }
      });

      return {
        ...state,
        [action.asset]: assetInfo,
        fixedBorrowRate: fixedBorrowRateObj,
        variableBorrowRate: variableBorrowRateObj
      };
    }

    case RECEIVE_SUMMARY_DATA: {
      return {
        ...state,
        summaryData: action.data
      };
    }

    case RECEIVE_USER_DATA: {
      const userData = {};
      Object.keys(action.data).map(item => {
        if (isNaN(item)) {
          userData[item] = action.data[item].toString();
        }
      });

      return {
        ...state,
        userData
      };
    }

    case RECEIVE_USER_RESERVE_DATA: {
      const userReserveData = {};
      Object.keys(action.data).map(item => {
        if (isNaN(item)) {
          userReserveData[item] = action.data[item].toString();
        }
      });

      return {
        ...state,
        userReserveData
      };
    }

    default: {
      return state;
    }
  }
};
