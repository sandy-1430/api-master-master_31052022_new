/* eslint-disable */
import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import useRemoveModal from "../../Components/useRemoveModal";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import "./ViewTest.css";
import { TiTickOutline } from "react-icons/ti";

const ViewTest = (props) => {
  const location = useLocation();
  const { courseId, topicId, name } = location.state;
  console.log("CourseId", courseId, topicId);
  const [profileData, setProfileData] = useState([]);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "visible";
    axios
      .post(
        baseUrl() + "/profileData",
        {
          email: Cookies.get("email"),
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setProfileData(response.data.Data);
        }
      });
  }, []);
  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/getAllActiveQuizByCourseAndTopic",
        {
          courseId: courseId,
          topicId: topicId,
          quizType: name === "Test" ? 1 : 2,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTestData(response.data.Data);
          console.log("testData", testData);
        }
      });
  }, []);
  useRemoveModal();
  return (
    <>
      <Header profileData={profileData} />
      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        <h2 className="text-left">
          {name === "Test" ? "Mock Test" : "Practice Test"}
        </h2>
        <div className="row d-flex">
          <div className="col-md-4">
            <div
              className="mt-5 p-2 faq-row "
              style={{
                position: "relative",
                overflow: "hidden",
                // width: "60rem",
                backgroundColor: "#F9F9F9",
                height: "10rem",
              }}
            ></div>
          </div>
          <div className="col-md-8">
            {testData.length !== 0 ? (
              testData.map((item, i) => (
                <div key={i}>
                  <div>
                    <div
                      className="mt-5 p-2 faq-row col-md-14"
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        // width: "60rem",
                        backgroundColor: "#F9F9F9",
                        height: "10rem",
                      }}
                    >
                      {/* DONE: PRIMIUM MEMBER ALLOW */}
                      <div
                        className="overlay"
                        style={
                          profileData.premium === "N" && item.premium === 1
                            ? { display: "flex" }
                            : { display: "none" }
                        }
                      >
                        <h1>
                          <AiFillLock style={{ marginRight: 10 }} />
                          Subscribe Now
                        </h1>
                        <p>Get instant access to premium questions</p>
                        <Link
                          type="button"
                          to="/subscription"
                          className="btn main-btn"
                          style={{
                            backgroundColor: "#7b1fa2",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <AiFillUnlock size={26} style={{ marginRight: 10 }} />{" "}
                          Unlock the premium
                        </Link>
                      </div>

                      <div className="row pt-3 d-flex">
                        <div className="col-md-10">
                          <div className="col">
                            <h2 className="text-center view-test-text-align">
                              {item.title}
                            </h2>
                            <h5>{item.courseName}</h5>
                            <label>Time :</label>
                            <label>&nbsp; &nbsp;</label>
                            <label className="fw-bold">{item.maxTime}</label>
                            <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
                            <label>Questions :</label>
                            <label>&nbsp; &nbsp;</label>
                            <label className="fw-bold"> {item.maxNOQ}</label>
                            <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
                            <label>Marks :</label>
                            <label>&nbsp; &nbsp;</label>
                            <label className="fw-bold">
                              {item.passingScore}
                            </label>
                            <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
                            {item.attemptFlag === 1 && (
                              <label>Attempted :</label>
                            )}
                            {item.attemptFlag === 1 && (
                              <TiTickOutline size={28} color="green" />
                            )}
                          </div>
                        </div>
                        <div className="col-md-1 justify-content-center text-end my-auto">
                          {/* FIXME: PRIMIUM MEMBER ALLOW */}
                          {profileData.premium === "N" && item.premium === 1 ? (
                            <Link
                              type="button"
                              to="/subscription"
                              className="btn main-btn"
                              style={{
                                backgroundColor: "#6c5f71",
                                width: "120px",
                              }}
                            >
                              <AiFillLock
                                size={20}
                                style={{ marginRight: 10 }}
                              />{" "}
                              Pay
                            </Link>
                          ) : (
                            <Link
                              type="button"
                              to="/student-mcq"
                              state={{
                                quizId: item.quizId,
                                courseId: courseId,
                                topicId: topicId,
                                quizCode: item.quizCode,
                                negativeMarks: item.negativeMarks,
                                level: item.level,
                                name: name,
                              }}
                              className="btn main-btn"
                              style={{ width: "120px" }}
                            >
                              Start Test
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  color: "#7b1fa2",
                  margin: "154px",
                }}
              >
                No test available <br /> Please visit later{" "}
              </p>
            )}
          </div>
        </div>
      </div>
      <br />
      <footer
        className="footer mt-auto py-3 main-color-bg border-top fixed-footer"
        style={{ zIndex: 10 }}
      >
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
};

export default ViewTest;
