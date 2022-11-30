/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../../Assets/images/logo.png";
import axios from "axios";
import Cookies from "js-cookie";
// import Header from "../../Components/Header";
import baseUrl from "../../../Components/baseUrl";
import registerImage from "../../../Assets/images/register.png";
import registerBg from "../../../Assets/images/bg.png";
import "./Register.css";
import { EncryptText } from "../../../Components/Encrypt/CryptoEncryption";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // const [googleProfileData, setGoogleProfileData] = useState({
  //   email: "",
  //   name: "",
  //   lastname: "",
  //   uid: "",
  //   latitude: "",
  //   longitude: "",
  // });

  const [googleProfileData, setGoogleProfileData] = useState(location.state?.profileObj || "");
  const [firstName, setFirstName] = useState(location.state?.profileObj.name || "");

  const [familyName, setFamilyName] = useState(location.state?.profileObj.lastname || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState(location.state?.profileObj.email || "");

  const [courseDetails, setCourseDetails] = useState([]);
  const [course, setCourse] = useState("");
  const [term, setTerm] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [desPwd, setDesPwd] = useState(false);

  const [emailActive, setEmailActive] = useState(true);
  useEffect(() => {
    if (!location.state?.profileObj.email && location.state?.profileObj.source === "Facebook") {
      setEmailActive(false);
    }
  }, []);
  function PasswordChecker() {
    // if not validate the passwordChecker
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      document.querySelector("#pwd").style.borderColor = "red";
      document.querySelector("#msg_password").style.display = "inline-block";
      return;
    }
    // if validate the password
    document.querySelector("#pwd").style.borderColor = "green";
    document.querySelector("#msg_password").style.display = "none";
  }

  function confirmPasswordChecker() {
    if (password === confirmPassword) {
      document.querySelector("#cpwd").style.borderColor = "green";
      document.querySelector("#msg_confirm").style.display = "none";
    } else {
      document.querySelector("#cpwd").style.borderColor = "red";
      document.querySelector("#msg_confirm").style.display = "inline";
    }
  }

  useEffect((e) => {
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
          },
        }
      )
      .then((response) => {
        // setLoading(false);
        if (response.status === 200) {
          console.log("items", response.data);
          setCourseDetails(response.data.Data);
          // window.location.reload()
        } else {
          setCourseDetails([]);
        }
      });
  }, []);

  useEffect(() => {
    document.querySelector("body").classList.remove("modal-open");
    document.querySelector("body").style.overflow = "visible";
  }, []);

  function handleFirstName() {
    const regex = "^[A-Za-z]+$";
    // console.log(profileName.length);
    if (firstName.length > 0 && firstName.match(regex)) {
      setFirstName(firstName);
    } else {
      alert("Please enter name");
      setFirstName(googleProfileData.name);
    }
  }

  function handleLastName() {
    const regex = "^[A-Za-z]+$";
    // console.log(profileName.length);
    if (familyName.length > 0 && familyName.match(regex)) {
      setFamilyName(familyName);
    } else {
      alert("Please enter name");
      setFamilyName(googleProfileData.lastname);
    }
  }

  const [clinetLocation, setClinetLocation] = useState({ lat: "", lon: "" });
  const [uid, setUid] = useState(location.state?.profileObj.uid || "");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGoogleProfileData({
        ...googleProfileData,
        latitude: position.coords.latitude.toFixed(2),
        longitude: position.coords.longitude.toFixed(2),
      });
    });
    navigator.geolocation.getCurrentPosition((position) => {
      setClinetLocation({
        lat: position.coords.latitude.toFixed(2),
        lon: position.coords.longitude.toFixed(2),
      });
    });
  }, []);

  async function token(id) {
    // <<<<<<< HEAD
    //     const res = await axios.get(
    //       "https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${id}`,
    //         },
    //       }
    //     );
    //     console.log("Login success>>");
    //     console.log(res);
    //     console.log(res.data);
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       setPoogleProfileData({
    //         ...googleProfileData,
    //         latitude: position.coords.latitude.toFixed(2),
    //         longitude: position.coords.longitude.toFixed(2),
    //       });
    //     });
    //     setPoogleProfileData({
    //       ...googleProfileData,
    //       name: res.data.names[0].givenName,
    //       email: res.data.emailAddresses[0].value,
    //       lastname: res.data.names[0].familyName,
    //       uid: res.data.names[0].metadata.source.id,
    //     });
    // =======
    // const res = await axios.get("https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names", {
    //   headers: {
    //     Authorization: `Bearer ${id}`,
    //   },
    // });
    // console.log("Google Outh Login success");
    // // console.log(res);
    // console.log(res.data);
    // axios
    //   .post(baseUrl() + `/wl/extLogin`, {
    //     email: EncryptText(res.data.emailAddresses[0].value),
    //     name: res.data.names[0].givenName,
    //     source: "Google",
    //     uid: res.data.names[0].metadata.source.id,
    //     latitude: clinetLocation.lat,
    //     longitude: clinetLocation.lon,
    //   })
    //   .then((response) => {
    //     console.log("sucessfully", response);
    //     if (response.data.result.hasPerDtlsUpdated) {
    //       Cookies.set("token", `Bearer ${response.data.result.token}`);
    //       Cookies.set("userId", response.data.result.userLoginResBean.userId);
    //       Cookies.set("email", res.data.emailAddresses[0].value);
    //       navigate("/studentDashboard");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     //if token(id) is not then it will return to navigate lnading page
    //     navigate("/");
    //   });
    // setGoogleUid(res.data.names[0].metadata.source.id);
    // setFirstName(res.data.names[0].givenName);
    // setFamilyName(res.data.names[0].familyName);
    // setEmail(res.data.emailAddresses[0].value);
  }

  const handleOnlyLetters = (event, name) => {
    const result = event.target.value;
    console.log(result);
    // onBlur={(e) => {
    const regex = "^[A-Za-z]+$";
    console.log(result.length, result.match(regex));
    if (result.length > 0 && result.match(regex)) {
      // setProfileData({ ...profileData, firstName: profileName });
      if (name === "first") setFirstName(result);
      else if (name === "last") setFamilyName(result);
      console.log("vaid");
    } else {
      alert(result);
      if (name === "first") setFirstName(googleProfileData.givenName);
      if (name === "last") setFamilyName(googleProfileData.familyName);
      name = "";
    }
    if (name === "first") setFirstName(result);
    else if (name === "last") setFamilyName(result);
    // }}
  };

  function onRegister() {
    axios
      .post(
        `${baseUrl()}/wl/saveExtLoginDtls`,
        {
          firstName: firstName,
          lastName: familyName,
          email: EncryptText(email),
          desiredPwd: EncryptText(password),
          number: EncryptText(number),
          whatsappNumber: EncryptText(whatsappNumber),
          course: course,
          uid: uid,
          latitude: clinetLocation.lat,
          longitude: clinetLocation.lon,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log({
          firstName: firstName,
          lastName: familyName,
          email: EncryptText(email),
          number: EncryptText(number),
          whatsappNumber: EncryptText(whatsappNumber),
          course: course,
          latitude: clinetLocation.lat,
          longitude: clinetLocation.lon,
          uid: uid,
        });
        Cookies.set("token", `Bearer ${response.data.result.token}`);
        Cookies.set("email", email);
        Cookies.set("userId", response.data.result.userLoginResBean.userId);
        navigate("/studentDashboard");
      })
      .catch((e) => {
        alert(e);
      });
  }

  function formValidation() {
    console.log("email");
    if (email.length > 0 && firstName.length > 0 && familyName.length > 0 && number.length > 0 && course.length > 0 && term && password === confirmPassword) {
      onRegister();
    } else {
      alert("Complete all the details first \n Some fields are missing");
    }
  }

  function emailValidations(value) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setEmail(value);
    } else {
      if (value.length !== 0) {
        alert("You have entered an invalid email address!");
        setEmail("");
      }
    }
  }

  // console.log(googleProfileData);
  return (
    <div className="Register">
      <nav className="navbar navbar-expand-lg navbar-light px-5 py-1 fixed-top white-bg">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="" width="70" height="auto" className="d-inline-block align-text-top" />
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
      <div class="wrapper" style={{ marginTop: "100px" }}>
        <div class="form-left">
          <div
            style={{
              position: "absolute",
              bottom: -100,
              left: -100,
              zIndex: 0,
            }}
          >
            <img src={registerBg} alt="bg" width={300} id="register-bg" className="d-absolute" />
          </div>
          <div style={{ position: "absolute", top: -100, right: -150, zIndex: 0 }}>
            <img src={registerBg} alt="bg" width={300} id="register-bg" className="d-absolute" />
          </div>
          {/* <img src={registerBg} alt="bg" width={300} id="register-bg" className="d-absolute" /> */}
          <img src={registerImage} style={{ width: "60%", height: "100%", objectFit: "contain" }} alt="register_image" />
        </div>
        <form class="form-right" style={{ zIndex: 10 }}>
          <h2 class="text-uppercase">Registration form</h2>
          <div class="row">
            <div class="col-sm-6 mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={firstName}
                class="input-field"
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => handleFirstName(e, "first")}
              />
            </div>
            <div class="col-sm-6 mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={familyName}
                class="input-field"
                onChange={(e) => {
                  setFamilyName(e.target.value);
                }}
                onBlur={(e) => handleLastName(e, "last")}
              />
            </div>
          </div>
          <div class="mb-3">
            <label>Your Email</label>

            <input
              value={email}
              type="email"
              class="input-field"
              name="email"
              disabled={emailActive}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => emailValidations(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label>Phone Number</label>
            <input
              name="pwd"
              id="pwd"
              type="number"
              class="input-field"
              value={number}
              onChange={(e) => {
                if (e.target.value.length == 11 || e.target.value.split("")[0] <= 5 || e.target.value.includes("+")) {
                  return false;
                }
                setNumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-3" style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="copy_number"
              style={{ width: "30px" }}
              onClick={(e) => {
                console.log(e.target.checked);
                if (e.target.checked) setWhatsappNumber(number);
                else setWhatsappNumber("");
              }}
              // disabled
            />
            <label htmlFor="copy_number" style={{ marginBottom: 0 }}>
              Same as phone number
            </label>
          </div>
          <div class="mb-3">
            <label>Whatsapp Number</label>
            <input
              name="pwd"
              id="pwd"
              class="input-field"
              value={whatsappNumber}
              type="number"
              onChange={(e) => {
                if (e.target.value.length == 11 || e.target.value.split("")[0] <= 5 || e.target.value.includes("+")) {
                  return false;
                }
                setWhatsappNumber(e.target.value);
              }}
            />
          </div>

          {/* WANT TO ADDED PASSWORD */}
          <div className="mb-3" style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="desPwd"
              style={{ width: "30px" }}
              onClick={(e) => {
                console.log(e.target.checked);
                setDesPwd(e.target.checked);
              }}
              // disabled
            />
            <label htmlFor="copy_number" style={{ marginBottom: 0 }}>
              Create own password
            </label>
          </div>

          {desPwd && (
            <>
              <div class="row">
                <div class="col-sm-6 mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="pwd"
                    id="pwd"
                    class="input-field"
                    onPaste={(e) => e.preventDefault()}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyUp={PasswordChecker}
                  />
                  <span id="msg_password" style={{ display: "none" }}>
                    Not Vaild Password
                  </span>
                </div>
                <div class="col-sm-6 mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="cpwd"
                    id="cpwd"
                    class="input-field"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    onPaste={(e) => e.preventDefault()}
                    onBlur={(e) => confirmPasswordChecker()}
                    required
                  />
                  <span id="msg_confirm" style={{ display: "none" }}>
                    Not Match Password
                  </span>
                </div>
              </div>
            </>
          )}
          {/*  */}
          <div className="mb-3">
            <label className="form-label">Course</label>
            <select id="streamSelect" className="form-select" aria-label="Default select example" onChange={(e) => setCourse(e.target.value)}>
              <option selected>Select your course</option>
              {courseDetails.map((item) => (
                <option value={item.courseId}>{item.courseName}</option>
              ))}
            </select>
          </div>
          <div class="mb-3">
            <label class="option">
              I agree to the{" "}
              <a href="https://www.besst.in/registration/documents/Terms and Conditiion BESST.pdf" target="_blank">
                Terms and Conditions
              </a>
              <input type="checkbox" checked={term} onChange={(e) => setTerm(!term)} />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="form-field">
            <input
              type="submit"
              value="Register"
              class="register"
              name="register"
              onClick={(e) => {
                e.preventDefault();
                formValidation();
              }}
            />
          </div>
        </form>
      </div>

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
        </div>
      </footer>
    </div>
  );
}
