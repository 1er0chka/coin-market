import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import crosshair from "chartjs-plugin-crosshair";
import styles from "./Chart.module.scss";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";
import { useContext } from "react";
import { CoinInfoContext } from "@/app/provider/CoinInfoContext";

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  zoomPlugin,
  crosshair,
);

const Chart = () => {
  const { time, price } = useContext(CoinInfoContext);

  const data = {
    labels: time,
    datasets: [
      {
        lineTension: 0,
        data: price,
        fill: "start",
        backgroundColor: "rgba(240, 101, 67, 0.1)",
        borderColor: "rgba(59,39,21,0.6)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "xy" as const,
          speed: 100,
        },
        pan: {
          enabled: true,
          mode: "xy" as const,
          speed: 100,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        bodySpacing: 6,
        cornerRadius: 4,
        borderWidth: 0,
        displayColors: false,
      },
      crosshair: {
        line: {
          color: "rgba(59,39,21,0.6)",
          width: 1,
          dashPattern: [5, 5],
        },
      },
    },
  };

  return <Line className={styles.graph} data={data} options={options} />;
};

export default Chart;
