import React, { memo, useState, useEffect } from "react";
import baseUrl from "../../../Components/baseUrl";

const styles = {
  pointer: { cursor: "pointer" },
};
const config = {
  "Access-Control-Allow-Origin": "*",
  Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
};

const CurrentAffairsCommponent = () => {
  const [currentAffairs, setCurrentAffairs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl()}/df/findCurrentAffairs`, { method: "GET", headers: config });
        const data = await response.json();
        if (data.status === 200) setCurrentAffairs(data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="col-md-6 col-12 px-3">
      <div className="bg-light border border-2 rounded-1 p-3">
        <span>
          <h4>
            Current Affairs <span className="badge bg-danger">Latest</span>
          </h4>
        </span>
        <hr />
        <div style={{ height: "18rem", overflowY: "scroll" }}>
          <div className="p-0">
            {currentAffairs.map((item, i) => (
              <p key={i} className="p-1">
                <article href={"/#" + i} className="main-color fw-bolder" style={styles.pointer} data-bs-toggle="modal" data-bs-target={`#currentAffairs${i}`}>
                  {item.dateRangeText}
                </article>
                {/* modal-body */}
                <div class="modal fade" id={`currentAffairs${i}`} tabindex="-1" aria-labelledby={`#currentAffairs${i}Label`} aria-hidden="true">
                  <div class="modal-dialog modal-lg modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id={`currentAffairs${i}Label`}>
                          Current Affairs from <span dangerouslySetInnerHTML={{ __html: item.dateRangeText }} />
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div className="d-flex text-center gap-2 justify-content-evenly" style={{ flexWrap: "wrap" }}>
                          {item.affairsBeans.map((content, index) => (
                            <div key={index} className="card border" style={{ width: "350px", minHeight: "350px" }}>
                              <br />
                              <small className="main-color fw-bolder">{content.currentAffairsHead}</small> <br />
                              {/* <small>{content.title}</small> <br /> */}
                              {/* <p className="text-dark">{content.currentAffairsContent}</p> */}
                              <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: content.currentAffairsContent }} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div class="modal-footer"></div>
                    </div>
                  </div>
                </div>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CurrentAffairsCommponent);
