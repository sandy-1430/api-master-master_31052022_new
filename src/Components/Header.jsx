/* eslint-disable */
import React, { useEffect } from "react";
import axios from "axios";

import Logo from "../Assets/images/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { MdOutlinePayments } from "react-icons/md";
import baseUrl from "./baseUrl";
import { useNavigate } from "react-router-dom";
import { useGoogleLogout } from "react-google-login";
import NavSubscription from "./NavSubscription";
import UserBillModal from "./UserBillModal";
import { GoPrimitiveDot } from "react-icons/go";
import LineAnimation from "./LineAnimation";
import Blink from "./Blink";
import { AiFillNotification } from "react-icons/ai";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";

Header.defaultProps = {
  newsBlink: false,
  blinkFocus: false,
  currentAffairsFlag: false,
  currentAffairsFoucus: false,
};

const Nav = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Service", id: "service" },
  { name: "Reviews", id: "review" },
  { name: "Strength", id: "strategy" },
  { name: "Contact", id: "contact" },
];


function Header(props) {
  const navigate = useNavigate();
  const param = window.location.pathname;
  const clientId =
    "687458829496-83t97ka8jja2dvulr4ik8un4t262a2ac.apps.googleusercontent.com";

  const onLogout = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("userId");
  };

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
            console.log("valid");
          } else if (response.status === 403) {
            onLogout();
            Cookies.remove("token");
            Cookies.remove("email");
            Cookies.remove("userId");
            navigate("/");
          }
        })
        .catch((e) => {
          onLogout();
          console.log(e);
          console.log("ddddddddddd");
        });
    }
  }, []);

  // 👇👇 FOR ACTIVE state of Nav Link
  useEffect(() => {
    $(".navbar-nav li a").click(function () {
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
    });
  }, []);

  return (
    <>
      {param === "/registration/" ||
        param === "/registration" ||
        param === "/registration/page" ? (
        <>
          <nav className="navbar navbar-expand-xl navbar-light px-5 py-1 fixed-top white-bg nav-pills">
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
              <ul className="navbar-nav ms-auto mr-2 text-center align-items-center">
                <li className="nav-item px-3">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>

                <li className="nav-item px-3">
                  <a className="nav-link" href="#news">
                    {props.newsBlink ? (
                      <LineAnimation name="News" />
                    ) : (
                      <>News</>
                    )}
                  </a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link" href="#news">
                    {props.currentAffairsFoucus ? (
                      <Blink />
                    ) : (
                      <GoPrimitiveDot
                        color={"red"}
                        style={
                          props.currentAffairsFlag
                            ? { display: "inline-block" }
                            : { display: "none" }
                        }
                      />
                    )}
                    <>Current Affairs</>
                  </a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link" href="#reviews">
                    Reviews
                  </a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link" href="#statistics">
                    Strength
                  </a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link" href="#services">
                    Services
                  </a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link" href="#about">
                    About Us
                  </a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link" href="#contact">
                    Contact Us
                  </a>
                </li>
                {!Cookies.get("token") ? (
                  <>
                    <li>
                      <a
                        className="btn main-btn-outline px-3 ml-4"
                        type="button"
                        id="particular-signup"
                        data-bs-toggle="modal"
                        data-bs-target="#registerModal"
                        href="#"
                      >
                        Sign up
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn main-btn px-3 ml-4"
                        type="button"
                        id="particular-login"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        href="#"
                      >
                        Login
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    {/* <li className="nav-item px-3 landing-payment" style={{ display: "flex", margin: "5px auto" }}>
                      <button
                        type="button"
                        className="btn main-btn  px-4 me-md-2"
                        data-toggle="modal"
                        data-target="#StateCheckModal"
                        onClick={() => {
                          console.log("Payment received", param);
                          // navigate("/subscription");
                        }}
                        to="/subscription"
                      >
                        <MdOutlinePayments style={{ fontSize: "25px" }} />
                        <span style={{ marginLeft: "7px" }}>Subscription</span>
                      </button>
                    </li> */}
                    <li className="nav-item" style={{ marginRight: "auto" }}>
                      <div className="dropdown" style={{ float: "right" }}>
                        <button className="dropbtn">
                          {props.profileData.firstName
                            ? props.profileData.firstName
                              .split("")[0]
                              .toUpperCase()
                            : " "}
                        </button>
                        <div className="dropdown-content post-login-landing">
                          <Link to="/">Home</Link>
                          <Link to="/studentDashboard">Dashboard</Link>
                          {/* <Link to="/paymenthistory"> Payment History </Link> */}
                          <Link to="/" onClick={onLogout}>
                            Logout
                          </Link>
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </>
      ) : (
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
                {props?.news?.newsBlinkTs === 'Y' ?
                  <li
                    className="nav-item px-3 landing-payment"
                    style={{ display: "flex", margin: "auto" }}
                  >

                    <AiFillNotification
                      style={{
                        fontSize: "50px",
                        color: "#7B1FA2",
                      }}
                    />
                    <NotificationBadge
                      count={1}
                      style={{
                        position: "relative",
                        // // width: "10%",
                        // height: "100%",
                      }}
                    />
                  </li> : ""}
                <li
                  className="nav-item px-3 landing-payment"
                  style={{ display: "flex", margin: "auto" }}
                >
                  <button
                    type="button"
                    className="btn main-btn  px-4 me-md-2"
                    data-toggle="modal"
                    data-target={
                      param !== "/registration/subscription"
                        ? "#StateCheckModal"
                        : ""
                    }
                    onClick={() => {
                      // console.log("Payment received", param);
                      navigate("/subscription");
                    }}
                    to="/subscription"
                  >
                    <MdOutlinePayments style={{ fontSize: "25px" }} />
                    <span style={{ marginLeft: "7px" }}>Subscription</span>
                  </button>
                </li>

                <li className="nav-item" style={{ marginRight: "auto" }}>
                  <div className="dropdown" style={{ float: "right" }}>
                    <button className="dropbtn">
                      {props.profileData.firstName
                        ? props.profileData.firstName.split("")[0].toUpperCase()
                        : " "}
                    </button>
                    <div className="dropdown-content post-login-landing">
                      <Link to="/">Home</Link>
                      <Link to="/studentDashboard">Dashboard</Link>

                      <Link to="/payment-list">Purchase History</Link>
                      {/* <Link to="#" type="button" data-toggle="modal" data-target="#subscriptionModal">
                        My Subscription
                      </Link> */}
                      {/* <Link to="/mySubscriptions">My Subscription</Link> */}
                      {/* FIXM  E: Remove*/}
                      <Link to="/" onClick={onLogout}>
                        Logout
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          {/* DONE: popup Subscriptions menu */}
          {/* <NavSubscription /> */}
        </>
      )}
      {/* <UserBillModal profileData={props.profileData} /> */}
    </>
  );
}

export default Header;
