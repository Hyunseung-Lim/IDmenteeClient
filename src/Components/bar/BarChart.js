import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export class BarChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  render() {
    const barData = {
      labels: ["Specificity", "Justification", "Action", "Timeliness", "Goal Relevance", "Level"],
      datasets: [
        {
          backgroundColor: ["#A4D8FF", "#A4D8FF", "#A4D8FF", "#2D54F2", "#2D54F2", "#2D54F2"],
          data: this.props.evalPoint,
          borderRadius: 3, // Example of setting borderRadius for bars
        }
      ]
    };

    const barOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        y: {
          display: false,  // Makes the y-axis invisible
          min: 0,          // Sets the minimum value of the y-axis to 0
          max: 7,          // Sets the maximum value of the y-axis to 7
        },
        x: {
          display: true,   // Ensures the x-axis is visible, adjust as needed
        }
      }
    }

    return (
      <Bar ref={this.chartRef} height={200} data={barData} options={barOptions} />
    );
  }
}