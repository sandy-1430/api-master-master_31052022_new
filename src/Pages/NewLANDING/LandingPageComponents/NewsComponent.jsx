import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import baseUrl from "../../../Components/baseUrl";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    axios.get(baseUrl() + "/df/findNewsEventDtls/1").then((response) => {
      if (response.status === 200) {
        setNewsData(response.data.result);
      }
    });
  }, []);
  return (
    <div className="col-md-6 col-12 px-3" id="news">
      <div className="bg-light border border-2 rounded-1 p-3">
        <span>
          <h4>
            News <span className="badge bg-danger">Latest</span>
          </h4>
        </span>
        <hr />
        <div style={{ height: "18rem", overflowY: "scroll" }}>
          <p className="p-1 fs-6">
            {"Assam Higher Secondary Education Council (AHSEC) declared Higher Secondary/12th Class Result."}{" "}
            <a href="https://resultsassam.nic.in/ahsecroll.aspx" className="main-color" target="_blank" rel="noreferrer">
              Check here
            </a>
          </p>
          <div className="p-0">
            {newsData.map((item) => (
              <p className="p-0" dangerouslySetInnerHTML={{ __html: item.description }}></p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NewsComponent);
