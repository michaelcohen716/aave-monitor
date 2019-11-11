import React, { useState, useEffect } from "react";
import PanelContainer from "../common/PanelContainer";
import DynamicChart from "./DynamicChart";
import AssetAnalysis from "./AssetAnalysis";
import UserAnalysis from "./UserAnalysis";
import Summary from "./Summary";
import Transactions from "./Transactions"
import { connect } from "react-redux";
import { ASSETS } from "../../aave";
import { setAsset, getSummaryStats } from "../../redux/main/actions";

const VIEWS = ["Rates", "Protocol Summary", "Asset Analysis", "User Analysis", "Transactions"];

function RightPanel({ setAsset, getSummaryStats }) {
  const [view, setView] = useState(VIEWS[0]);

  useEffect(() => {
    ASSETS.forEach(async asset => {
      await setAsset(asset);
    });

    (async() => {
      await getSummaryStats()
    })()
  }, []);

  const getView = () => {
    switch (view) {
      case VIEWS[0]: {
        return <DynamicChart />;
      }
      case VIEWS[1]: {
        return <Summary />
      }
      case VIEWS[2]: {
        return <AssetAnalysis />;
      }
      case VIEWS[3]: {
        return <UserAnalysis />
      }
      case VIEWS[4]: {
        return <Transactions />;
      }
    }
  };

  return (
    <div className="col-lg-9">
      <div className="mx-3 mt-5 d-flex flex-column">
        <PanelContainer
          headline="aMonitor"
          views={VIEWS}
          setView={setView}
          activeView={view}
        >
          {getView()}
        </PanelContainer>
      </div>
    </div>
  );
}

export default connect(
  null,
  { setAsset, getSummaryStats }
)(RightPanel);
