import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Carousel from "react-elastic-carousel";

// import { LeftArrow, RightArrow } from "../reactScrollComponents/ScrollButton";
// import Card from "../reactScrollComponents/ScrollCard";
import baseUrl from "../../../Components/baseUrl";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

const styles = {
  container: { paddingTop: "6.25rem", paddingBottom: "6.25rem" },
  video: { width: "100%", height: "100%" },
};

const Reviews = () => {
  const [studentSpeak, setStudentSpeak] = useState([]);

  useEffect(() => {
    const fetchStudentSpeak = async () => {
      try {
        const config = {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
        };

        const { data, status } = await axios.post(
          `${baseUrl()}/df/studentSpeak`,
          {},
          { headers: config }
        );
        if (status === 200) setStudentSpeak(data.Data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentSpeak();
  }, []);

  return (
    <section
      className="container-fluid bg-light"
      id="reviews"
      style={styles.container}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Reviews</h1>
          <a
            href="#view_all"
            data-bs-toggle="modal"
            data-bs-target="#ReviewsModal"
            className="text-uppercase main-color"
          >
            view all
          </a>
        </div>
        <div className="my-5">
          <Carousel
            breakPoints={breakPoints}
            style={{ height: "100%", position: "relative" }}
          >
            {studentSpeak.map((item, i) => (
              <div
                key={i}
                className="bg-white w-100 mx-3 border rounded overflow-hidden"
              >
                <div className="ratio ratio-16x9">
                  <iframe
                    src={item.videoUrl}
                    title={item?.name}
                    style={styles.video}
                    className="yb-player-icon"
                    frameborder="0"
                  ></iframe>
                </div>
                <div className="p-4 fw-bolder">
                  <div>{item?.name}</div>
                  <div>{item.textContent}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div
          class="modal fade"
          id="ReviewsModal"
          aria-labelledby="#ReviewsModal"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                {/* <h5 class="modal-title" id={`currentAffairs${i}Label`}> */}
                Review's Videos
                {/* </h5> */}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  className="d-flex text-center gap-2 justify-content-evenly"
                  style={{ flexWrap: "wrap" }}
                >
                  {studentSpeak.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white w-100 mx-3 border rounded overflow-hidden"
                    >
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={item.videoUrl}
                          title={item?.name}
                          style={styles.video}
                          className="yb-player-icon"
                          frameborder="0"
                        ></iframe>
                      </div>
                      <div className="p-4 fw-bolder">
                        <div>{item?.name}</div>
                        <div>{item.textContent}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer justify-content-center">
                <a
                  href="https://www.youtube.com/channel/UCOWq3a0_HYLFYj7ZqWAjSeA"
                  target="_blank"
                >
                  For More Videos Please Visit our youtube Channel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Reviews);
