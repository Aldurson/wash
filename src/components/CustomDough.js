import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DataContext } from "../App";
import { useContext } from "react";
import {
  getUSDCAD,
  getEURUSD,
  getGBPUSD,
  getNZDUSD,
  getUSDCHF,
  getUSDJPY,
  SYMBOLS,
} from "./config";
ChartJS.register(ArcElement, Tooltip, Legend);

export function CustomDough() {
  const { data } = useContext(DataContext);
  const dataArr = [
    getGBPUSD(data),
    getUSDCAD(data),
    getUSDJPY(data),
    getEURUSD(data),
    getNZDUSD(data),
    getUSDCHF(data),
  ];
  const data1 = {
    labels: SYMBOLS,
    datasets: [
      {
        label: "# of Deals",
        data: dataArr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data1} />;
}
