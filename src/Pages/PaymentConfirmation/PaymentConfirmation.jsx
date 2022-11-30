/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import Header from "../../Components/Header";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";
import PaymentError from "./PaymentError";
import { DecryptJSON, EncryptJSON, EncryptText } from "../../Components/Encrypt/CryptoEncryption";

function PaymentConfirmation() {
  const [profileData, setProfileData] = useState([]);
  const [status, setStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderAmt, setOrderAmt] = useState("");
  const [orderValue, setOrderValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const res = searchParams.get("resp");
    console.log(res);

    //WATCH: Change 👇👇 here to true to open page "/paymentConfirmation"
    const openPayment = true;

    let value;
    if (openPayment) {
      value = { orderId: "Test202208180100073", txnStatus: "internal", bankRef: "124434" };
      // setOrderValue(value)
    } else {
      // FIXME: This is a temporary fix to get the response from the payment gateway
      if (!res) {
        return navigate("/");
      }
      value = DecryptJSON(res);
    }

    setStatus(value.txnStatus);
    setOrderId(value.orderId);
    setTransactionId(value.bankTxnId);
    setOrderDate(value.orderDate);
    setOrderAmt(value.orderAmt);
    setOrderValue(value);
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
          navigate("/");
          console.log(e);
        });
    }
  }, []);

  return (
    <div>
      <Header profileData={profileData} />

      <div className="d-flex flex-column flex-column-reverse justify-content-around px-3 text-center payment_confirm" style={{ marginTop: "200px" }}>
        {status === "TXN_SUCCESS" && orderId?.length > 0 && (
          <>
            <PaymentSuccess profileData={profileData} orderId={orderId} transactionId={transactionId} orderDate={orderDate} orderAmt={orderAmt} />
          </>
        )}

        {status === "TXN_FAILURE" && <PaymentFailed profileData={profileData} orderId={orderId} transactionId={transactionId} orderDate={orderDate} orderValue={orderAmt} />}
        {status === "internal" && <PaymentError profileData={profileData} orderId={orderId} />}
      </div>

      <footer style={{ position: "fixed", bottom: "0" }} className="footer mt-auto py-3 main-color-bg border-top fixed-footer">
        <div className="container text-center">
          <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
        </div>
      </footer>
    </div>
  );
}

export default PaymentConfirmation;
