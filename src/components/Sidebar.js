import { useContext } from "react";
import { DataContext } from "../App";
import React from "react";
import { FormatDealArray } from "./config";

export const Sidebar = () => {
  const { data } = useContext(DataContext);

  function MenuItem({ data }) {
    return (
      <div
        className={`menu_item workout--${
          data.profit > 0 ? "running" : "cycling"
        }`}
      >
        <div className="list_item">
          <p>Pair {data.symbol}</p>
          <p>Profit R {FormatDealArray.formatCurr(data.profit)}</p>
        </div>
        <div className="list_item">
          {" "}
          <p>Price {data.price}</p> <p>Volume {data.volume}</p>
        </div>
        <div>
          <p>📰 {data.brokerTime}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <h2 style={{ textAlign: "center" }}>Orders</h2>
      <div className="list_item">
        <p>Num of orders: {data.length}</p>{" "}
        <p>Profit {FormatDealArray.callSummary(data)}</p>
      </div>
      <div className="list_item">
        {" "}
        <p>Wins of orders: {FormatDealArray.calcWins(data)}</p>
        <p>Losses of orders: {FormatDealArray.calcLosses(data)}</p>
      </div>
      <div className="list_item">
        <p>Num of wins: {FormatDealArray.getPositivesArr(data).length}</p>
        <p>Num of losses: {FormatDealArray.getNegativesArr(data).length}</p>
      </div>
      <div style={{ overflow: "auto" }}>
        {data.map((data, i) => (
          <MenuItem key={i} data={data} />
        ))}
      </div>
    </div>
  );
};
