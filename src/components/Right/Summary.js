import React from "react";
import InfoUnit from "./InfoUnit";
import { connect } from "react-redux";

function Summary({ summaryData }) {
  if (Object.keys(summaryData).length) {
    return (
      <div className="d-flex flex-wrap pb-3">
        {Object.keys(summaryData).map((info, i) => {
          console.log('info', info)
          return <InfoUnit key={i} title={info} value={summaryData[info]} />;
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

function mapState({ main }) {
  return {
    summaryData: main.summaryData
  };
}

export default connect(mapState)(Summary);
