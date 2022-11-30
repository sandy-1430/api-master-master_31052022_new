import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import useRemoveModal from "../../Components/useRemoveModal";
import "./payment.css";
import Under from "../../Assets/under1.png";

function Payment() {
  const [profileData, setProfileData] = useState([]);
  const [pack, setPack] = useState([]);
  useRemoveModal();
  useEffect(() => {
    document.body.style.overflow = "visible";
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
          }
        });
    }
  }, []);

  useEffect(() => {
    fetch(`${baseUrl()}/df/findSubscriptionPlan/2`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPack(data.result);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Header profileData={profileData} />

      <div className="under-dev">
        <img src={Under} alt="" />
      </div>
      <p
        style={{
          fontSize: "30px",
          textAlign: "center",
          color: "#7b1fa2",
          margin: "0 20px",
        }}
      >
        <span>Payment gateway implementation is under development.</span>
        <br />
        <span>Please visit again later.</span>
      </p>

      <footer className="footer mt-auto py-3 main-color-bg border-top fixed-footer">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default Payment;
