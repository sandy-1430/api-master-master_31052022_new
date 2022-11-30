import axios from "axios";
import Cookies from "js-cookie";
import React, { memo, useEffect, useState, useCallback } from "react";
import Carousel from "react-elastic-carousel";
import baseUrl from "../../../Components/baseUrl";
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./courseUpdate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EncryptText } from "../../../Components/Encrypt/CryptoEncryption";
import { Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import "swiper/css/navigation";
import FacebookLogin from "react-facebook-login";
import google_icon from "../../../Assets/images/Google_Logo.svg";

// Import Swiper styles
import "swiper/css";

import Slider from "react-slick";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import useRemoveModal from "../../../Components/useRemoveModal";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { gapi } from "gapi-script";
import OtpInput from "react-otp-input";
import OTP from "../../../Components/OTP";
// import "slick-carousel/slick/slick.css";
const styles = {
  container: { paddingTop: "6.25rem", paddingBottom: "6.25rem" },
  //   video: { width: "100%", height: "100%" },
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1320, itemsToShow: 2 },
];

// const items = [1, 2, 3, 4, 5, 6];

const CourseUpdate = () => {
  const [courseUpdate, setCourseUpdate] = useState([]);

  const [slideIndex, setSlideIndex] = useState(0);
  const clientId =
    "687458829496-83t97ka8jja2dvulr4ik8un4t262a2ac.apps.googleusercontent.com";
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
  const [isToken, setIsToken] = useState(false);
  // const [currentAffairs, setCurrentAffairs] = useState(fetchCurrentAffairs);
  const [blinkFocus, setBlinkFocus] = useState(false);

  // const [currentAffairsFoucus, setCurrentAffairsFoucus] = useState(false);
  // const encryption = new Encryption();

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  });

  const location = {
    address:
      "37, 2nd bye lane, B.R.Mazumdar Path, BAGHORBORI, PANJABARI, GUWAHATI-781037, ASSAM",
    lat: 26.137485,
    lng: -91.824573,
  };

  const componentClicked = () => console.log("clicked");

  // FIXME:
  const failureFacebook = (response) => {
    console.log(response);
  };
  const handleOnlyLetters = (event, name) => {
    const result = event.target.value.replace(/[^a-z]/gi, "");

    if (name === "first") {
      setFirstName(result);
    } else if (name === "last") {
      setLastName(result);
    }
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
          email: EncryptText (res.email),
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

  // const [currentAffairsFlag, setCurrentAffairsFlag] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    });
  });

  useEffect(() => {
    setTimeout(() => {
      const carousel = document.querySelectorAll(".carousel-item")[0];
      console.log(carousel);

      carousel?.classList.add("active");
    }, 1000);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  useEffect(() => {
    onRegisterClick();
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
          const response = await axios.post(
            `https://accounts.google.com/o/oauth2/token`,
            {
              client_id: process.env.REACT_APP_CLIENT_ID,
              code: code,
              scope:
                "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
              client_secret: process.env.REACT_APP_CLIENT_SECRET,
              redirect_uri: process.env.REACT_APP_CLIENT_URL,
              grant_type: "authorization_code",
            }
          );
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
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
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
            "Access-Control-Allow-Origin": "*",
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

  const onRegisterClick = useCallback(() => {
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
  }, []);

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
        const res = await axios.get(
          "https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("google_access_token")}`,
            },
          }
        );
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
  useEffect(() => {
    if (slideIndex > courseUpdate?.length - 1) {
      setSlideIndex(0);
      console.log(slideIndex);
    }
  }, [slideIndex]);

  function SampleNextArrow({ onClick }) {
    return (
      <div className="arrow arrow-right bg-white" onClick={onClick}>
        <GoChevronRight size={24} />
      </div>
    );
  }

  function SamplePrevArrow({ onClick }) {
    return (
      <div className="arrow arrow-left bg-white" onClick={onClick}>
        <GoChevronLeft size={24} />
      </div>
    );
  }
  function EmptyArrow({ onClick }) {
    return <div></div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 0,
    beforeChange: (current, next) => setSlideIndex(next),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // centerMode: true,
    // appendDots: (dots) => (
    //   <div>
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (current, next) => <div className={current === slideIndex ? "dot dot-active" : "dot"}></div>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchStudentSpeak = async () => {
      try {
        const config = {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
        };

        const { data } = await axios.get(
          `${baseUrl()}/df/coursesExplore`,
          {},
          { headers: config }
        );
        // if (status === 200) setCourseUpdate(data.Data);
        // const temp = [{ courseHead: "", courseSubHead: "", impDateArr: [], impUpdateArr: [], currentAffair: [], reviews: [], courseDetails: "" }];
        setCourseUpdate(data.Data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentSpeak();
  }, []);

  return (
    <div className="container-fluid bg-light" style={styles.container}>
      <div className="">
        <div className="">
          <h1>Courses</h1>
        </div>

        <div className="my-5">
          {/* <Slider {...settings}> */}
          <Swiper
            spaceBetween={30}
            loop={true}
            loopFillGroupWithBlank={true}
            longSwipes={false}
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
                slidesPerView: 2,
                spaceBetweenSlides: 30,
              },
              1165: {
                slidesPerView: 2,
                spaceBetweenSlides: 30,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            onSlideChange={() => {
              setSlideIndex(slideIndex + 1);
            }}
            onSwiper={(swiper) => console.log(swiper)}
            className="custom-slider"
          >
            {courseUpdate.map((item, i) => (
              <SwiperSlide>
                <CourseActive key={i} {...{ item, i, slideIndex }} />
              </SwiperSlide>
            ))}
            <div></div>
          </Swiper>
          {/* </Slider> */}
        </div>
      </div>
      <div
        className="modal fade"
        id="loginModal"
        tabindex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-at main-color"></i>
                    </span>
                  </div>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

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
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
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

                <div
                  className="text-center"
                  style={{
                    marginTop: "3px",
                  }}
                >
                  <a
                    style={{
                      fontSize: "10px",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                    href="#"
                    onClick={() => onRegisterClick()}
                  >
                    {/* <i className="fa-brands fa-google main-color"></i>{" "} */}
                    Not registered? Register Here...
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
                  <button
                    type="button"
                    id="google-btn"
                    style={{
                      backgroundColor: "rgba(255,255,255)",
                      border: "0px solid ",
                    }}
                    onClick={() => authHandler()}
                  >
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
      <div
        className="modal fade"
        id="registerModal"
        tabindex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="registerModalLabel">
                Dear student, &nbsp;
              </h4>{" "}
              <h4 className="modal-title main-color" id="registerModalLabel">
                Register Here
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <form className="register-form-only">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user main-color"></i>
                    </span>
                  </div>
                  <input
                    id="firstName"
                    required
                    value={firstName}
                    type="text"
                    className="form-control"
                    placeholder="First Name*"
                    onChange={(e) => handleOnlyLetters(e, "first")}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user main-color"></i>
                    </span>
                  </div>
                  <input
                    id="lastName"
                    value={lastName}
                    required
                    type="text"
                    className="form-control"
                    placeholder="Last Name*"
                    onChange={(e) => handleOnlyLetters(e, "last")}
                  />
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
                  <OTP
                    email={email}
                    otpBox={otpBox}
                    verifyEmailOtp={setVerifyEmailOtp}
                  />
                ) : (
                  <p
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "violet",
                    }}
                  >
                    {emailValidation ? (
                      <>
                        {otpSent ? (
                          <span id="emailSendStatusMsg">
                            {" "}
                            {emailSendStatusMsg}{" "}
                          </span>
                        ) : (
                          <p onClick={() => onSendOtp("1")}>
                            Verify Your Email
                          </p>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                )}
                {}
                {/* <Otp /> */}
                <div
                  className="input-group mb-3"
                  style={{ position: "relative" }}
                >
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
                        <li>
                          Password should contains a UpperCase and a lowercase
                          character
                        </li>
                        <li>
                          Password should contains a Special Charater (!@#$%^&)
                        </li>
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
                {passChecker ? (
                  ""
                ) : (
                  <p
                    className={password.length === 0 ? "d-none" : "error-text"}
                  >
                    Password Doesn't satify password policy
                  </p>
                )}
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
                {password !== confirmPassword && (
                  <p className="error-text">Password do not match</p>
                )}

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

                      if (
                        e.target.value.length == 11 ||
                        e.target.value.split("")[0] <= 5 ||
                        e.target.value.includes("+")
                      ) {
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
                      if (
                        e.target.value.length == 11 ||
                        e.target.value.split("")[0] <= 5
                      )
                        return false;
                      setWhatsappNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <select
                    id="streamSelect"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setCourse(e.target.value)}
                  >
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
                    <a
                      href="https://www.besst.in/registration/documents/Terms and Conditiion BESST.pdf"
                      target="_blank"
                    >
                      Terms and Conditions
                    </a>{" "}
                    &{" "}
                    <a
                      href="https://www.besst.in/registration/documents/PRIVACY POLICY BESST.pdf"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
                {registerSuccess == "green" ? (
                  <div className="mb-3">
                    <label id="success" className="form-label noti-success">
                      <span style={{ fontWeight: "bold" }}>
                        Congratulations!{" "}
                      </span>{" "}
                      <span> {registerError}</span>{" "}
                      <span style={{ fontWeight: "bold" }}>experts.</span>
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
                <button
                  type="button"
                  className="btn main-btn "
                  disabled={registerActive ? false : true}
                  onClick={() => onRegister()}
                >
                  {loading ? "Please wait..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="successRegister"
        tabindex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                <span>
                  {" "}
                  Now, you are successfully registered. Please login and start
                  practicing the tests created by our panel of
                </span>{" "}
              </h1>
              <div
                className="mb-3 d-flex justify-content-center"
                style={{ marginTop: "40px" }}
              >
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
      <div
        className="modal fade"
        id="forgotpassword"
        tabindex="-1"
        aria-labelledby="forgotpasswordLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotpassword">
                Reset Your Password
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onClose()}
              ></button>
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
                    <input
                      id="email"
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                    <OtpInput
                      className="otp-input"
                      value={otp}
                      onChange={(otp) => setOtp(otp)}
                      numInputs={4}
                      separator={<span>-</span>}
                    />
                    {loading ? (
                      "Please Wait...."
                    ) : (
                      <button
                        className="btn main-btn"
                        onClick={() => onVerify()}
                      >
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
                            <li>
                              Password should contains a UpperCase and a
                              lowercase character
                            </li>
                            <li>
                              Password should contains a Special Charater
                              (!@#$%^&)
                            </li>
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
                    {passChecker ? (
                      ""
                    ) : (
                      <p
                        className={
                          password.length === 0 ? "d-none" : "error-text"
                        }
                      >
                        Password Doesn't satify password policy
                      </p>
                    )}
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
    </div>
  );
};

export default memo(CourseUpdate);

function CourseActive({ item, i, slideIndex }) {
  return (
    <div
      className={
        i === slideIndex
          ? "slide slide-active p-3 overflow-hidden"
          : "slide  p-3  overflow-hidden bg-white"
      }
    >
      {console.log(i, slideIndex)}
      <div className={"d-flex"}>
        <>
          <div className="w-75">
            <h5>{item.courseHead}</h5>
            <span>{item.courseSubHead}</span>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              suscipit consequuntur blanditiis.
            </p> */}
          </div>
          <div className="w-25 text-center">
            {Cookies.get("token") ? (
              <Link
                type="button"
                className={"btn main-btn"}
                to="/studentDashboard"
              >
                Enroll For Free
              </Link>
            ) : (
              <button
                type="button"
                className={"btn main-btn"}
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
            // ={() => onRegisterClick()}
              >
                Enroll For Free
              </button>
            )}
          </div>
        </>
      </div>
      <div className="fw-bolder ">
        {/*  */}
        <ul class="nav nav-tabs flex-nowrap" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="course-tab"
              data-bs-toggle="tab"
              data-bs-target={"#course-section" + i}
              type="button"
              role="tab"
              aria-controls={"course-section" + i}
              aria-selected="true"
              onClick={() => console.log("course-secton", i)}
            >
              Course Details
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="date-tab"
              data-bs-toggle="tab"
              data-bs-target={"#date-section" + i}
              type="button"
              role="tab"
              aria-controls={"date-section" + i}
              aria-selected="false"
            >
              Dates
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="update-tab"
              data-bs-toggle="tab"
              data-bs-target={"#update-section" + i}
              type="button"
              role="tab"
              aria-controls={"update-section" + i}
              aria-selected="false"
            >
              Update
            </button>
          </li>
          {/* <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="current-tab"
              data-bs-toggle="tab"
              data-bs-target={"#current-section" + i}
              type="button"
              role="tab"
              aria-controls={"current-section" + i}
              aria-selected="false"
            >
              Current Affairs
            </button>
          </li> */}
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="review-tab"
              data-bs-toggle="tab"
              data-bs-target={"#review-section" + i}
              type="button"
              role="tab"
              aria-controls={"review-section" + i}
              aria-selected="false"
            >
              Reviews
            </button>
          </li>
        </ul>
        <div
          class="tab-content border p-3  bg-white"
          id="myTabContent"
          style={{ height: "30vh", overflowY: "scroll" }}
        >
          <div
            class="tab-pane fade show active"
            id={"course-section" + i}
            role="tabpanel"
            aria-labelledby={"course-section" + i}
          >
            {item?.courseDetails}
          </div>
          <div
            class="tab-pane fade"
            id={"date-section" + i}
            role="tabpanel"
            aria-labelledby={"date-section" + i}
          >
            {item?.impDateArr.map((date, idx) => (
              <div
                key={idx}
                className="p-2 border d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6>{date.detailsHead}</h6>
                  <p className="fs-6">{date.detailsHeadDescription}</p>
                </div>
                <div>
                  <a href={date.linksHtmlContent} target="_blank">
                    click here
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div
            class="tab-pane fade"
            id={"update-section" + i}
            role="tabpanel"
            aria-labelledby={"update-section" + i}
          >
            {item?.impUpdateArr.map((date, idx) => (
              <div
                key={idx}
                className="p-2 border d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6>{date.detailsHead}</h6>
                  <p className="fs-6">{date.detailsHeadDescription}</p>
                </div>
                <div>
                  <a href={date.linksHtmlContent} target="_blank">
                    click here
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div
            class="tab-pane fade"
            id={"current-section" + i}
            role="tabpanel"
            aria-labelledby={"current-section" + i}
          ></div>
          <div
            class="tab-pane fade"
            id={"review-section" + i}
            role="tabpanel"
            aria-labelledby={"review-section" + i}
          >
            {item?.reviews.map((date, idx) => (
              <div
                key={idx}
                className="p-2 border d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6>{date.detailsHead}</h6>
                  <p className="fs-6">{date.detailsHeadDescription}</p>
                </div>
                <div>
                  <a href={date.linksHtmlContent} target="_blank">
                    click here
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
