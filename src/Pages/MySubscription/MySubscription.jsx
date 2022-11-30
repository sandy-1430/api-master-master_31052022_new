/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/logo.png";
import { BiRupee } from "react-icons/bi";
import baseUrl from "../../Components/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";

import Header from "../../Components/Header";

let random = "[Details_of_Product] Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.";
const obj = {};

function SubscriptionList(props) {
  const {
    subscriptionDetails = random,
    subscriptionName = "Course_Name",
    subscriptionPrice = "12.00",
    supsPlanName = "Basic",
    actualPrice = "3000",
    finalPrice = "1500",
    subscriptionDetails1 = random,
    subscriptionName2 = "Course_Name",
    subscriptionPrice3 = "12.00",
    supsPlanName4 = "Basic",
    actualPrice5 = "3000",
    finalPrice6 = "1500",
  } = props;

  return (
    <>
      <li class="list-group-item border-2">
        <h3 class="my-2 font-weight-bold mx-3" style={{ color: "#7b1fa2" }}>
          {subscriptionName}
        </h3>
        <div class="media align-items-md-start flex-column flex-column-reverse flex-lg-row p-3">
          {/* TODO: Details of Courses */}
          <div class="media-body order-2 order-lg-1" style={{ flexGrow: 2 }}>
            <div className="my-4">
              <p class="text-muted my-1 small">Subscription Plan: {supsPlanName}</p>
              <p class="text-muted mb-1 small">Purchase Date: 2022-07-08T11:07:24.000+0000</p>
              <p class="text-muted my-1 small">
                Applied Coupon: <strong>BESST15</strong>{" "}
              </p>
            </div>
          </div>
          {/* TODO: Details of Course Price */}
          <div class="media-body order-2 order-lg-1">
            <div className="my-4">
              <p class="text-muted my-1 small">
                Actual Price: <BiRupee size={13} />
                {actualPrice}
              </p>
              <p class="text-muted my-1 small">
                Discount Price: <BiRupee size={13} />
                {actualPrice}
              </p>

              <p class="text-muted my-1 small">
                Tax Amount: <BiRupee size={13} />
                {actualPrice}
              </p>
              <p class="text-muted my-1 small">
                Coupon Price: <BiRupee size={13} />
                {actualPrice}
              </p>
              <p class="text-muted my-1 small">
                Total Price: <BiRupee size={13} />
                {actualPrice}
              </p>
              <p class="text-muted my-1 small">Quantity: 1</p>
            </div>
          </div>
          {/* TODO: More Details */}
          <div class="media-body order-2 order-lg-1">
            <div className="my-4">
              <p class="text-muted my-1 small">Active On: 2022-07-08</p>
              <p class="text-muted my-1 small">Expire On: 2023-07-08</p>
            </div>
          </div>
          {/* TODO: DOWNLOAD */}
          <div
            style={{ display: "flex", flex: 1, flexDirection: "column", gap: 10, flexWrap: "wrap", alignContent: "center", alignSelf: "center" }}
            class="ml-lg-0 order-1 order-lg-2"
          >
            <button type="button" class="btn btn-main" style={{ backgroundColor: "#7b1fa2", color: "white", width: "200px" }}>
              View Invoice
            </button>
            <button type="button" class="btn btn-main" style={{ backgroundColor: "gray", color: "white", width: "200px" }}>
              Download Invoice
            </button>
          </div>
        </div>
      </li>
    </>
  );
}

export default function MySubscription() {
  const [selectedId, setSelectedId] = useState(null);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl() + "/df/getUserSubscriptionDetails", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  const data = {
    userSubsId: "16",
  };

  useEffect(() => {
    axios
      .post(baseUrl() + "/df/getSubscrptDtlsById", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

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
            console.log(response.data.Data);
          }
        })
        .catch((e) => {
          // FIXME: remove the comment after done
          // navigate("/");
          console.log(e);
        });
    }
  }, []);
  return (
    <div>
      <Header profileData={profileData} />
      {/* TODO: build page */}
      <main style={{ marginTop: "80px", minHeight: "100vh" }}>
        <div class="container py-5">
          <div class="row text-center text-white mb-4">
            <div class="col-lg-7 mx-auto">
              <h1 style={{ color: "#7b1fa2", fontWeight: "bold" }}>My Subscription</h1>
              <p class="lead mb-0" style={{ fontSize: "12px", color: "black" }}>
                Your Subscription Plan Listed Below:
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 mx-auto">
              <ul class="list-group shadow">
                <SubscriptionList />
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
        </div>
      </footer>
    </div>
  );
}
