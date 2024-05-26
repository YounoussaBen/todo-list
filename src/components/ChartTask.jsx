import { Component } from "react";
import Chart from "react-apexcharts";
import "../styles/ChartTask.css";

class ChartTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: ['week1', 'week2', 'week3', 'week4'],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50],
        },
      ],
      fill: {
        colors: ['#F47B20', '#005596']
      },
    };
  }

  render() {
    return (
      <div className="chartContainer">
        <h2 className="chartHeader">Chart</h2>

        <div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
          />
        </div>

        <div><p className="chartTitle">Weekly tasks</p></div>
      </div>
    );
  }
}

export default ChartTask;
