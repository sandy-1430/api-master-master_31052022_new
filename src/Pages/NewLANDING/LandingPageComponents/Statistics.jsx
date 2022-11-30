import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../Components/baseUrl";
// eslint-disable-next-line import/no-unresolved
import CountUp from "react-countup";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import teamwork from "../../../Assets/people.png";

import "./Register.css";

export default function Statistics() {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${baseUrl()}/df/statistics`,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        console.log("response", response.status);
        if (response.status === 200) {
          setStatistics([
            { number: response.data.Data.totalTeacher, title: "teacher" },
            { number: response.data.Data.totalStudent, title: "student" },
            { number: 500, title: "user" },
            { number: response.data.Data.totalCourses, title: "subjects" },
            { number: response.data.Data.totalMCQ, title: "mcq's" },
          ]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onRightClick = () => {
    console.log("right click");
    const Arr = [...statistics];
    const lastArrEle = Arr.pop();
    setStatistics([lastArrEle, ...Arr]);
  };

  const onLeftClick = () => {
    console.log("left click");
    const Arr = [...statistics];
    const firstArrEle = Arr.shift();
    setStatistics([...Arr, firstArrEle]);
  };

  return (
    <section
      className="container-fluid position-relative"
      id="statistics"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      {/* <p
        className="fs-4 text-center mx-auto"
        style={{ maxWidth: "60ch", display: "none" }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
        perferendis vitae minima fugit voluptatum sint, cum deserunt distinctio
        adipisci dolorum itaque recusandae sit.
      </p> */}
      <div className="text-center">
        <div className="bg-white">
          <img
            src={teamwork}
            alt={"alt"}
            width="100"
            className="position-absolute bg-white"
            style={{ transform: "translate(-50%,-50%)", zIndex: "1" }}
          />
        </div>
        <hr style={{ color: "#611482", height: "2px", margin: "100px 0" }} />
      </div>
      <div
        className="position-absolute w-100 d-flex justify-content-between px-5"
        style={{ top: "41%", left: "50%", transform: "translate(-50%,-50%)" }}
      >
        <button
          type="button"
          className="btn main-btn-outline bg-white rounded-circle"
          style={{ width: "50px", height: "50px" }}
          onClick={onRightClick}
        >
          <GoChevronLeft size={24} className="icon-next" />
        </button>
        <button
          type="button"
          className="btn main-btn-outline bg-white rounded-circle"
          style={{ width: "50px", height: "50px" }}
          onClick={onLeftClick}
        >
          <GoChevronRight size={24} className="icon-next" />
        </button>
      </div>
      <div className="container">
        <div className="d-flex justify-content-around align-items-baseline">
          {statistics.map((item, i) => (
            <div className="p-0 flex-shrink-1" key={i}>
              <div className="text-center">
                <h3 className="fw-light main-color fs-2">
                  <span
                    className={
                      i === 2 ? "fw-bolder fs-1"  : 'StaticsNumber'
                    }
                  >
                    {i === 2 ? (
                      <CountUp start={0} end={item.number} delay={1} />
                    ) : (
                      item?.number
                    )}

                    {/* {item.number} */}
                  </span>
                  <span
                    className={
                      item.title === `user` ? "fw-bolder fs-2" : "d-none"
                    }
                  ></span>
                </h3>
                <h5 className="fw-light fs-6 main-color text-uppercase">
                  <span
                    className={
                      i === 2
                        ? "fw-bolder fs-6"
                        : "statitics"
                    }
                  >
                    {item.title}
                  </span>
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
