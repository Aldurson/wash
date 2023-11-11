import { useContext } from "react";
import { DataContext } from "../App";
import React from "react";

export const Sidebar = ({ setCenter }) => {
  const { data } = useContext(DataContext);

  function MenuItem({ data, setCenter }) {
    return (
      <div
        className={`menu_item workout--${
          data.profit > 0 ? "running" : "cycling"
        }`}
      >
        <div className="list_item">
          <p>Pair {data.symbol}</p>
          <p>Profit $ {data.profit}</p>
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
        <p>
          Profit $ {data.reduce((acc, val) => acc + val.profit, 0).toFixed(2)}
        </p>
      </div>
      <div className="list_item">
        {" "}
        <p>
          Wins of orders: ${" "}
          {data
            .filter((data) => data.profit > 0)
            .reduce((acc, val) => acc + val.profit, 0)
            .toFixed(2)}
        </p>
        <p>
          Losses of orders: ${" "}
          {data
            .filter((data) => data.profit < 0)
            .reduce((acc, val) => acc + val.profit, 0)
            .toFixed(2)}
        </p>
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
