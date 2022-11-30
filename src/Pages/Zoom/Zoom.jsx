// import React, { useEffect, useState } from "react";
// import { ZoomMtg } from "@zoomus/websdk";

// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import baseUrl from "../../Components/baseUrl";

// import Header from "../../Components/Header";
// import "./Zoom.css";

// ZoomMtg.setZoomJSLib("https://source.zoom.us/2.5.0/lib", "/av");

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// // loads language files, also passes any error messages to the ui
// ZoomMtg.i18n.load("en-US");
// ZoomMtg.i18n.reload("en-US");

// const Zoom = () => {
//   const navigate = useNavigate();
//   const signatureEndpoint = "http://localhost:4000"; // <-- signature endpoint
//   const sdkKey = process.env.REACT_APP_ZOOM_SDK_KEY; // YOUR_SDK_KEY
//   const meetingNumber = ""; // Your ZOOM meeting number here
//   const role = 0;
//   const leaveUrl = "http://localhost:3000/registration/zoom"; // Leave URL
//   const userName = "React"; // UserName
//   const userEmail = ""; // UserEmail
//   const passWord = ""; // Your meeting Password number here
//   const registrantToken = "";
//   const [profileData, setProfileData] = useState("");
//   useEffect(() => {
//     if (Cookies.get("token") !== null) {
//       axios
//         .post(
//           baseUrl() + "/profileData",
//           {
//             email: Cookies.get("email"),
//           },
//           {
//             headers: {
//               "Acces-Control-Allow-Origin": "*",
//               Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
//               Authorization: `${Cookies.get("token")}`,
//             },
//           }
//         )
//         .then((response) => {
//           if (response.status === 200) {
//             setProfileData(response.data.Data);
//             console.log(response.data.Data);
//           }
//         })
//         .catch((e) => {
//           // FIXME: remove the comment after done
//           navigate("/");
//           console.log(e);
//         });
//     }
//   }, []);

//   function getSignature(e) {
//     e.preventDefault();

//     fetch(signatureEndpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         meetingNumber: meetingNumber,
//         role: role,
//       }),
//     })
//       .then((res) => res.json())
//       .then((response) => {
//         startMeeting(response.signature);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   function startMeeting(signature) {
//     document.getElementById("zmmtg-root").style.display = "block";

//     ZoomMtg.init({
//       leaveUrl: leaveUrl,
//       success: (success) => {
//         console.log(success);

//         ZoomMtg.join({
//           signature: signature,
//           meetingNumber: meetingNumber,
//           userName: userName,
//           sdkKey: sdkKey,
//           userEmail: userEmail,
//           passWord: passWord,
//           tk: registrantToken,
//           success: (success) => {
//             console.log(success);
//           },
//           error: (error) => {
//             console.log(error);
//           },
//         });
//       },
//       error: (error) => {
//         console.log(error);
//       },
//     });
//   }

// ZoomMtg.setZoomJSLib("https://source.zoom.us/2.5.0/lib", "/av");

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// // loads language files, also passes any error messages to the ui
// ZoomMtg.i18n.load("en-US");
// ZoomMtg.i18n.reload("en-US");

// ZoomMtg.init({
//   leaveUrl: leaveUrl,
//   success: (success) => {
//     console.log(success);

//     ZoomMtg.join({
//       signature: signature,
//       meetingNumber: meetingNumber,
//       userName: userName,
//       sdkKey: sdkKey,
//       userEmail: userEmail,
//       passWord: passWord,
//       tk: registrantToken,
//       success: (success) => {
//         console.log(success);
//       },
//       error: (error) => {
//         console.log(error);
//       },
//     });
//   },
//   error: (error) => {
//     console.log(error);
//   },
// });
//   }

//   return (
//     <>
//       <Header profileData={profileData} />
//       <div className="text-center" style={{ marginTop: "200px" }}>
//         <main>
//           <h1>Zoom Meeting SDK Sample React</h1>

//           <button className="btn main-btn" onClick={getSignature}>
//             Join Meeting
//           </button>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Zoom;
