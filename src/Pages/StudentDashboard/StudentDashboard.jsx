/* eslint-disable */
import { useEffect, React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import baseUrl from "../../Components/baseUrl";
import $ from "jquery";
import useRemoveModal from "../../Components/useRemoveModal";

function StudentDashboard() {
  const [counter, setCounter] = useState(60);
  const [profileData, setProfileData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [data, setData] = useState([]);
  const [tip, setTip] = useState("");
  const [reload, setReload] = useState(false);
  const [examPattern, setExamPattern] = useState([]);
  const [news, setNews] = useState([]);
  const [courseName, setCourseName] = useState("");

  const navigate = useNavigate();

  useRemoveModal();
  useEffect(() => {
    // window.location.reload();
    document.body.style.overflow = "visible";
  }, []);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 500);
    } else if (counter === 0) {
      setCounter(60);
    }
  }, [counter]);
  useEffect(() => {
    fetch(`${baseUrl()}/df/findTipOfTheDay`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTip(data.result.title);
      });
  }, []);

  const [notChoices, setNotChoices] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    axios
      .post(
        baseUrl() + `/profileData`,
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
        // FIXME: RESPONSE IS NULL --> Catch
        console.log("DATA", response);
        if (response.status === 200) {
          setPageLoaded(true);
          setProfileData(response.data.Data);
          setCourseDetails(response.data.Data.courseBeans);
          if (response.data.Data.courseBeans[0]?.topicBeans.length) {
            setNotChoices(true);
          }
        }
      })
      .catch((e) => {
        navigate("/");
        console.log(e);
      });
  }, []);

  const [recClasses, setRecClasses] = useState([]);
  useEffect(() => {
    axios
      .post(
        baseUrl() + "/getLiveRecClasses",
        {
          courseId: "1",
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
        console.log(response.data.Data);
        setRecClasses(response.data.Data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReload(!reload);
    }, 2000);
    return () => clearInterval(interval);
  }, [reload]);

  function onExamPattern(id) {
    fetch(`${baseUrl()}/df/examPattern/${id}`, {
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExamPattern(data.Data);
      });
  }

  function onMeet(meetingId) {
    axios
      .post(
        `${baseUrl()}/fetchVideoClassUrl`,
        { meetingid: meetingId },
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
          const meetingLink = response.data.Data[0].meetingUrl;
          window.open(meetingLink);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (!Cookies.get("token")) {
      // window.location.reload();
      // navigate("/");
    }
    axios
      .post(
        baseUrl() + "/df/fetchVideoClassesDtls",
        {
          username: Cookies.get("email"),
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
        console.log("video", response.data.Data);
        if (response.status === 200) {
          setVideoData(response.data.Data);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${baseUrl()}/df/findNewsEventDtls/3`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(data.result);
      });
  }, []);

  const TestTaken = () => {
    axios
      .post(
        baseUrl() + "/getAllSubmittedQuizByUserId",
        {
          userId: Cookies.get("userId"),
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
          setTestData(response.data.Data);
          console.log("test", response.data.Data);
        }
      });
  };

  const onDownload = () => {
    axios
      .post(
        baseUrl() + "/df/downloadCourseMaterial",
        {
          courseId: "1",
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
        }
      });
  };

  const downloadFile = (data) => {
    axios.get(baseUrl() + `/df/downloadFile/${data}`);
  };

  function datetimeTomillisec(datee = "", time = "") {
    const date = new Date(`${datee} ${time}`);
    const milli = date.getTime();
    return milli;
  }

  function currentDate(dates = new Date()) {
    var today = new Date(dates);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "-" + dd + "-" + yyyy;
    return today;
  }

  function formatDate(dateObj) {
    let date = dateObj;
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return month + "/" + day + "/" + year;
  }

  function convertDateMMToMMM(dateObj) {
    let date = dateObj;
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return day + "-" + month + "-" + year;
  }

  function timeConversion(timestamp) {
    const timeString12hr = new Date(
      "1970-01-01T" + timestamp + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return timeString12hr;
  }
  function minTomilli(mins) {
    const min = parseFloat(mins) * 60;
    return min * 1000;
  }

  const initializeMinsLeftToClass = (minsLeftToClass) => {
    var minLeft = Math.floor(minsLeftToClass / 60);
    var secLeft = minsLeftToClass % 60;

    minLeft = minLeft < 10 ? "0" + minLeft : minLeft;
    secLeft = secLeft < 10 ? "0" + secLeft : secLeft;
    minsLeftToClass -= 1;

    document.getElementById("clsTimeLeft").innerHTML = minLeft + ":" + secLeft;
    if (minsLeftToClass >= 0) {
      setTimeout(function () {
        initializeMinsLeftToClass(minsLeftToClass);
      }, 1000);
      return;
    }
  };

  return profileData && videoData ? (
    <>
      <Header profileData={profileData} news={news}/>
      
     

      <div className="container border  rounded">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-5 col-sm-12 p-3 border-end text-center">
            <h3 className="fw-bold">
              <span>{profileData && profileData.firstName}</span>
              <br />
              <span style={{ fontSize: "15px" }}>
                {profileData && profileData.lastName}
              </span>
            </h3>
            <h5>{profileData ? profileData.qualification : ""}</h5>
            <p>
              Profile{" "}
              {profileData?.profile?.split(".")[0] > 100
                ? 100
                : profileData?.profile?.split(".")[0]}
              % completed
            </p>

            {!notChoices && pageLoaded && (
              <marquee style={{ fontWeight: "500", color: "#7b1fa2" }}>
                {" "}
                Please select your subject(s) in 'Update Profile' if not
                selected.{" "}
              </marquee>
            )}
            <br />

            <Link className="btn main-btn" to="/studentprofile">
              Update Profile
            </Link>
          </div>

          <div
            className="col-md-7 col-sm-12 px-3"
            style={{ height: "300px", overflow: "auto" }}
          >
            <div className="text-center my-auto">
              <h5>Upcoming Online Classes</h5>
              <hr />
            </div>
            <br />
            {videoData.map((item) => (
              <div className="row">
                <div className="col-md-8 col-sm-9">
                  <h5 className="fw-bold" style={{ fontSize: "medium" }}>
                    {convertDateMMToMMM(new Date(item.meetingDate))}
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        margin: "0 8px",
                      }}
                    >
                      at {timeConversion(item.meetingTime)}
                    </span>
                  </h5>

                  <h5
                    style={{ fontSize: "15px" }}
                    dangerouslySetInnerHTML={{ __html: item.meetingDesc }}
                  ></h5>
                  {/* <p>Ram Sir (IIT Delhi)</p> */}
                </div>
                <div className="col-md-3 col-sm-3 my-auto mx-auto p-2">
                  {new Date(item.meetingDate + " 00:00:00").getTime() <
                    new Date(
                      formatDate(new Date()) + " 00:00:00"
                    ).getTime() && (
                    <>
                      <a
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#e3c9ef",
                          pointerEvents: "none",
                          width: "100px",
                        }}
                        target="_blank"
                        className="btn main-btn equal_width"
                        href="#"
                        title="Expired"
                      >
                        <i
                          class="fas fa-users"
                          style={{ fontSize: "12px" }}
                        ></i>
                        &nbsp; Expired
                      </a>
                    </>
                  )}

                  {new Date(item.meetingDate + " 00:00:00").getTime() >
                    new Date(
                      formatDate(new Date()) + " 00:00:00"
                    ).getTime() && (
                    <>
                      <a
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#e3c9ef",
                          pointerEvents: "none",
                          width: "100px",
                        }}
                        target="_blank"
                        className="btn main-btn equal_width"
                        href="#"
                        title="The class has not yet started."
                      >
                        <i
                          class="fas fa-users"
                          style={{ fontSize: "12px" }}
                        ></i>
                        &nbsp; Scheduled
                      </a>
                    </>
                  )}

                  {new Date(item.meetingDate + " 00:00:00").getTime() ==
                    new Date(formatDate(new Date()) + " 00:00:00").getTime() &&
                    Math.round(
                      (new Date(
                        item.meetingDate + " " + item.meetingTime
                      ).getTime() -
                        new Date().getTime()) /
                        60000
                    ) > 0 &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) > item.preMeetingBtnLblChangeMins && (
                      <>
                        <a
                          style={{
                            fontSize: "12px",
                            backgroundColor: "#e3c9ef",
                            width: "100px",
                          }}
                          // target="_blank"
                          className="btn main-btn equal_width button_blink"
                          // href={item.meetingUrl}
                          onClick={() => onMeet(item.meetingid)}
                          title="The Meeting has not yet started."
                        >
                          <i
                            class="fas fa-users"
                            style={{ fontSize: "12px" }}
                          ></i>
                          &nbsp; Scheduled
                        </a>
                      </>
                    )}

                  {new Date(item.meetingDate + " 00:00:00").getTime() ==
                    new Date(formatDate(new Date()) + " 00:00:00").getTime() &&
                    Math.round(
                      (new Date(
                        item.meetingDate + " " + item.meetingTime
                      ).getTime() -
                        new Date().getTime()) /
                        60000
                    ) > 0 &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) <= item.preMeetingBtnLblChangeMins &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) >= 5 && (
                      <>
                        <a
                          style={{
                            fontSize: "12px",
                            width: "100px",
                            backgroundColor: "rgb(174 61 221)",
                          }}
                          // target="_blank"
                          className="btn main-btn equal_width button_blink"
                          // href={item.meetingUrl}
                          onClick={() => onMeet(item?.meetingid)}
                          title="The class is yet to start."
                        >
                          <i
                            class="fas fa-users"
                            style={{ fontSize: "12px" }}
                          ></i>
                          <span id="clsTimeLeft"></span> Starting In{" "}
                          {console.log(
                            "dt",
                            (new Date(
                              item.meetingDate + " " + item.meetingTime
                            ).getTime() -
                              new Date().getTime()) /
                              60000
                          )}
                          {Math.abs(
                            Math.round(
                              (new Date(
                                item.meetingDate + " " + item.meetingTime
                              ).getTime() -
                                new Date().getTime()) /
                                60000
                            )
                          )}
                          {":"}
                          {counter}
                        </a>
                      </>
                    )}
                  {/* Join */}
                  {new Date(item.meetingDate + " 00:00:00").getTime() ==
                    new Date(formatDate(new Date()) + " 00:00:00").getTime() &&
                    Math.round(
                      (new Date(
                        item.meetingDate + " " + item.meetingTime
                      ).getTime() -
                        new Date().getTime()) /
                        60000
                    ) > 0 &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) < 5 && (
                      <>
                        <a
                          style={{ fontSize: "12px", width: "100px" }}
                          // target="_blank"
                          className="btn main-btn equal_width"
                          // href={item.meetingUrl}
                          onClick={() => onMeet(item.meetingid)}
                          title="The class is starting soon."
                        >
                          <i
                            class="fas fa-users"
                            style={{ fontSize: "12px" }}
                          ></i>
                          &nbsp; Join
                        </a>
                      </>
                    )}
                  {/* Join */}
                  {new Date(item.meetingDate + " 00:00:00").getTime() ==
                    new Date(formatDate(new Date()) + " 00:00:00").getTime() &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) == 0 && (
                      <>
                        <a
                          style={{
                            fontSize: "12px",
                            width: "100px",
                            backgroundColor: "#e3c9ef",
                          }}
                          // target="_blank"
                          className="btn main-btn equal_width"
                          // href={item.meetingUrl}
                          onClick={() => onMeet(item.meetingid)}
                          title="The class has started now."
                        >
                          <i
                            class="fas fa-users"
                            style={{ fontSize: "12px" }}
                          ></i>
                          &nbsp; Join
                        </a>
                      </>
                    )}
                  {/* Join */}
                  {new Date(item.meetingDate + " 00:00:00").getTime() ==
                    new Date(formatDate(new Date()) + " 00:00:00").getTime() &&
                    Math.round(
                      (new Date(
                        item.meetingDate + " " + item.meetingTime
                      ).getTime() -
                        new Date().getTime()) /
                        60000
                    ) < 0 &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) <= 5 && (
                      <>
                        <a
                          style={{ fontSize: "small", width: "135px" }}
                          // target="_blank"
                          className="btn main-btn equal_width"
                          // href={item.meetingUrl}
                          onClick={() => onMeet(item.meetingid)}
                          title="The class has started now."
                        >
                          <i
                            class="fas fa-users"
                            style={{ fontSize: "12px" }}
                          ></i>
                          &nbsp; Join
                        </a>
                      </>
                    )}

                  {/* postMeetingBtnLbl */}
                  {new Date(item.meetingDate + " 00:00:00").getTime() ==
                    new Date(formatDate(new Date()) + " 00:00:00").getTime() &&
                    Math.round(
                      (new Date(
                        item.meetingDate + " " + item.meetingTime
                      ).getTime() -
                        new Date().getTime()) /
                        60000
                    ) < 0 &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) > 5 &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) <= item.meetingDurationMins && (
                      <>
                        <a
                          style={{
                            fontSize: "12px",
                            width: "100px",
                            backgroundColor: "#e3c9ef",
                          }}
                          // target="_blank"
                          className="btn main-btn equal_width"
                          // href={item.meetingUrl}
                          onClick={() => onMeet(item.meetingid)}
                          title="The class is in progress."
                        >
                          <i
                            class="fas fa-users"
                            style={{ fontSize: "12px" }}
                          ></i>
                          &nbsp; {item.postMeetingBtnLbl}
                        </a>
                      </>
                    )}

                  {/* Concluded */}
                  {new Date(item.meetingDate + " 00:00:00").getTime() ==
                    new Date(formatDate(new Date()) + " 00:00:00").getTime() &&
                    Math.round(
                      (new Date(
                        item.meetingDate + " " + item.meetingTime
                      ).getTime() -
                        new Date().getTime()) /
                        60000
                    ) < 0 &&
                    Math.abs(
                      Math.round(
                        (new Date(
                          item.meetingDate + " " + item.meetingTime
                        ).getTime() -
                          new Date().getTime()) /
                          60000
                      )
                    ) > item.meetingDurationMins && (
                      <>
                        <a
                          style={{
                            fontSize: "12px",
                            backgroundColor: "#e3c9ef",
                            pointerEvents: "none",
                            width: "100px",
                          }}
                          target="_blank"
                          className="btn main-btn equal_width"
                          href="#"
                          title="The class has been concluded."
                        >
                          <i
                            class="fas fa-users"
                            style={{ fontSize: "12px" }}
                          ></i>
                          &nbsp; Concluded
                        </a>
                      </>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />

      <div className="text-center p-1">
        <h5 className="tip">
          <span className="blink_me"> Tip of the day</span>-
          <span dangerouslySetInnerHTML={{ __html: tip }}></span>
        </h5>
      </div>

      <div className="text-center p-1">
        <h5>
          <span className="blink_me">Announcement:</span>
          {news?.map((item) => {
            return (
              <span
                className="msg_dashbrd"
                style={{ marginLeft: "10px" }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></span>
            );
          })}
        </h5>
      </div>
      {/* DONE: Container */}
      {/* FIXME: Resize the container */}
      <div className="container">
        <div className="row responsive-center justify-center">
          {[
            {
              name: "Practice Tests",
              icon: `fa-solid fa-circle-pause display-5 light-blue`,
              color: "glass-bg-blue",
              target: "#scoreChoosen",
            },
            {
              name: "Mock Test",
              icon: "fa-solid fa-list-check light-green display-5",
              color: "glass-bg-green",
              target: "#availableChoosen",
            },
            {
              name: "Tests Taken",
              icon: "fa-solid fa-circle-check main-color display-5",
              color: "glass-bg",
              target: "#takenChoosen",
            },
            {
              name: "Recorded Live Classes",
              icon: "fa-solid fa-users-rectangle display-5 light-cherry",
              color: "glass-bg-cherry",
              target: "#classNameChoosen",
            },
            {
              name: "Download Material",
              icon: "fa-solid fa-cloud-arrow-down display-5 light-red",
              color: "glass-bg-red",
              target: "#downloadChoosen",
            },
            {
              name: "Exam Pattern",
              icon: "fa-solid fa-book  display-5 light-green",
              color: "glass-bg-green",
              target: "#syllabusModal",
            },
          ].map((data, index) => (
            <DataFeilds
              name={data.name}
              icon={data.icon}
              color={data.color}
              target={data.target}
              key={index}
            />
          ))}
          {/* <div className="col-lg-2 col-md-2 col-sm-6 p-4">
            <a href="#" className="text-decoration-none" type="button" data-bs-toggle="modal" data-bs-target="#scoreChoosen" style={{}}>
              <div className="card glass-bg-blue rounded text-center d-cards">
                <i className="fa-solid fa-circle-pause display-5 light-blue"></i>
                <h5
                  className="mb-2 white mt-3 font-15"
                  // onClick={() => TestAvailable()}
                >
                  Practice Tests
                </h5>
              </div>
            </a>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-6 p-4">
            <a
              href="#"
              className="text-decoration-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#availableChoosen"
              // onClick={() => TestAvailable()}
            >
              <div className="card glass-bg-green rounded text-center d-cards">
                <i className="fa-solid fa-list-check light-green display-5"></i>
                <h5 className="mb-2 white mt-3 font-15 ">Tests Available</h5>
              </div>
            </a>
          </div> */}

          {/* <div className="col-lg-2 col-md-2 col-sm-6 p-4">
            <a href="#" id="review-test-modal" className="text-decoration-none" type="button" data-bs-toggle="modal" data-bs-target="#takenChoosen" onClick={() => TestTaken()}>
              <div className="card glass-bg rounded text-center d-cards">
                <i className="fa-solid fa-circle-check main-color display-5"></i>
                <h5 className="mb-2 white mt-3 font-15">Tests Taken</h5>
              </div>
            </a>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-6 p-4">
            <a href="#" className="text-decoration-none" type="button" data-bs-toggle="modal" data-bs-target="#classNameChoosen">
              <div className="card glass-bg-cherry rounded text-center d-cards">
                <i className="fa-solid fa-users-rectangle display-5 light-cherry"></i>
                <h5 className="mb-2 white mt-3 font-15 ">Recorded Live Classes</h5>
              </div>
            </a>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-6 p-4">
            <a className="text-decoration-none" type="button" data-bs-toggle="modal" data-bs-target="#downloadChoosen" onClick={() => onDownload()}>
              <div className="card glass-bg-red rounded text-center d-cards">
                <i className="fa-solid fa-cloud-arrow-down display-5 light-red"></i>
                <h5 className="mb-2 white mt-3 font-15">Download Material</h5>
              </div>
            </a>
          </div> */}

          {/* <div className="col-lg-2 col-md-2 col-sm-6 p-4">
            <a className="text-decoration-none" type="button" data-bs-toggle="modal" data-bs-target="#syllabusModal">
              <div className="card glass-bg-green rounded text-center d-cards">
                <i className="fa-solid fa-book  display-5 light-green"></i>
                <h5 className="mb-2 white mt-3 font-15">Exam Pattern</h5>
              </div>
            </a>
          </div> */}
        </div>
      </div>

      <br />
      <br />

      <div
        className="modal fade"
        id="downloadModal"
        tabindex="-1"
        aria-labelledby="downloadModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="downloadModalLabel">
                Download Material
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="test-available-design">
                <div className="">Coming Soon..</div>
                <div className="" style={{ display: "none" }}>
                  <Link to="" className="btn main-btn ">
                    Soon
                  </Link>
                </div>
              </div>
            </div>
            <button
              style={{ margin: "auto", marginBottom: "30px" }}
              className="btn main-btn"
              data-bs-toggle="modal"
              data-bs-target="#downloadChoosen"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="takenModal"
        tabindex="-1"
        aria-labelledby="takenModalLabel"
        aria-hidden="true"
        style={{ width: "100%" }}
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="takenModalLabel">
                Test Taken Before
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className="row mb-2 reviewtable"
                style={{ margin: "0 20px" }}
              >
                <table style={{ width: "100%", border: "1px solid black" }}>
                  <tr>
                    <th
                      style={{
                        width: "20%",

                        textAlign: "center",
                        background: "#7b1fa2",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      Quiz Title
                    </th>
                    <th
                      style={{
                        width: "20%",

                        textAlign: "center",
                        background: "#7b1fa2",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      Quiz Code
                    </th>
                    <th
                      style={{
                        width: "20%",

                        textAlign: "center",
                        background: "#7b1fa2",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        width: "20%",

                        textAlign: "center",
                        background: "#7b1fa2",
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                  {testData
                    ? testData.map((item) => (
                        <tr>
                          <td
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                            }}
                          >
                            {item.quizTitle}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                            }}
                          >
                            {item.quizCode}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                            }}
                          >
                            {moment(item.submittedDate).format("DD-MM-YYYY")}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            <Link
                              className="btn main-btn "
                              to="/reviewTest"
                              state={{ quizId: item.quizResultId }}
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))
                    : ""}
                </table>
              </div>
              {/* </div> */}
            </div>
            <button
              style={{ margin: "auto", marginBottom: "30px" }}
              className="btn main-btn"
              data-bs-toggle="modal"
              data-bs-target="#takenChoosen"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="availableModal"
        tabindex="-1"
        aria-labelledby="availableModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="availableModalLabel">
                Available Tests
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* UnComment below code to make it working again */}

            <div className="modal-body">
              {courseDetails.map((item) => (
                <div>
                  <div className="col-md-9" style={{ padding: "0px" }}>
                    {item.courseName}
                  </div>
                  <br />
                  {item.topicBeans.map((items) => (
                    <div className="test-available-design">
                      <div className="">{items.topicName}</div>
                      <div className="">
                        <Link
                          to="/viewTest"
                          state={{
                            courseId: item.courseId,
                            topicId: items.topicId,
                            name: "Test",
                          }}
                          className="btn main-btn"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              style={{ margin: "auto", marginBottom: "30px" }}
              className="btn main-btn"
              data-bs-toggle="modal"
              data-bs-target="#availableChoosen"
            >
              Back
            </button>

            {/* Comment this to disable coming soon */}

            {/* <div className="modal-body">
              <div className="test-available-design">
                <div className="">
                  Please visit "Practice Tests" available at Dashboard
                </div>
                <div className="" style={{ display: "none" }}>
                  <Link to="" className="btn main-btn ">
                    Soon
                  </Link>
                </div>
              </div>
            </div> */}
            {/* Comment Till here */}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="scoreModal"
        tabindex="-1"
        aria-labelledby="scoreModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="scoreModalLabel">
                Free Practice Test
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {courseDetails.map((item) => (
                <div>
                  <div className="col-md-9" style={{ padding: "0px" }}>
                    {item.courseName}
                  </div>
                  <br />
                  {item.topicBeans.map((items) => (
                    <div className="test-available-design">
                      <div className="">{items.topicName}</div>
                      <div className="">
                        <Link
                          to="/viewTest"
                          state={{
                            courseId: item.courseId,
                            topicId: items.topicId,
                            name: "practice",
                          }}
                          className="btn main-btn"
                        >
                          Open
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              style={{ margin: "auto", marginBottom: "30px" }}
              className="btn main-btn"
              data-bs-toggle="modal"
              data-bs-target="#scoreChoosen"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="classNameModal"
        tabindex="-1"
        aria-labelledby="classNameModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="classNameModalLabel">
                Recorded Live Classes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: "left" }}>
                <div
                  className="row"
                  style={{ paddingBottom: "3%", paddingLeft: "5%" }}
                >
                  {recClasses.map((items, index) => (
                    <VideoData
                      url={items.videoUrl}
                      title={items.videoTitle}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              style={{ margin: "auto", marginBottom: "30px" }}
              className="btn main-btn"
              data-bs-toggle="modal"
              data-bs-target="#classNameChoosen"
            >
              Back
            </button>
          </div>
        </div>
      </div>
      {/* 
      <div
        className="modal fade show modalCourseSelect"
        id="courseModal"
        tabindex="-1"
        aria-labelledby="courseModalLabel"
        aria-hidden="true"
        style={{ display: "block", background: "#00000078" }}
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="courseModalLabel">
                Select the course
              </h5>
              <button
                type="button"
                className="btn-close courseModalbtn"
                data-bs-dismiss="modal"
                data-mdb-dismiss="modal"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Course</option>
                <option value="1">Maths</option>
                <option value="2">Science</option>
                <option value="3">English</option>
              </select>
              <br />

              <button className="btn main-btn float-end">Submit</button>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="modal fade"
        id="syllabusModal"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Exam Pattern
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setData([])}
              ></button>
            </div>
            <div className="modal-body">
              {profileData?.courseBeans?.map((item) => {
                return (
                  <div className="test-available-design">
                    <div className="col-md-8">{item.courseName}</div>
                    <div
                      className=""
                      onClick={() => {
                        onExamPattern(item.courseId);
                        setCourseName(item.courseName);
                      }}
                    >
                      <a
                        style={{ color: "white" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampattern"
                        className="btn main-btn "
                      >
                        View
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="takenChoosen"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Test Taken
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setData([])}
              ></button>
            </div>
            <div className="modal-body">
              {profileData?.courseBeans?.map((item) => {
                return (
                  <div className="test-available-design">
                    <div className="col-md-8">{item.courseName}</div>
                    <div className="" onClick={() => TestTaken()}>
                      <a
                        style={{ color: "white" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#takenModal"
                        className="btn main-btn "
                      >
                        View
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="classNameChoosen"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Recorded Live Classes
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setData([])}
              ></button>
            </div>
            <div className="modal-body">
              {profileData?.courseBeans?.map((item) => {
                return (
                  <div className="test-available-design">
                    <div className="col-md-8">{item.courseName}</div>
                    <div className="">
                      <a
                        style={{ color: "white" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#classNameModal"
                        className="btn main-btn "
                      >
                        View
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="downloadChoosen"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Download Material
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setData([])}
              ></button>
            </div>
            <div className="modal-body">
              {profileData?.courseBeans?.map((item) => {
                return (
                  <div className="test-available-design">
                    <div className="col-md-8">{item.courseName}</div>
                    <div className="">
                      <a
                        style={{ color: "white" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#downloadModal"
                        className="btn main-btn "
                      >
                        View
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="scoreChoosen"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Free Practice Tests
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setData([])}
              ></button>
            </div>
            <div className="modal-body">
              {profileData?.courseBeans?.map((item) => {
                return (
                  <div className="test-available-design">
                    <div className="col-md-8">{item.courseName}</div>
                    <div className="" onClick={() => TestTaken()}>
                      <a
                        style={{ color: "white" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#scoreModal"
                        className="btn main-btn "
                      >
                        View
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="availableChoosen"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Tests Available
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setData([])}
              ></button>
            </div>
            <div className="modal-body">
              {profileData?.courseBeans?.map((item) => {
                return (
                  <div className="test-available-design">
                    <div className="col-md-8">{item.courseName}</div>
                    <div className="" onClick={() => TestAvailable()}>
                      <a
                        style={{ color: "white" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#availableModal"
                        className="btn main-btn "
                      >
                        View
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Table present in Exam Pattern */}
      <div
        className="modal fade"
        id="exampattern"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Exam Pattern
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setData([])}
              ></button>
            </div>
            <h5 style={{ fontSize: "21px", marginLeft: "20px" }}>
              {courseName}
            </h5>
            <div className="modal-body exam-pattern-table ">
              <table style={{ width: "100%", border: "1px solid black" }}>
                <tr>
                  <th
                    style={{
                      width: "40%",
                      border: "1px solid black",
                      textAlign: "center",
                      backgroundColor: "#8d3eaf",
                      color: "white",
                    }}
                  >
                    Sections
                  </th>
                  <th
                    style={{
                      width: "20%",
                      border: "1px solid black",
                      textAlign: "center",
                      backgroundColor: "#8d3eaf",
                      color: "white",
                    }}
                  >
                    Subjects
                  </th>
                  <th
                    style={{
                      width: "20%",
                      border: "1px solid black",
                      textAlign: "center",
                      backgroundColor: "#8d3eaf",
                      color: "white",
                    }}
                  >
                    No. Of Questions
                  </th>
                  <th
                    style={{
                      width: "20%",
                      border: "1px solid black",
                      textAlign: "center",
                      backgroundColor: "#8d3eaf",
                      color: "white",
                    }}
                  >
                    To be Attempted
                  </th>
                  <th
                    style={{
                      width: "20%",
                      border: "1px solid black",
                      textAlign: "center",
                      backgroundColor: "#8d3eaf",
                      color: "white",
                    }}
                  >
                    Duration
                  </th>
                </tr>
                {examPattern
                  ? examPattern.map((item) => (
                      <tr>
                        <td
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {item.sections}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {item.subjects}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {item.noOfQuestions}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {item.toBeAttempted}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {item.duration}
                        </td>
                      </tr>
                    ))
                  : ""}
              </table>
            </div>
            <button
              style={{ margin: "auto", marginBottom: "30px" }}
              className="btn main-btn"
              data-bs-toggle="modal"
              data-bs-target="#syllabusModal"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <footer className="footer mt-auto py-3 main-color-bg border-top fixed-footer">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  ) : (
    " "
  );
}

// DONE:
function DataFeilds(data) {
  return (
    <>
      {" "}
      <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 p-4 ">
        <a
          href="#"
          className="text-decoration-none"
          type="button"
          data-bs-toggle="modal"
          data-bs-target={data.target}
          style={{ width: "160px", display: "block", margin: "0 auto" }}
        >
          <div className={`card ${data.color} rounded text-center d-cards`}>
            <i className={data.icon}></i>
            {/* {data.icon} */}
            <h5
              className="mb-2 white mt-3 font-15"
              // onClick={() => TestAvailable()}
            >
              {data.name}
            </h5>
            {/* <h3 className="white fw-bolder">100</h3> */}
          </div>
        </a>
      </div>
    </>
  );
}

function VideoData(data) {
  return (
    <>
      <div className="col-md-4">
        <iframe
          src={data.url}
          allowfullscreen="allowfullscreen"
          title="YouTube video player"
          frameborder="2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          width="100%"
        ></iframe>
      </div>
      <div className="col-md-5" style={{ paddingTop: 20 }}>
        {data.title}
        {/* <p className="small">Lorem ipsum dolor sit amet. {"[ABOUT]"}</p> */}
      </div>
      <div className="col-md-3"></div>
    </>
  );
}

export default StudentDashboard;
