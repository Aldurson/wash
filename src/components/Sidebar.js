import { useContext } from "react";
import { DataContext } from "../App";
import React from "react";
import { calcLosses, calcWins, callSummary, formatCurr } from "./config";

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
          <p>Profit R {data.profit * 18}</p>
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
        <p>Profit {formatCurr(callSummary(data))}</p>
      </div>
      <div className="list_item">
        {" "}
        <p>Wins of orders: {formatCurr(calcWins(data))}</p>
        <p>Losses of orders: {formatCurr(calcLosses(data))}</p>
      </div>
      <div className="list_item">
        <p>Num of wins: {data.filter((dat) => dat.profit > 0).length}</p>
        <p>Num of losses: {data.filter((dat) => dat.profit < 0).length}</p>
      </div>
      <div style={{ overflow: "auto" }}>
        {data.map((data, i) => (
          <MenuItem key={i} data={data} />
        ))}
      </div>
    </div>
  );
};
