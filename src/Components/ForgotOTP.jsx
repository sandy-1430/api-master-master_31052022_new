// import React, { useState } from "react";
// import OtpInput from "react-otp-input";
// import "./otp.css";

// import { useNavigate } from "react-router-dom";

// export default function ForgotOTP({ email }) {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const [loading, setLoader] = useState(false);
//   console.log(email);

//   // const resendOTP = ()=>{
//   //   fetch(`${process.env.REACT_APP_BASE_URL}`)
//   // }
//   const verifyOTP = () => {
//     setLoader(true);
//     axios
//       .post(baseUrl() + `/wl/verifyOTP`, {
//         EmailId: email,
//         Otp: otp,
//       })
//       .then((response) => {
//         if (response.data.ResultCode === "200") {
//           setLoader(false);
//         } else {
//           setLoader(false);
//           alert(response.data.ResultMessage);
//         }
//       })
//       .catch((e) => {
//         setLoader(false);
//         alert(e);
//       });
//   };

//   return (
//     <div
//       className="form-group"
//       style={{
//         justifyContent: "center",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "25px",
//       }}
//     >
//       <h1>Verify Your OTP</h1>
//       <p>* The OTP has been sent to your mail successfully *</p>
//       <OtpInput
//         className="otp-input"
//         value={otp}
//         onChange={(otp) => setOtp(otp)}
//         numInputs={4}
//         separator={<span>-</span>}
//       />
//       {loading ? (
//         "Please Wait...."
//       ) : (
//         <button className="btn main-btn" onClick={() => verifyOTP(email)}>
//           Verify
//         </button>
//       )}
//     </div>
//   );
// }
