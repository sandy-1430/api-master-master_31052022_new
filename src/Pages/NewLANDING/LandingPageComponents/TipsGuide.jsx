import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import baseUrl from "../../../Components/baseUrl";

const styles = {
  container: { paddingTop: "6.25rem", paddingBottom: "6.25rem" },
  video: { width: "100%", height: "100%" },
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

const items = [1, 2, 3, 4, 5, 6];

const TipsGuide = () => {
  const [studentSpeak, setStudentSpeak] = useState([]);

  useEffect(() => {
    const fetchStudentSpeak = async () => {
      try {
        const config = {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
        };

        const { data, status } = await axios.post(`${baseUrl()}/df/studentSpeak`, {}, { headers: config });
        if (status === 200) setStudentSpeak(data.Data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentSpeak();
  }, []);

  return (
    <div className="container-fluid bg-light" style={styles.container}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Tips & Guide</h1>
          <a href="#" className="text-uppercase main-color">
            view all
          </a>
        </div>

        <div className="my-5">
          <Carousel breakPoints={breakPoints} style={{ height: "100%", position: "relative" }}>
            {studentSpeak.map((item, i) => (
              <div key={i} className="bg-white w-100 mx-3 border rounded overflow-hidden">
                <div className="ratio ratio-16x9">
                  <iframe src={item.videoUrl} style={styles.video} frameborder="0"></iframe>
                </div>
                <div className="p-4 fw-bolder">
                  <div>{item?.name}</div>
                  <div>{item.textContent}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TipsGuide;
