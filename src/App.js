import reactDom from "react-dom/client";
import "./css/styles.css";
import React, { useState, createContext, useEffect } from "react";
import { Map } from "./components/Map";

import { Sidebar } from "./components/Sidebar";

import { metaConnection } from "./components/config.js";
const root = reactDom.createRoot(document.getElementById("root"));

export const DataContext = createContext(null);

const App = () => {
  const [center, setCenter] = useState([]);
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const [account, setAccount] = useState("");
  const [connection, setConnection] = useState("");

  useEffect(
    function () {
      console.log("looking at data");
      const total = data.reduce((acc, val) => acc + val.profit, 0);
      console.log(total);
    },
    [data]
  );
  useEffect(function () {
    try {
      console.log("Not Connected");
      metaConnection(setAccount, setConnection);
    } catch (err) {
      console.log(err.message);
    }
    return () => {
      connection.close();
      account.undeploy();
    };
  }, []);
  function formatData(data) {}
  useEffect(
    function () {
      const timer = setInterval(() => {
        try {
          console.log("Connected");
          const data = connection
            .getDealsByTimeRange(
              new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
              new Date()
            )
            .then((data) => {
              const { deals } = data;
              const formDeals = deals.filter((data) => data.profit !== 0);
              console.log(formDeals);
              setData(formDeals);
            });
        } catch (err) {
          console.log(err.message);
        }
      }, 60000);
      return () => clearInterval(timer);
    },
    [account]
  );

  return (
    <>
      <div className="container">
        <React.StrictMode>
          <DataContext.Provider value={{ data }}>
            <Sidebar setCenter={setCenter} />
            <Map setActive={setActive} />
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                color: "red",
                zIndex: "9000",
                textAlign: "center",
                justifyItems: "center",
              }}
            >
              Click on Map
            </div>
          </DataContext.Provider>
        </React.StrictMode>
      </div>
    </>
  );
};

root.render(<App />);
