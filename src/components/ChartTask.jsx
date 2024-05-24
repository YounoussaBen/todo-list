
import { Component } from "react";
import Chart from "react-apexcharts";
import "../styles/ChartTask.css"

class ChartTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [25, 26, 27, 28, 29, 30, 31, 1, 2, 3,4,5,6,7,8,9, 10, 11, 12, 13, 14, 15, 16,
            17, 18, 19, 20, 21, 22, 23, 24, 25
          ]
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    };
  }

  render() {
    return (
      <div className="centerChart">
        {/* <div className="app">
        <div className="row"> */}
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="700"
            />
          {/* </div>
        </div> */}
      </div>
      </div>
    );
  }
}

export default ChartTask;