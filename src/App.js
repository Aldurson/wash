import reactDom from "react-dom/client";
import "./css/styles.css";
import React, { useState, createContext, useEffect } from "react";
import { Map } from "./components/Map";
import { CustomModal } from "./components/CustomModal";
import { Sidebar } from "./components/Sidebar";

import { metaConnection, compare } from "./components/config.js";
import { Button } from "react-bootstrap";
const root = reactDom.createRoot(document.getElementById("root"));
export const DataContext = createContext(null);

const App = () => {
  const [data, setData] = useState([]);
  const [account, setAccount] = useState("");
  const [connection, setConnection] = useState("");
  const [active, setActive] = useState(false);

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
              setData(formDeals.sort(compare));
            });
        } catch (err) {
          console.log(err.message);
        }
      }, 60000);
      return () => clearInterval(timer);
    },
    [account]
  );
  function butLive(e) {
    console.log("kgosi nyamah");
    setActive(true);
  }
  return (
    <>
      <div className="container">
        <React.StrictMode>
          <DataContext.Provider value={{ data }}>
            <Sidebar />
            <Map />
            <div
              onClick={butLive}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                color: "red",
                zIndex: "9000",
                textAlign: "center",
                justifyItems: "center",
                width: "12rem",
                height: "6rem",
                border: "1px solid red",
                borderRadius: "3px",
              }}
            ></div>
            <CustomModal active={active} setActive={setActive} />
          </DataContext.Provider>
        </React.StrictMode>
      </div>
    </>
  );
};

root.render(<App />);
