import React from "react";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import baseUrl from "../../Components/baseUrl";
import Cookies from "js-cookie";
import axios from "axios";
import Logo from "../../Assets/images/logo.png";
import { Link } from "react-router-dom";
import "./feedback.css";

function Feedback() {
  const [profileData, setProfileData] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [otherSubject, setOtherSubject] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    otherSubject: "",
    courseId: "",
    description: "",
  });

  function feedbackSubmit(e) {
    setSubmit(true);
    e.preventDefault();
    console.log(info);
    fetch(`${baseUrl()}/df/submitFeedback`, {
      method: "POST",

      body: JSON.stringify(info),

      headers: {
        "Content-Type": "application/json",
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: Cookies.get("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ResultCode == 200) {
          setSubmit(false);
          setInfo({
            name: "",
            email: "",
            mobile: "",
            subject: "",
            otherSubject: "",
            courseId: "",
            description: "",
          });
          setOtherSubject(false);
          alert(data.ResultMessage);
        }
      })
      .catch((e) => {
        alert(e);
        setSubmit(false);
      });
  }
  function checkOther(e) {
    if (e.target.value == "other") {
      setOtherSubject(true);
    } else {
      setOtherSubject(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .post(
        baseUrl() + "/df/coursesAndTopics/",
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
        if (response.status === 200) {
          setCourseDetails(response.data.Data);
          //setProfileData(response.data.Data);
          console.log(response.data.Data);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${baseUrl()}/df/findMasterData/MS001`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: Cookies.get("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        setSubjects(data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleOnlyLetters = (event, name) => {
    const result = event.target.value.replace(/[^a-z]/gi, "");

    if (name === "submit") {
      setInfo({ ...info, name: result });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light px-5 py-1 fixed-top white-bg">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt=""
            width="70"
            height="auto"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mr-2">
            <li className="nav-item px-3">
              <Link className="nav-link " aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div
        // className="feedback-form"
        style={{
          margin: "120px 0 50px 0",
          minHeight: "93vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <form className="feedback-form" onSubmit={feedbackSubmit}>
          <div
            style={{
              border: "none",
              textAlign: "center",
              fontWeight: "500",
              fontSize: "larger",
              color: "#c72dca",
            }}
          >
            <label for="feedbackForm">Feedback Form</label>
          </div>
          <div className="form-group" style={{ border: "none" }}>
            <label for="exampleInputEmail1">Your Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Please enter your name"
              required
              value={info.name}
              onChange={(e) => handleOnlyLetters(e, "submit")}
            />
          </div>
          <div className="form-group" style={{ border: "none" }}>
            <label for="exampleInputPassword1">Your Contact No</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Please enter your contact no"
              required
              value={info.mobile}
              onChange={(e) => {
                if (
                  e.target.value.length == 11 ||
                  e.target.value.split("")[0] <= 5
                )
                  return false;
                setInfo({ ...info, mobile: e.target.value });
              }}
            />
          </div>
          <div className="form-group" style={{ border: "none" }}>
            <label for="exampleInputEmail1">Your e-mail address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Please enter your e-mail address"
              required
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </div>
          <div class="form-group" style={{ border: "none" }}>
            <label for="exampleFormControlSelect1">Area of concern</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              required
              value={info.subject}
              onChange={(e) => {
                setInfo({ ...info, subject: e.target.value });
                checkOther(e);
              }}
            >
              <option> Please choose your area of concern</option>
              {subjects?.map((item, index) => {
                return (
                  <option key={index} value={item.masterLabel}>
                    {item.masterLabel}
                  </option>
                );
              })}
              <option value="other">Other</option>
            </select>
          </div>
          {otherSubject ? (
            <>
              <div className="form-group" style={{ border: "none" }}>
                <label for="exampleInputEmail1">Other Subject</label>
                <input
                  value={info.otherSubject}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Other Subject"
                  required
                  onChange={(e) =>
                    setInfo({ ...info, otherSubject: e.target.value })
                  }
                />
              </div>
            </>
          ) : (
            ""
          )}

          <div class="form-group" style={{ border: "none" }}>
            <label for="exampleFormControlSelect1">Courses</label>
            <select
              value={info.courseId}
              class="form-control"
              id="exampleFormControlSelect1"
              required
              onChange={(e) => setInfo({ ...info, courseId: e.target.value })}
            >
              <option selected>Select your course</option>
              {courseDetails.map((item) => (
                <option value={item.courseId}>{item.courseName}</option>
              ))}
            </select>
          </div>
          <div class="form-group" style={{ border: "none" }}>
            <label for="exampleFormControlTextarea1">Your feedback here</label>
            <textarea
              value={info.description}
              required
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Your feedback here"
              onChange={(e) =>
                setInfo({ ...info, description: e.target.value })
              }
            ></textarea>
          </div>

          <p className="termsFeedback">
            By clicking the "Submit Feedback", I agree to receive a call back
            from BESST and its associated partners/organizations regarding my
            feedback.
          </p>

          <div
            className="form-group"
            style={{ border: "none", flexDirection: "row" }}
          >
            <label for="exampleInputEmail1">
              I agree to &nbsp;&nbsp;
              <a
                href="https://www.besst.in/registration/documents/Terms and Conditiion BESST.pdf"
                target="_blank"
              >
                Terms and Conditions
              </a>
              &nbsp;&nbsp; and&nbsp;&nbsp;
              <a
                href="https://www.besst.in/registration/documents/PRIVACY POLICY BESST.pdf"
                target="_blank"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <Link className="btn main-btn" to="/">
              Back
            </Link>
            <button type="submit" className="btn main-btn">
              {submit ? "Please Wait..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default Feedback;
