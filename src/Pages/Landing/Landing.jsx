/* eslint-disable */
import React, { useEffect, useState } from "react";
import Logo from "../../Assets/images/logo.png";
import Video from "../../Assets/videos/advertise_1.mp4";
import besstQR from "../../Assets/images/besst_qr.jpg";
import carousel1 from "../../Assets/images/hero-carousel-2.svg";

import student from "../../Assets/images/students.png";
import map from "../../Assets/images/map.png";
import courses from "../../Assets/images/course.png";
import google_icon from "../../Assets/images/Google_Logo.svg";
// Google:Login
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

// Facebook:Login
import FacebookLogin from "react-facebook-login";
import "./utilities/FaceBook.css";

import teacher from "../../Assets/images/teachers.png";
import mcq from "../../Assets/images/mcq.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../Components/Header";
import baseUrl from "../../Components/baseUrl";

import Otp from "../../Components/OTP/Otp";
import ValidateForm from "../../Components/Validation";
// import OtpInput from "react-otp-input";
import ForgotOTP from "../../Components/ForgotOTP";
import OTP from "../../Components/OTP";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useInView } from "react-intersection-observer";
import "./landing.css";
import OtpInput from "react-otp-input";
import "../../Components/otp.css";
import useRemoveModal from "../../Components/useRemoveModal";
import Map from "../../Components/Maps/Map";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { EncryptText } from "../../Components/Encrypt/CryptoEncryption";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";
import { AiFillQuestionCircle } from "react-icons/ai";

import Slider from "react-slick";
import Encryption from "../../Components/Encrypt/Encryption";
import Facebook from "./utilities/FaceBook";
import { GoPrimitiveDot } from "react-icons/go";

//extra-data
import Services from "./LandingPageComponents/Services";
import Reviews from "./LandingPageComponents/Reviews";
import AboutPage from "./LandingPageComponents/AboutPage";
import Disclaimer from "./LandingPageComponents/Disclaimer";

