import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DataContext } from "../App";
import { useContext } from "react";
import { FormatDealArray } from "./config";

ChartJS.register(ArcElement, Tooltip, Legend);

export function CustomDough() {
  const { data } = useContext(DataContext);
  const dataArr = [
    FormatDealArray.getGBPUSDValun(data),
    FormatDealArray.getUSDCADValun(data),
    FormatDealArray.getUSDJPYValun(data),
    FormatDealArray.getEURUSDValun(data),
    FormatDealArray.getNZDUSDValun(data),
    FormatDealArray.getUSDCHFValun(data),
  ];
  const data1 = {
    labels: FormatDealArray.SYMBOLS,
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
