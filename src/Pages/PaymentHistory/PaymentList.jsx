import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
// import { useNavigate } from "react-router-dom";
import "./PaymentList.css";

import PaymentOrder from "./PaymentListComponent/PaymentOrder";
// import PaymentRefund from "./PaymentListComponent/PaymentRefund";

const DATA = {
  allSuccessPayments: [],
  allFailedPayments: [],
  allPendingPayments: [],
};

const PaymentList = () => {
  const [profileData, setProfileData] = useState([]);
  // const navigate = useNavigate();

  // const [paymentData, setPaymentData] = useState([]);

  const [paymentHistoryDetails, setPaymentHistoryDetails] = useState(DATA);
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
              "Access-Control-Allow-Origin": "*",
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
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(baseUrl() + "/pg/getPaymentsHistory", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: `${Cookies.get("token")}`,
          "content-type": "application/json",
        },
        data: "",
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.ResultCode === "200") setPaymentHistoryDetails(() => ({ ...data.Data }));
      })
      .catch((e) => console.log(e));
  }, []);

  // const allSuccessPayments = useMemo(() => paymentHistoryDetails.allSuccessPayments, [paymentHistoryDetails.allSuccessPayments.length]);
  return (
    <>
      <Header profileData={profileData} />

      <section style={{ marginTop: 150 }} className="container-lg">
        <h1 className="my-5" style={{ fontFamily: "sans-serif !important" }}>
          Purchase History
        </h1>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Course
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <PaymentOrder paydata={[...paymentHistoryDetails.allSuccessPayments, ...paymentHistoryDetails.allFailedPayments, ...paymentHistoryDetails.allPendingPayments]} />
          </div>
        </div>
      </section>

      <footer className="footer mt-auto py-3 main-color-bg border-top fixed-footer">
        <div className="container text-center">
          <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
        </div>
      </footer>
    </>
  );
};

export default PaymentList;

/* <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Refund
            </button>
          </li> */

/* <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <PaymentRefund />
          </div> */
