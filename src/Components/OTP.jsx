import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "./otp.css";
import axios from "axios";
import baseUrl from "./baseUrl";

import { useNavigate } from "react-router-dom";
import CountdownApp from "./CountdownApp";
import { EncryptText } from "./Encrypt/CryptoEncryption";

export default function OTP({ email, otpBox, verifyEmailOtp }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [sendOtps, setSendOtps] = useState(null);
  const [loading, setLoader] = useState(false);
  const [verify, setVerify] = useState(false);
  const [timer, setTimer] = useState(false);
  const [resend, setResend] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [resendCheck, setResendCheck] = useState(true);
  const [verifyEmail, setVerifyEmail] = useState(null);
  console.log(email);
  console.log(otpBox);
  console.log(sendOtps);

  useEffect(() => {
    setTimeout(() => {
      setResendCheck(false);
    }, 60000);
  }, []);

  useEffect(() => {
    setSendOtps(otpBox);
  }, [otpBox]);

  useEffect(() => {
    setVerifyEmail(verifyEmailOtp);
  }, [verifyEmailOtp]);

  const onSendOtp = () => {
    setResend(true);
    axios
      .post(baseUrl() + `/wl/sendOTP`, {
        EmailId: email,
        OtpType: "1",
      })
      .then((response) => {
        console.log("res", response.data.ResultCode);
        if (response.status == "200") {
          // alert("OTP sent");

          setSuccessfull(true);
          setResend(false);
          setTimer(true);
        }
      });
  };

  const verifyOTP = () => {
    setLoader(true);

    axios
      .post(baseUrl() + `/wl/verifyOTP`, {
        EmailId: EncryptText(email),
        Otp: EncryptText(otp),
      })
      .then((response) => {
        if (response.data.ResultCode === "200") {
          setLoader(false);
          otpBox = false;
          verifyEmailOtp(true);
          setSendOtps(false);
          setVerify(true);
        } else {
          setLoader(false);
          alert(response.data.ResultMessage);
        }
      })
      .catch((e) => {
        setLoader(false);
        alert(e);
      });
  };
  // const resendOTP = ()=>{
  //   fetch(`${process.env.REACT_APP_BASE_URL}`)
  // }

  return (
    <>
      {sendOtps ? (
        <div
          className="form-group"
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h1>Verify Your OTP</h1>
          <p>* The OTP has been sent to your mail successfully *</p>
          <OtpInput className="otp-input" value={otp} onChange={(otp) => setOtp(otp)} numInputs={4} separator={<span>-</span>} />
          <p
            onClick={() => {
              onSendOtp(email);
              setTimeout(() => {
                setTimer(false);
              }, 60000);
            }}
            style={{
              cursor: "pointer",
              marginLeft: "auto",
              marginBottom: "-50px",
            }}
          >
            {resendCheck ? "" : <>{resend ? "Please Wait..." : "Resend OTP..."}</>}
          </p>
          <p
            style={{
              margin: "20px 0",
            }}
          >
            {successfull ? "Successfully send..." : ""}
          </p>
          {resendCheck ? (
            <p className="countdown">
              <CountdownApp />
            </p>
          ) : (
            ""
          )}

          {timer ? (
            <p className="countdown">
              <CountdownApp />
            </p>
          ) : (
            ""
          )}

          {loading ? (
            "Please Wait...."
          ) : (
            <button className="btn main-btn" onClick={() => verifyOTP(email)}>
              Verify
            </button>
          )}
        </div>
      ) : (
        ""
      )}
      {verify ? <p style={{ fontSize: "12px", color: "green" }}>Your email has been verified.</p> : ""}
    </>
  );
}
