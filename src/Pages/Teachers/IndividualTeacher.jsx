import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import useRemoveModal from "../../Components/useRemoveModal";
import Logo from "../../Assets/images/logo.png";
import "./teacher.css";
import { Link, useParams } from "react-router-dom";

function IndividualTeacher() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [pack, setPack] = useState([]);
  const [allTeachers, setAllTeachers] = useState(null);
  useRemoveModal();

  useEffect(() => {
    if (Cookies.get("token") !== null) {
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
    }
  }, []);

  useEffect(() => {
    fetch(`${baseUrl()}/df/findUserRole/2`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("teacher", data.result);
        setAllTeachers(data.result);
      });
  }, []);

  return (
    <>
      {/* <Header profileData={profileData} /> */}
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
      <div className="invoice-page" style={{ margin: "80px 0" }}>
        <div
          className="custom-slider"
          style={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          {console.log(id)}
          {allTeachers?.map((teacher) => {
            console.log(id == teacher.mobile);
            if (id == teacher.mobile) {
              return (
                <div
                  class="card  "
                  style={{ width: "40%", border: "2px solid #ebebeb" }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "250px",
                      width: "100%",
                      margin: "auto",
                    }}
                  >
                    <img
                      class="card-img-top"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: "0",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                      src={`${baseUrl()}/df/showProfilePic/${teacher.image}`}
                      alt="Card image cap"
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{teacher.userName}</h5>
                    <p class="card-text">Skills : {teacher.skills}</p>
                    <p>Experience : {teacher.experience}yrs</p>
                    <p>Email : {teacher.email}</p>
                    <p>Mobile: {teacher.mobile}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <footer className="footer mt-auto py-3 main-color-bg border-top ">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default IndividualTeacher;
