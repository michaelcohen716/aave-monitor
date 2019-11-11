import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { ASSETS } from "../../aave";
import { setAsset } from "../../redux/main/actions";

class DynamicChart extends React.Component {
  state = {
    rate: "variable",
    loaded: false
  };

  async componentWillMount() {
    this.buildChart();
  }

  buildChart() {
    const data = this.buildData(false);
    if (Object.keys(this.props.variableRates).length === ASSETS.length) {
      const initialState = {
        labels: ASSETS,
        datasets: [
          {
            label: "Variable Borrow Rates %",
            backgroundColor: "blue",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data
          }
        ]
      };

      this.setState({
        chartData: initialState,
        loaded: true
      });

      this.runInterval();
    } else {
      setTimeout(() => {
        this.buildChart();
      }, 500);
    }
  }

  buildData = fixed => {
    const { variableRates, fixedRates } = this.props;
    const retval = ASSETS.map(asset =>
      fixed ? fixedRates[asset] : variableRates[asset]
    );
    return retval;
  };

  runInterval() {
    setInterval(() => {
      const fixed = this.state.rate === "fixed" ? true : false;
      const data = this.buildData(fixed ? false : true);
      const newState = {
        labels: ASSETS,
        datasets: [
          {
            label: fixed ? "Variable Borrow Rates %" : "Fixed Borrow Rates %",
            backgroundColor: fixed ? "blue" : "black",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data
          }
        ]
      };
      const newRate = fixed ? "variable" : "fixed";
      this.setState({ chartData: newState, rate: newRate });
    }, 4000);
  }

  render() {
    if (!this.state.loaded) {
      return <div className="my-5">Loading...</div>;
    }

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 20
            }
          }
        ]
      }
    };
    return (
      <div className="p-2">
        <Bar data={this.state.chartData} options={options} />;
      </div>
    );
  }
}

function mapState({ main }) {
  return {
    fixedRates: main.fixedBorrowRate,
    variableRates: main.variableBorrowRate
  };
}

export default connect(
  mapState,
  { setAsset }
)(DynamicChart);
