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
          <p>⏰ Profit {data.profit}</p>
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
      <div style={{ overflow: "auto" }}>
        {data.map((data, i) => (
          <MenuItem key={i} data={data} />
        ))}
      </div>
    </div>
  );
};