function Landing() {
  const clientId = "687458829496-83t97ka8jja2dvulr4ik8un4t262a2ac.apps.googleusercontent.com";
  // console.count("Initial-Landing Render");
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [course, setCourse] = useState("");
  const [statistics, setStatistics] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [newsBlink, setNewsBlink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [registerActive, setRegisterActive] = useState(false);
  const [verifyEmailOtp, setVerifyEmailOtp] = useState(false);
  const [check, setChecked] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [otpBox, setOtpBox] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [passChange, setPassChange] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const [emailSendStatusMsg, setEmailSendStatusMsg] = useState("Please wait..");
  const [passChecker, setPassChecker] = useState(false);
  const [allTeachers, setAllTeachers] = useState([]);
  const [registerError, setRegisterError] = useState("");
  const [clinetLocation, setClinetLocation] = useState({ lat: "", lon: "" });

  const [currentAffairs, setCurrentAffairs] = useState([]);

  // const [otpVerified, setOtpVerified] = useState(false);
  // const [check, setChecked] = useState(false);
  // const [emailVerify, setEmailVerify] = useState(false);
  // const [checkPass, setCheckPass] = useState(false);
  // const [allTeachers, setAllTeachers] = useState([]);
  const [isToken, setIsToken] = useState(false);

  const [blinkFocus, setBlinkFocus] = useState(false);

  const [currentAffairsFoucus, setCurrentAffairsFoucus] = useState(false);
  // const encryption = new Encryption();

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  });

  const location = {
    address: "37, 2nd bye lane, B.R.Mazumdar Path, BAGHORBORI, PANJABARI, GUWAHATI-781037, ASSAM",
    lat: 26.137485,
    lng: -91.824573,
  };

  const componentClicked = () => console.log("clicked");

  // FIXME:
  const failureFacebook = (response) => {
    console.log(response);
  };
  const responseFacebook = (res) => {
    console.log(res.email);

    const body = {};

    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    // const code = searchParams.get("code");
    const prompt = searchParams.get("prompt");

    navigator.geolocation.getCurrentPosition((position) => {
      setClinetLocation({
        lat: position.coords.latitude.toFixed(2),
        lon: position.coords.longitude.toFixed(2),
      });
    });
    // for Facebook login
    if (prompt === null) {
      axios
        .post(baseUrl() + `/wl/extLogin`, {
          email: EncryptText(res.email),
          name: res.name.split(" ")[0],
          source: "Facebook",
          uid: res.userID,
          latitude: clinetLocation.lat,
          longitude: clinetLocation.lon,
        })
        .then((response) => {
          console.log("sucessfully", response);
          if (response.data.result.hasPerDtlsUpdated === false) {
            history("/register", {
              state: {
                profileObj: {
                  email: res.email,
                  name: res.name.split(" ")[0],
                  lastname: res.name.split(" ")[1],
                  latitude: clinetLocation.lat,
                  longitude: clinetLocation.lon,
                  uid: res.userID,
                  source: "Facebook",
                },
              },
            });
            const modal = document.querySelector(".modal-backdrop");
            modal.remove();
          } else {
            history("/studentDashboard");
            Cookies.set("token", `Bearer ${response.data.result.token}`);
            Cookies.set("email", res.email);
            Cookies.set("userId", response.data.result.userLoginResBean.userId);
          }
        })
        .catch((err) => {
          console.error("Not Login in Facebook");
        });
    }
  };
  useRemoveModal();

  const [currentAffairsFlag, setCurrentAffairsFlag] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    });
  });
  useEffect(() => {
    window.addEventListener("scroll", scrollHide);

    function scrollHide() {
      if (document.documentElement.scrollTop > 30) {
        // plane.style.opacity = "1";
        // plane.style.visibility = "visible";
        // plane.style.display = "block";
        plane.style.transform = "scale(1)";
      } else {
        // plane.style.opacity = "0";
        // plane.style.visibility = "hidden";
        // plane.style.display = "block";
        plane.style.transform = "scale(0)";
      }
    }
    const plane = document.querySelector(".plane");
    plane.addEventListener("click", (e) => {
      window.scrollTo(0, 0);
    });
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

  useEffect(() => {
    let timer;
    if (currentAffairsFoucus) {
      timer = setTimeout(() => {
        setCurrentAffairsFoucus(false);
        setCurrentAffairsFlag(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentAffairsFoucus]);

  useEffect(() => {
    let timer;
    setCurrentAffairsFoucus(false);
    if (currentAffairsFlag) {
      timer = setTimeout(() => {
        setCurrentAffairsFoucus(true);
        console.log("Foucs BLink ACtive");
      }, 5000);
    } else setCurrentAffairsFoucus(false);

    return () => {
      clearTimeout(timer);
    };
  }, [currentAffairsFlag]);

  useEffect(() => {
    fetch(`${baseUrl()}/df/findCurrentAffairs`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("findCurrentAffairs", data.result);
        if (data.status === 200) {
          setCurrentAffairsFlag(data.newsToBlink);

          setCurrentAffairs(data.result);
        }
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const carousel = document.querySelectorAll(".carousel-item")[0];
      console.log(carousel);

      carousel.classList.add("active");
    }, 1000);
  }, []);

  useEffect(() => {
    axios
      .post(
        `${baseUrl()}/df/statistics`,
        {},
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        console.log("response", response.status);
        if (response.status === 200) {
          setStatistics(response.data.Data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
    axios.get(baseUrl() + "/df/findNewsEventDtls/1").then((response) => {
      if (response.status === 200) {
        setNewsData(response.data.result);

        setNewsBlink(response.data.newsToBlink);
      }
    });
  }, []);

  useEffect(() => {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const res = searchParams.get("code");
    const prompt = searchParams.get("prompt");
    const code = decodeURIComponent(res);
    // window.history.pushState({}, document.title, "/");
    console.log(paramsString, res, prompt, code);
    // console.log(window.opener);
    // for google Auth
    if (prompt) {
      // window.top.location = "http://localhost:3000/registration/";
      // post request
      async function tokenCall() {
        try {
          const response = await axios.post(`https://accounts.google.com/o/oauth2/token`, {
            client_id: process.env.REACT_APP_CLIENT_ID,
            code: code,
            scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            redirect_uri: process.env.REACT_APP_CLIENT_URL,
            grant_type: "authorization_code",
          });
          console.log("response:");
          console.log(response.data.access_token);
          Cookies.set("google_access_token", response.data.access_token);
          window.history.pushState({}, null, "/registration");

          token();
        } catch (err) {
          console.log(err);
        }
      }
      tokenCall();
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setClinetLocation({
        lat: position.coords.latitude.toFixed(2),
        lon: position.coords.longitude.toFixed(2),
      });
    });
  }, []);

  useEffect(() => {
    const statisticsTeacher = document.querySelector(".statisticsTeacher");
    const statisticsStudent = document.querySelector(".statisticsStudent");
    const statisticsCourse = document.querySelector(".statisticsCourse");
    const statisticsMCQ = document.querySelector(".statisticsMCQ");

    animateValue(statisticsTeacher, 0, statistics?.totalTeacher, 5000);
    animateValue(statisticsStudent, 0, statistics?.totalStudent, 5000);
    animateValue(statisticsCourse, 0, statistics?.totalCourses, 5000);
    animateValue(statisticsMCQ, 0, statistics?.totalMCQ, 5000);
  }, [inView]);

  function emailValidations() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailValidation(true);
    } else {
      if (email.length !== 0) {
        alert("You have entered an invalid email address!");
      }

      setEmailValidation(false);
    }
  }

  function PasswordChecker() {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setPassChecker(true);
    } else {
      setPassChecker(false);
    }
  }

  function formValidation() {
    if (
      email.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0 &&
      verifyEmailOtp &&
      confirmPassword.length > 0 &&
      mobile.length > 0 &&
      whatsappNumber.length > 0 &&
      course &&
      passChecker &&
      password === confirmPassword
    ) {
      setRegisterActive((prev) => !prev);
      console.log(registerActive);
    } else {
      alert("Complete all the details first \n Some fields are missing");
    }
  }

  const onClose = () => {
    setVerifyOtp(false);
    setSendOtp(false);
  };

  const onRegister = () => {
    setRegisterActive(true);
    setLoading(true);
    axios
      .post(
        `${baseUrl()}/df/userRegDetails/`,
        {
          title: "Registration",
          firstName: firstName,
          lastName: lastName,
          email: EncryptText(email),
          password: EncryptText(password),
          number: EncryptText(mobile),
          whatsappNumber: EncryptText(whatsappNumber),
          course: JSON.parse(course),
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setRegisterSuccess("green");
        setRegisterError(response.data.ResultMessage);
        if (response.data.ResultCode != 200) {
          setRegisterSuccess("red");
        } else {
          setRegisterSuccess("green");
        }
        if (response.status === 200) {
          document.querySelector("#openSuccessRegister").click();
        }
        if (response.data.ResultCode === 200) {
          document.querySelector("#openSuccessRegister").click();

          document.getElementById("registerModal").classList.remove("show");
          // window.location.reload()
        } else {
          // alert(response.data.ResultMessage);
        }
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  const onRegisterClick = () => {
    setLoading(true);
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
        setLoading(false);
        if (response.status === 200) {
          console.log("items", response.data);
          setCourseDetails(response.data.Data);
          // window.location.reload()
        } else {
          setCourseDetails([]);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Please Check Details");
        setCourseDetails([]);
        setLoading(false);
      });
  };

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(baseUrl() + "/wl/loginDtls", {
        username: EncryptText(email),
        password: EncryptText(password),
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data.status);
        console.log("response", response.data.result.userLoginResBean.email);
        if (response.status == 200) {
          Cookies.set("token", `Bearer ${response.data.result.token}`);
          Cookies.set("email", response.data.result.userLoginResBean.email);
          Cookies.set("userId", response.data.result.userLoginResBean.userId);
          // alert(response.data.message);
          setLoading(false);
          // document.getElementById("loginModal").style.display = "none";
          history("/studentDashboard");
          const modal = document.querySelector(".modal-open");

          // document.querySelector("body").classList.remove("modal-open");
          // document.querySelector("body").style.overflow = "visible";
          // modal.style.display = "none";
          modal.remove();
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
        setPassword("");
        alert("Invalid login Details");
      });
  };

  const onSendOtp = (id) => {
    setOtpSent(true);
    axios
      .post(baseUrl() + `/wl/sendOTP`, {
        EmailId: EncryptText(email),
        OtpType: `${id}`,
      })
      .then((response) => {
        console.log("res", response.data.ResultCode);
        if (response.status == "200" && response.data.ResultCode == "200") {
          setSendOtp(true);
          setOtpBox(true);
        } else {
          alert(response.data.ResultMessage);
          setEmailSendStatusMsg(response.data.ResultMessage);
        }
      });
  };

  const onVerify = () => {
    setLoading(true);
    axios
      .post(baseUrl() + `/wl/verifyOTP`, {
        EmailId: EncryptText(email),
        Otp: EncryptText(otp),
      })
      .then((response) => {
        if (response.data.ResultCode === "200") {
          setLoading(false);
          setEmailVerify(true);
          setVerifyOtp(true);
          setSendOtp(false);
        } else {
          setLoading(false);
          alert(response.data.ResultMessage);
        }
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };

  const onPasswordChange = () => {
    axios
      .post(baseUrl() + `/wl/forgetPassword`, {
        EmailId: EncryptText(email),
        Password: EncryptText(password),
      })
      .then((response) => {
        if (response.data.ResultCode === "200") {
          setMessage("Your Password has changed SuccessFully!!");
          setPassChange(true);

          document.querySelector("#particular-login").click();
          setVerifyOtp(false);
          setSendOtp(false);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          alert(response.data.ResultMessage);
        }
      });
  };

  const authHandler = async () => {
    // let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    // width=500,height=600,left=500,top=500`;
    let params = "";
    let open = "_self";
    window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email&response_type=code`,
      open,
      params
    );
    // console.log(popup);

    window.onmessage = async (message) => {
      console.log("message", message);
      window.location.reload();
    };
  };

  async function token() {
    if (Cookies.get("google_access_token") != null) {
      // Cookies.set("google_access_token", response.data.access_token);
      if (Cookies.get("google_access_token")) {
        const res = await axios.get("https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names", {
          headers: {
            Authorization: `Bearer ${Cookies.get("google_access_token")}`,
          },
        });
        console.log("Login success>>");
        console.log(res);
        console.log(res.data);
        if (res.data) Cookies.set("google_access_token", null);

        onLoginSuccess(res.data);
      }
    }
  }

  // FIXME:
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res);

    const body = {
      email: res.emailAddresses[0].value,
      name: res.names[0].givenName,
      lastname: res.names[0].familyName,
      source: "Google",
      uid: res.resourceName,
      latitude: clinetLocation.lat,
      longitude: clinetLocation.lon,
    };
    // console.log(res.names[0].givenName);

    navigator.geolocation.getCurrentPosition((position) => {
      setClinetLocation({
        lat: position.coords.latitude.toFixed(2),
        lon: position.coords.longitude.toFixed(2),
      });
    });

    axios
      .post(baseUrl() + `/wl/extLogin`, {
        email: EncryptText(res.emailAddresses[0].value),
        name: res.names[0].givenName,
        source: "Google",
        uid: res.resourceName.split("/")[1],
        latitude: clinetLocation.lat,
        longitude: clinetLocation.lon,
      })
      .then((response) => {
        console.log("sucessfully  Google Response", response);
        if (response.data.result.hasPerDtlsUpdated === false) {
          history("/register", {
            state: {
              profileObj: {
                email: res.emailAddresses[0].value,
                name: res.names[0].givenName,
                lastname: res.names[0].familyName,
                latitude: clinetLocation.lat,
                longitude: clinetLocation.lon,
                uid: res.resourceName.split("/")[1],
                source: "Google",
              },
              res: res,
            },
          });
          const modal = document.querySelector(".modal-backdrop");
          modal.remove();
        } else {
          history("/studentDashboard");
          Cookies.set("token", `Bearer ${response.data.result.token}`);
          Cookies.set("email", res.emailAddresses[0].value);
          Cookies.set("userId", response.data.result.userLoginResBean.userId);
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Not Login in Google");
      });
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const handleOnlyLetters = (event, name) => {
    const result = event.target.value.replace(/[^a-z]/gi, "");

    if (name === "first") {
      setFirstName(result);
    } else if (name === "last") {
      setLastName(result);
    }
  };

  function showFaqAns(targetId) {
    const targetModal = document.getElementById(targetId);
    targetModal.style.display = "block";
  }

  function hideFaqAns(targetId) {
    const targetModal = document.getElementById(targetId);
    targetModal.style.display = "none";
  }

  return (
    <section className="container-fluid" style={{ padding: 0 }}>
      <Header profileData={profileData} newsBlink={newsBlink} blinkFocus={blinkFocus} currentAffairsFoucus={currentAffairsFoucus} currentAffairsFlag={currentAffairsFlag} />

      <div className="container">
        <br />
        <div className="row flex-lg-row-reverse align-items-center g-5 pt-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              // hero carousel
              src={carousel1}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              loading="lazy"
              width="700"
              height="500"
            />
            {/* <carousel1 /> */}
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-normal lh-1 mb-3 dark-grey ">Welcome to, </h1>
            <h3>Brahmaputra Exam Success Support Team</h3>
            <p> Click below to explore more or register yourself to be a part of BESST family. </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              {Cookies.get("token") ? (
                <>
                  <a type="button" className="btn btn-outline-secondary px-4 px-3 ml-4" href="#about">
                    Explore
                  </a>
                  <Link type="button" className="btn main-btn  px-4 px-3 ml-4" to="/studentDashboard">
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <button type="button" className="btn main-btn  px-4" data-bs-toggle="modal" data-bs-target="#registerModal" onClick={() => onRegisterClick()}>
                    Register
                  </button>
                  <a className="btn main-btn px-3 " type="button" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">
                    Existing User
                  </a>
                  <a type="button" className="btn btn-outline-secondary px-4" href="#about">
                    Explore
                  </a>
                </>
              )}
            </div>

            <br />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <span style={{ fontWeight: "700", color: "#7b1fa2", display: "none" }}>
                **NOTE: This portal is compatible with Desktops and Laptops only and can be viewed using "Desktop Site" option in mobile.
              </span>
            </div>
          </div>
        </div>
      </div>

      <button id="openSuccessRegister" style={{ display: "none" }} data-bs-toggle="modal" data-bs-target="#successRegister"></button>

      <AboutPage />

      <Services />

      <section className="container-fluid" id="news">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            {" "}
            <h4 className="my-5 underline">
              N E W S &nbsp; &nbsp;
              <span className="badge bg-danger">Latest</span>
            </h4>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ul className="p-0">
                <li className="ml-5 p-1">
                  {"Assam Higher Secondary Education Council (AHSEC) declared Higher Secondary/12th Class Result."}
                  <a href="https://resultsassam.nic.in/ahsecroll.aspx" target="_blank">
                    {" "}
                    Check here
                  </a>
                </li>
                {newsData.map((item) => (
                  <li className="ml-5 p-1" dangerouslySetInnerHTML={{ __html: item.description }}></li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <ul className="p-1">
                {newsData.map((item) => (
                  <li className="ml-5 p-1" dangerouslySetInnerHTML={{ __html: item.description }}></li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
      </section>

      <section className="container-fluid" id="current-affairs">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            <h4 className="my-5 underline nowrap">
              C U R R E N T &nbsp; &nbsp; A F F A I R S &nbsp; &nbsp;
              <span className="badge bg-danger">Latest</span>
            </h4>
          </div>
          <ul className="">
            {currentAffairs.map((item, i) => (
              <li key={i} className="ml-5 p-1">
                {/* className="d-inline-block m-2" */}
                {item.dateRangeText}{" "}
                <a href="" class="" data-bs-toggle="modal" data-bs-target={`#currentAffairs${i}`}>
                  Check here
                </a>
                {/* modal-body */}
                <div class="modal fade" id={`currentAffairs${i}`} tabindex="-1" aria-labelledby={`#currentAffairs${i}Label`} aria-hidden="true">
                  <div class="modal-dialog modal-lg modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id={`currentAffairs${i}Label`}>
                          Current Affairs from {item.dateRangeText}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div className="d-flex text-center gap-2 justify-content-evenly" style={{ flexWrap: "wrap" }}>
                          {item.affairsBeans.map((content, index) => (
                            <div key={index} className="card border" style={{ width: "350px", minHeight: "350px" }}>
                              <br />
                              <small className="main-color fw-bolder">{content.currentAffairsHead}</small> <br />
                              {/* <small>{content.title}</small> <br />
                              <p className="text-dark">{content.currentAffairsContent}</p> */}
                              <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: content.currentAffairsContent }} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div class="modal-footer"></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reviews />

      <section className="container-fluid" id="strength" ref={ref}>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            <h4 className="my-5 underline">S T R E N G T H</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              <img src={teacher} height="40px" width="40px" className="mx-auto" />
              <h5 className="mb-2 white mt-3">Total Teachers</h5>
              <h3 className="white fw-bolder statisticsTeacher">{statistics.totalTeacher}</h3>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              <img src={student} height="40px" width="40px" className="mx-auto" />
              <h5 className="mb-2 white mt-3">Total Students</h5>
              <h3 className="white fw-bolder statisticsStudent">{statistics.totalStudent}</h3>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              {/* <!-- <i className="fa-solid fa-bezier-curve fs-1 text mb-2 main-color"></i> --> */}
              <img src={courses} height="40px" width="40px" className="mx-auto" />
              <h5 className="mb-2 white mt-3">Total Subjects</h5>
              <h3 className="white fw-bolder statisticsCourse">{statistics.totalCourses}</h3>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              {/* <!-- <i className="fa-solid fa-bezier-curve fs-1 text mb-2 main-color"></i> --> */}
              <img src={mcq} height="40px" width="40px" className="mx-auto" />
              <h5 className="mb-2 white mt-3">Total MCQ's</h5>
              <h3 className="white fw-bolder statisticsMCQ">{statistics.totalMCQ}</h3>
            </div>
          </div>
        </div>
      </section>

      <Disclaimer />

      <div className="container-fluid">
        <section id="contact">
          <h4 className="my-5 underline" style={{ whiteSpace: "nowrap" }}>
            C O N T A C T &nbsp;&nbsp; U S
          </h4>
          <div className="row">
            <div className="col-md-4 col-sm-12 img-bg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.832618781456!2d91.82181131495342!3d26.13699998346788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x55c6a8e4bda24a24!2zMjbCsDA4JzEzLjIiTiA5McKwNDknMjYuNCJF!5e0!3m2!1sen!2sin!4v1656154630597!5m2!1sen!2sin"
                width="100%"
                height="100%"
              ></iframe>
            </div>

            <div className="col-md-4 col-sm-12 my-auto p-3 text-center">
              <p>
                <a style={{ color: "#2aca2a" }} title="Please click here to send whatsapp" href="https://wa.me/919365834467" target="_blank">
                  <BsWhatsapp />
                </a>{" "}
                : <span style={{ color: "#7b1fa2" }}>9365834467</span>
              </p>
              <br />
              <p>
                {" "}
                <AiOutlineMail style={{ color: "#1b85d6" }} /> : <span style={{ color: "#7b1fa2" }}>info@besst.in</span>
              </p>
              <br />
              <p>
                <a href="http://www.besst.in" style={{ color: "#7b1fa2", textDecoration: "underline" }}>
                  www.besst.in
                </a>{" "}
              </p>
              <br />
              <Link to="/feedback" style={{ color: "#7b1fa2" }}>
                Your feedback here
              </Link>
              <br />
              <br />
              <img src={besstQR} alt="" width="70" height="auto" className="d-inline-block align-text-top" />
              <br />
              <br />
              <p style={{ color: "#7b1fa2" }}>
                37, 2nd bye lane <br /> B.R.Mazumdar Path <br />
                Banghorbori, Panjabari <br /> Guwahati-781037 <br /> Assam
              </p>
            </div>
            <div className="col-md-4 col-sm-12 main-color-bg">
              <h2 className="white text-center m-3" style={{ backgroundColor: "#7B1FA2" }}>
                <span style={{ color: "white" }}>FAQ</span>
                <span style={{ color: "white", fontSize: "small" }}>S</span>
              </h2>

              <div className="row p-4">
                <a onMouseOver={() => showFaqAns("demo1")} onMouseLeave={() => hideFaqAns("demo1")} className="text-decoration-none white" style={{ color: "#decaec" }}>
                  1. Are there any free practice papers?
                </a>
                <div id="demo1" className="collapse" style={{ color: "white" }}>
                  Yes, there will be free practice papers.
                </div>
              </div>

              <div className="row p-4">
                <a onMouseOver={() => showFaqAns("demo2")} onMouseLeave={() => hideFaqAns("demo2")} className="text-decoration-none white" style={{ color: "#decaec" }}>
                  2. For which standard the courses are available?
                </a>
                <div id="demo2" className="collapse" style={{ color: "white" }}>
                  Currently, we are providing guidance for CUET (UG)2022.
                </div>
              </div>

              <div className="row p-4">
                <a onMouseOver={() => showFaqAns("demo3")} onMouseLeave={() => hideFaqAns("demo3")} className="text-decoration-none white" style={{ color: "#decaec" }}>
                  3. Do I need to subscribe?
                </a>
                <div id="demo3" className="collapse" style={{ color: "white" }}>
                  Yes, you need to subscribe for it.
                </div>
              </div>
              <div className="row p-4">
                <a
                  onMouseOver={() => showFaqAns("demo4")}
                  onMouseLeave={() => hideFaqAns("demo4")}
                  data-bs-toggle="collapse"
                  data-bs-target="#demo4"
                  className="text-decoration-none white"
                  style={{ color: "#decaec" }}
                >
                  4. How can we contact and report an error, if found?
                </a>
                <div id="demo4" className="collapse" style={{ color: "white" }}>
                  A student can contact with BESST team on given whatsapp number and also via email.
                </div>
              </div>
              <div className="row p-4">
                <a
                  onMouseOver={() => showFaqAns("demo5")}
                  onMouseLeave={() => hideFaqAns("demo5")}
                  data-bs-toggle="collapse"
                  data-bs-target="#demo5"
                  className="text-decoration-none white"
                  style={{ color: "#decaec" }}
                >
                  5. Is regional language available?
                </a>
                <div id="demo5" className="collapse" style={{ color: "white" }}>
                  Yes, regional language paper like Bengali and Assamese are available.
                </div>
              </div>

              <div className="row px-5">
                <Link to="/FAQ" type="button" className="btn  white">
                  More...
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-auto">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-at main-color"></i>
                    </span>
                  </div>
                  <input id="email" type="text" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key main-color"></i>
                    </span>
                  </div>
                  <input id="lastName" type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div
                  className="text-center"
                  style={{
                    marginTop: "-1rem",
                  }}
                >
                  <a
                    style={{
                      fontSize: "10px",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#forgotpassword"
                    href="#"
                  >
                    {/* <i className="fa-brands fa-google main-color"></i>{" "} */}
                    Forgot Password?
                  </a>
                </div>

                <div className="m-3 text-start d-flex justify-content-around">
                  {/* <span onClick={() => setIsToken(true)}> */}
                  {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    // cookiePolicy={"single_host_origin"}
                    isSignedIn={false}
                  /> */}

                  <>
                    <FacebookLogin
                      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={componentClicked}
                      callback={responseFacebook}
                      onFailure={failureFacebook}
                      icon="fa-facebook"
                      cssClass="btnFacebook"
                    />
                  </>
                  <button type="button" id="google-btn" style={{ backgroundColor: "rgba(255,255,255)", border: "0px solid " }} onClick={() => authHandler()}>
                    {/* <div className="text-start p-2">
                      <FcGoogle size={24} />{" "}
                      <span style={{ marginLeft: 10, display: "inline-block" }}>
                        Sign up with Google
                      </span>
                    </div> */}
                    <div class="google-btn">
                      <div class="google-icon-wrapper">
                        <div style={{ position: "relative", height: "100%" }}>
                          <img class="google-icon" src={google_icon} />
                        </div>
                      </div>
                    </div>
                  </button>
                  {/* </span> */}
                </div>
                <button
                  type="submit"
                  className="btn main-btn "
                  data-mdb-dismiss="modal"
                  onClick={onLogin}
                  // to="/studentDashboard"
                >
                  {loading ? "Please Wait.." : "Login"}
                </button>

                {passChange && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "green",
                      margin: "10px 0 0 0",
                    }}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="registerModalLabel">
                Dear student, &nbsp;
              </h4>{" "}
              <h4 className="modal-title main-color" id="registerModalLabel">
                Register Here
              </h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-auto">
              <form className="register-form-only">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user main-color"></i>
                    </span>
                  </div>
                  <input id="firstName" required value={firstName} type="text" className="form-control" placeholder="First Name*" onChange={(e) => handleOnlyLetters(e, "first")} />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user main-color"></i>
                    </span>
                  </div>
                  <input id="lastName" value={lastName} required type="text" className="form-control" placeholder="Last Name*" onChange={(e) => handleOnlyLetters(e, "last")} />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-at main-color"></i>
                    </span>
                  </div>
                  <input
                    id="email"
                    required
                    type="email"
                    className="form-control"
                    placeholder="Email*"
                    onChange={(e) => {
                      setEmail(e.target.value);

                      // onVerify()
                    }}
                    onBlur={() => {
                      emailValidations();
                    }}
                  />
                </div>
                {otpBox ? (
                  <OTP email={email} otpBox={otpBox} verifyEmailOtp={setVerifyEmailOtp} />
                ) : (
                  <p
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "violet",
                    }}
                  >
                    {emailValidation ? <>{otpSent ? <span id="emailSendStatusMsg"> {emailSendStatusMsg} </span> : <p onClick={() => onSendOtp("1")}>Verify Your Email</p>}</> : ""}
                  </p>
                )}
                {}
                {/* <Otp /> */}
                <div className="input-group mb-3" style={{ position: "relative" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key main-color"></i>
                    </span>
                  </div>
                  <input
                    id="Password"
                    required
                    type={isPassed ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyUp={PasswordChecker}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <div className="password-policy-tooltip">
                    <AiFillQuestionCircle className="password-policy-tooltip-icon" />
                    <div className="password-policy-tooltip-container">
                      <ul>
                        <li>Password should be 8 characters long</li>
                        <li>Password should contains a number</li>
                        <li>Password should contains a UpperCase and a lowercase character</li>
                        <li>Password should contains a Special Charater (!@#$%^&)</li>
                      </ul>
                    </div>
                  </div>

                  {isPassed ? (
                    <AiFillEyeInvisible
                      style={{
                        fontSize: "22px",
                        marginLeft: "5px",
                        marginTop: "5px",
                      }}
                      onClick={(e) => {
                        setIsPassed(false);
                      }}
                    />
                  ) : (
                    <AiFillEye
                      style={{
                        fontSize: "22px",
                        marginLeft: "5px",
                        marginTop: "5px",
                      }}
                      onClick={(e) => {
                        setIsPassed(true);
                      }}
                    />
                  )}
                </div>
                {passChecker ? "" : <p className={password.length === 0 ? "d-none" : "error-text"}>Password Doesn't satify password policy</p>}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key main-color"></i>
                    </span>
                  </div>
                  <input
                    id="confirmPassword"
                    required
                    type={isPass ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password*"
                    onPaste={(e) => e.preventDefault()}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  {isPass ? (
                    <AiFillEyeInvisible
                      style={{
                        fontSize: "22px",
                        marginLeft: "5px",
                        marginTop: "5px",
                      }}
                      onClick={(e) => {
                        setIsPass(false);
                      }}
                    />
                  ) : (
                    <AiFillEye
                      style={{
                        fontSize: "22px",
                        marginLeft: "5px",
                        marginTop: "5px",
                      }}
                      onClick={(e) => {
                        setIsPass(true);
                      }}
                    />
                  )}
                </div>
                {password !== confirmPassword && <p className="error-text">Password do not match</p>}

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-phone main-color"></i> *
                    </span>
                  </div>{" "}
                  <br />
                  <input
                    id="whatsappNumber"
                    required
                    type="number"
                    value={mobile}
                    className="form-control"
                    placeholder="Mobile Number"
                    onChange={(e) => {
                      console.log(e.target.value);

                      if (e.target.value.length == 11 || e.target.value.split("")[0] <= 5 || e.target.value.includes("+")) {
                        return false;
                      }

                      setMobile(e.target.value);
                      console.log(mobile);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => {
                      setWhatsappNumber(mobile);
                    }}
                  />
                  <label className="check-text">Same as Mobile Number</label>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-brands fa-whatsapp main-color"></i>{" "}
                    </span>
                  </div>{" "}
                  <br />
                  <input
                    id="whatsappNumber"
                    type="number"
                    className="form-control"
                    placeholder="Whatsapp Number"
                    value={whatsappNumber}
                    onChange={(e) => {
                      if (e.target.value.length == 11 || e.target.value.split("")[0] <= 5) return false;
                      setWhatsappNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <select id="streamSelect" className="form-select" aria-label="Default select example" onChange={(e) => setCourse(e.target.value)}>
                    <option selected>Select your course</option>
                    {/* {console.log("item", courseDetails)} */}
                    {courseDetails.map((item) => (
                      <option value={item.courseId}>{item.courseName}</option>
                    ))}
                  </select>
                </div>
                <div
                  className="terms"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    style={{ width: "32px" }}
                    type="checkbox"
                    checked={registerActive ? true : false}
                    onClick={(e) => {
                      formValidation();
                    }}
                  />
                  <p
                    style={{
                      fontSize: "10px",
                      whiteSpace: "nowrap",
                      marginBottom: "0",
                    }}
                  >
                    {" "}
                    I agree to the{" "}
                    <a href="https://www.besst.in/registration/documents/Terms and Conditiion BESST.pdf" target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    &{" "}
                    <a href="https://www.besst.in/registration/documents/PRIVACY POLICY BESST.pdf" target="_blank">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                {registerSuccess == "green" ? (
                  <div className="mb-3">
                    <label id="success" className="form-label noti-success">
                      <span style={{ fontWeight: "bold" }}>Congratulations! </span> <span> {registerError}</span> <span style={{ fontWeight: "bold" }}>experts.</span>
                    </label>
                  </div>
                ) : null}
                {registerSuccess == "red" ? (
                  <div className="mb-3">
                    <label id="error" className="form-label noti-error">
                      <i className="fa-solid fa-face-dizzy"></i> {registerError}
                    </label>
                  </div>
                ) : null}
                <button type="button" className="btn main-btn " disabled={registerActive ? false : true} onClick={() => onRegister()}>
                  {loading ? "Please wait..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="successRegister" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel"></h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-auto">
              <h1
                style={{
                  fontSize: "17px",
                  textAlign: "center",
                  color: "green",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Congratulations! </span>{" "}
                <span> Now, you are successfully registered. Please login and start practicing the tests created by our panel of</span>{" "}
              </h1>
              <div className="mb-3 d-flex justify-content-center" style={{ marginTop: "40px" }}>
                <button
                  className="btn main-btn "
                  data-mdb-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  // to="/studentDashboard"
                >
                  Click here to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="forgotpassword" tabindex="-1" aria-labelledby="forgotpasswordLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotpassword">
                Reset Your Password
              </h5>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onClose()}></button>
            </div>
            <div className="modal-body mx-auto">
              <form>
                {verifyOtp ? (
                  " "
                ) : (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-at main-color"></i>
                      </span>
                    </div>
                    <input id="email" type="text" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                )}

                {/* <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key main-color"></i>
                    </span>
                  </div>
                  <input
                    id="lastName"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
                {/* <div
                  className="text-center"
                  style={{
                    marginTop: "-1rem",
                  }}
                >
                  <a
                    style={{
                      fontSize: "10px",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#forgotpassword"
                    href="#"
                  >
                    {/* <i className="fa-brands fa-google main-color"></i>{" "} */}
                {/* forgotPassword? */}
                {/* </a> */}
                {/* </div> */}
                {/* <div className=" mb-3 text-center">
                  <p>or </p>
                  <a className="btn border">
                    <i className="fa-brands fa-google main-color"></i>{" "}
                    &nbsp;Gmail
                  </a>
                </div> */}

                {/* <div className="mb-3">
                  <label id="success" className="form-label noti-success">
                    <i className="fa-solid fa-face-grin-stars"></i> Request Sent
                    Successfully
                  </label>
                </div>

                <div className="mb-3">
                  <label id="error" className="form-label noti-error">
                    <i className="fa-solid fa-face-dizzy"></i> Error occured
                  </label>
                </div> */}
                {console.log(sendOtp)}

                {!verifyOtp ? (
                  sendOtp ? (
                    ""
                  ) : (
                    <div
                      // type="submit"
                      className="btn main-btn "
                      // data-mdb-dismiss={!sendOtp ?"modal" : ""}
                      onClick={() => onSendOtp("2")}
                      // to="/studentDashboard"
                    >
                      {loading ? "Please Wait.." : "Send Otp"}
                    </div>
                  )
                ) : (
                  ""
                )}
                {/* {sendOtp ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <ForgotOTP email={email} />
                  </div>
                ) : (
                  ""
                )} */}
                {sendOtp ? (
                  <div
                    className="form-group"
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "25px",
                    }}
                  >
                    <h1>Verify Your OTP</h1>
                    <p>* The OTP has been sent to your mail successfully *</p>
                    <OtpInput className="otp-input" value={otp} onChange={(otp) => setOtp(otp)} numInputs={4} separator={<span>-</span>} />
                    {loading ? (
                      "Please Wait...."
                    ) : (
                      <button className="btn main-btn" onClick={() => onVerify()}>
                        Verify
                      </button>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {verifyOtp ? (
                  <div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa-solid fa-key main-color"></i>
                        </span>
                      </div>

                      {/* DONE: validation error */}
                      <input
                        id="lastName"
                        type={isPassed ? "password" : "text"}
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={PasswordChecker}
                      />
                      <div className="password-policy-tooltip">
                        <AiFillQuestionCircle className="password-policy-tooltip-icon" />
                        <div className="password-policy-tooltip-container">
                          <ul>
                            <li>Password should be 8 characters long</li>
                            <li>Password should contains a number</li>
                            <li>Password should contains a UpperCase and a lowercase character</li>
                            <li>Password should contains a Special Charater (!@#$%^&)</li>
                          </ul>
                        </div>
                      </div>
                      {/*  */}
                      {isPassed ? (
                        <AiFillEyeInvisible
                          style={{
                            fontSize: "22px",
                            marginLeft: "5px",
                            marginTop: "5px",
                          }}
                          onClick={(e) => {
                            setIsPassed(false);
                          }}
                        />
                      ) : (
                        <AiFillEye
                          style={{
                            fontSize: "22px",
                            marginLeft: "5px",
                            marginTop: "5px",
                          }}
                          onClick={(e) => {
                            setIsPassed(true);
                          }}
                        />
                      )}
                      {/*  */}
                    </div>
                    {passChecker ? "" : <p className={password.length === 0 ? "d-none" : "error-text"}>Password Doesn't satify password policy</p>}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa-solid fa-key main-color"></i>
                        </span>
                      </div>
                      <input
                        id="lastName"
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {verifyOtp ? (
                  <div
                    // type="submit"
                    className="btn main-btn "
                    // data-mdb-dismiss={!sendOtp ?"modal" : ""}
                    onClick={() => {
                      if (password === confirmPassword) onPasswordChange();
                      else {
                        alert("confirmPassword Does't match");
                      }
                    }}
                    // to="/studentDashboard"
                  >
                    {loading ? "Please Wait.." : "Change Password"}
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade " id="newsModal" tabindex="-1" aria-labelledby="newsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newsModalLabel">
                News
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-auto">
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <a href="https://www.instagram.com/besst_is_best" className="float-insta" target="_blank">
        <i className="fa-brands fa-instagram my-float"></i>
      </a>

      <a href="https://www.youtube.com/channel/UCOWq3a0_HYLFYj7ZqWAjSeA" className="float-youtube" target="_blank">
        <i className="fa-brands fa-youtube my-float"></i>
      </a>

      <a href="https://www.facebook.com/Brahmaputra-Exam-Success-Support-Team-BESST-110677481604226/" className="float-facebook" target="_blank">
        <i className="fa-brands fa-facebook-f my-float"></i>
      </a>
      <a href="https://www.twitter.com/besst_is_best" className="float-twitter" target="_blank">
        <i className="fa-brands fa-twitter my-float"></i>
      </a>
      <button
        style={{ bottom: "245px", outline: "none", border: "none" }}
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: "Register on besst.in for CUET",
                text:
                  "\nDear friend," +
                  "\n\nBESST (http://www.besst.in) is a secure online platform dedicated to help students achieve their CUET(Common University Entrance Test) dream." +
                  "\nBESST will provide PRACTICE/MOCK tests and LIVE classes created by expert panel of teachers to help you to reach your potential to the fullest." +
                  "\nRegister now and start practicing your chosen subjects." +
                  "\n\nRegards," +
                  "\nTeam Besst," +
                  "\nWhatapp no:9365834467" +
                  "\nEmail: info@besst.in",
                url: "https://www.besst.in/" + "\n",
              })
              .then(() => console.log("Successful share"))
              .catch((error) => console.log("Error sharing", error));
          }
        }}
        className="float-twitter"
        target="_blank"
      >
        <i class="fa fa-share-alt myfloat" aria-hidden="true"></i>
      </button>
      <br />

      <div class="plane">
        <button class="scroll-btn--up">
          <class class="fas fa-location-arrow"></class>
        </button>
      </div>

      <div></div>
      <div className="termncondition">
        <a href="https://www.besst.in/registration/documents/Terms and Conditiion BESST.pdf" target="_blank">
          Terms And Conditions
        </a>

        <a href="https://www.besst.in/registration/documents/PRIVACY POLICY BESST.pdf" target="_blank">
          Privacy Policy
        </a>

        <a href="https://www.besst.in/registration/documents/Refund Policy BESST.pdf" target="_blank">
          Refund Policy
        </a>
        <a href="#" target="_blank">
          Data Sharing Policy
        </a>
      </div>

      <br />

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
        </div>
      </footer>
    </section>
  );
}

export default Landing;

{
  /* <div id="demo" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {studentSpeak.length > 0 &&
                  studentSpeak.map((items, i) => {
                    return (
                      <div className="carousel-item" key={i}>
                        <div className="card d-block card-write" key={i}>
                          <div className="card-body opct-dark" style={{ minHeight: "500px" }}>
                            <div class="row">
                              {items.map((item, i) => (
                                <div className="my-2" style={{ width: "50%", textAlign: "center" }}>
                                  <iframe
                                    src={item.videoUrl}
                                    allowfullscreen="allowfullscreen"
                                    title="YouTube video player"
                                    frameborder="2"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    //allowfullscreen
                                    style={{ width: "100%", maxWidth: "250px" }}
                                  ></iframe>
                                  <h5 className="card-title" style={{ fontSize: "1rem" }}>
                                    {item.name}
                                  </h5>
                                  <p className="card-text" style={{ fontSize: "0.8rem" }}>
                                    {item.textContent}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <button className="carousel-control-prev main-color-bg" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button className="carousel-control-next main-color-bg" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
              </button>
            </div> */
}

{
  /* <section id="teachers">
        <div className="col-md-12">
          {" "}
          <h4 className="m-5 underline">
            T E A C H E R S{" "}
            <span style={{ fontSize: "14px", marginLeft: "10px" }}>
              <Link to="/teachers">see all...</Link>
            </span>
          </h4>
        </div>
        <div>
          <Swiper
            spaceBetween={30}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              // when window width is <= 499px
              560: {
                slidesPerView: 1,
                spaceBetweenSlides: 30,
              },

              880: {
                slidesPerView: 2,
                spaceBetweenSlides: 30,
              },
              // when window width is <= 999px
              999: {
                slidesPerView: 3,
                spaceBetweenSlides: 30,
              },
              1165: {
                slidesPerView: 4,
                spaceBetweenSlides: 30,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="custom-slider"
          >
            {allTeachers?.map((teacher) => {
              return (
                <SwiperSlide>
                  <div
                    class="card  "
                    style={{ minWidth: "18rem", border: "2px solid #ebebeb" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: "150px",
                        width: "150px",
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
                          borderRadius: "50%",
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
                      <Link
                        style={{ marginLeft: "63px" }}
                        to={`/individualteacher/${teacher.mobile}`}
                        class="btn main-btn "
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section> */
}

{
  /* <section id="student">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            {" "}
            <h4 className="m-5 underline" style={{ whiteSpace: "nowrap" }}>
              T E A C H E R S
            </h4>
          </div>
          {console.log("student", studentSpeak)}
          <div className="col-md-6">
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {allTeachers?.map((item, i) => {
                  return (
                    <div
                      className="carousel-item"
                      style={{ display: "block" }}
                      key={i}
                    >
                      <div className="card d-block card-write " key={i}>
                        <div className="card-body opct-dark">
                          <div className="teacher-details-container">
                            <div className="teacher-details">
                              <h5 className="card-title">Dr. Nitin Rakesh</h5>
                              <p className="card-text">
                                nitin.rakesh@gmail.com
                              </p>
                              <p className="card-text">

                              </p>
                            </div>
                            <div className="teacher-img">
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxT4uiqxxijzAlAOfNszTkVwWbC3UZl0WiOnhHF9EQdCwjbii7PPICx8-JSPyoHe-15V4&usqp=CAU"
                                alt="teacher-img"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn border border-secondary "
                            data-bs-toggle="modal"
                            data-bs-target={"#exampleModal" + i}
                          >
                            Watch Video
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="carousel-control-prev main-color-bg"
                type="button"
                data-bs-target="#demo"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next main-color-bg"
                type="button"
                data-bs-target="#demo"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </section> */
}

{
  /* <div class="row">
        <div class="col-md-12 ">
          {" "}
          <h4 class="m-5 underline">DISCLAIMER &nbsp; &nbsp;</h4>
        </div>
        <div class="row" style="padding-left: 3%;">
          <div class="col-md-12 ">
            <div class="col-md-12 ">
              <span>
                1. All question papers will be in English other than language
                papers.
              </span>
            </div>
            <div class="col-md-12 ">
              <span>
                2. Live classes will be available only for General Test(mental
                ability,quantitative reasoning,verbal ability etc.)
              </span>
            </div>
            <div class="col-md-12 ">
              <span>3.Live classes will be in English/Hindi .</span>
            </div>
            <div class="col-md-12 ">
              <span>
                4.Students can avail 4 domain subjects ,1 language paper and the
                general tests after subscription .
              </span>
            </div>
          </div>
        </div>
      </div> */
}

// STUDENT SPEAK

// useEffect(() => {
//   axios
//     .post(
//       baseUrl() + "/df/studentSpeak",
//       //"https://betablaster.in/api/send.php?number=917027661883&type=text&message=Hello%2001%20June11%202022%20-%20Night&instance_id=62988D591CEAF&access_token=dd0bafd1205b89e235d58677cf3054ad",
//       {},
//       {
//         headers: {
//           "Acces-Control-Allow-Origin": "*",
//           Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
//           Authorization: Cookies.get("token"),
//         },
//       }
//     )
//     .then((response) => {
//       console.log("response", response.data.ResultCode);
//       if (response.status === 200) {
//         setStudentSpeak(response.data.Data);
//       }
//     });
// }, []);

// STUDENT SLIDE MODAL

/* TODO: studentSpeak */

/* MODAL BTN: REMOVE Below Block */

// {
//   studentSpeak.length > 0 &&
//     studentSpeak.map((item, i) => (
//       <div className="modal fade " id={"exampleModal" + i} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content col-md-12 col-lg-12">
//             <div className="modal-header">
//               {console.log(studentSpeak)}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   color: "#7b1fa2",
//                 }}
//               >
//                 <h5 className="modal-title" style={{ fontSize: "15px", textAlign: "center" }} id="exampleModalLabel">
//                   {item.name}
//                 </h5>
//                 <p
//                   style={{
//                     fontSize: "12px",
//                     margin: "5px",
//                     textAlign: "center",
//                   }}
//                 >
//                   {item.textContent}
//                 </p>
//               </div>

//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body mx-auto">
//               <iframe
//                 src={item.videoUrl}
//                 allowfullscreen="allowfullscreen"
//                 title="YouTube video player"
//                 frameborder="2"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 //allowfullscreen
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </div>
//     ));
// }

{
  /*  */
}

{
  /* <div className="modal fade " id="videoModalYT" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content col-md-12 col-lg-12">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Video
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-auto">
              <iframe width="420" height="315" src={studentSpeak.length > 0 && studentSpeak[0].videoUrl} frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div> */
}

// DONE: REVIEW Components

/* <section className="container-fluid" id="student">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            <h4 className="my-5 underline" style={{ whiteSpace: "nowrap" }}>
              R E V I E W S
            </h4>
          </div>
        </div>
        <div className="row container-xl mx-auto">
          <div className="col-md-12">
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
              {studentSpeak.map((item, i) => (
                <Card key={i} title={item.name} textContent={item.textContent} videoUrl={item.videoUrl} />
              ))}
            </ScrollMenu>
          </div>
        </div>
      </section> */

// DONE: ABOUT PAGE
{
  /* <section className="container-fluid" id="about">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            <h4 className="my-5 mx-0 underline">A B O U T &nbsp;&nbsp; U S</h4>
          </div>
          <div className="col-md-6 col-sm-12">
            <img src={about} className="d-block mx-lg-auto img-fluid p-5" alt="Bootstrap Themes" loading="lazy" width="700" height="500" />
          </div>
          <div className="col-md-6 col-sm-12 pt-5" style={{ padding: "30px", textAlign: "justify" }}>
            <h3 className="main-color">What is BESST?</h3>
            <h5>
              BESST (BRAHMAPUTRA EXAM SUCCESS SUPPORT TEAM) is an online educational platform consisting of experienced teachers from all over the country, helping students to have
              hands-on online tests starting with CUET (UG) 2022. It will provide mock tests/practice tests and live classes. This platform will help students to excel in
              competitive exams.
            </h5>

            <h3 className="main-color mt-5">How does BESST help students?</h3>
            <h5>
              BESST partners with teachers and faculties who have better experience of helping students to realise their full potential. It has a simulation platform wherein
              students can access notes by specialised teachers, guidance of previous year’s toppers, practice sessions, etc.{" "}
            </h5>
          </div>
        </div>
      </section> */
}
