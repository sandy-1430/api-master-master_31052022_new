import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfilePic from "../../Assets/images/profilePic.jpg";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";
// import { Buffer } from "buffer";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlinePayments } from "react-icons/md";

function Profile() {
  //#region
  let userId = Cookies.get("userId");
  const [profileData, setProfileData] = useState([]);

  const [list, setlist] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  // const [selectedCheckbox2, setSelectedCheckbox2] = useState([]);

  const [name, setName] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  const [section1, setSection1] = useState([]);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);
  const [checked, setChecked] = useState(subjects);
  const [uploadPics, setUploadPics] = useState(false);
  const [qualification, setQualification] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [school, setSchool] = useState("");
  const [address, setAddress] = useState("");
  const [isSection3, setIsSection3] = useState(false);
  // New Grade dataFields.
  const [grade, setGrade] = useState([10, 11, 12, 13]);

  const navigate = useNavigate();

  const [quizs, setQuizs] = useState([""]);
  //#endregion

  const [course1, setCourse1] = useState({
    catLevel: "section1",
    max: 1,
    topic: [
      {
        topicId: "1",
        topicName: "English",
        isSelected: false,
      },
      {
        topicId: "2",
        topicName: "Hindi",
        isSelected: false,
      },
      {
        topicId: "3",
        topicName: "Bengali",
        isSelected: false,
      },
    ],
  });
  const [course2, setCourse2] = useState({
    catLevel: "section2",
    max: 3,
    topic: [
      {
        topicId: "4",
        topicName: "math",
        isSelected: true,
      },
      {
        topicId: "5",
        topicName: "antro",
        isSelected: true,
      },
      {
        topicId: "6",
        topicName: "socio",
        isSelected: true,
      },
      {
        topicId: "10",
        topicName: "physiology",
        isSelected: false,
      },
    ],
  });
  const [course3, setCourse3] = useState({
    catLevel: "section3",
    max: 2,
    topic: [
      {
        topicId: "7",
        topicName: "Geography",
        isSelected: false,
      },
      {
        topicId: "8",
        topicName: "Civics",
        isSelected: true,
      },
      {
        topicId: "9",
        topicName: "History",
        isSelected: true,
      },
    ],
  });

  const [mainData, setMainData] = useState({});

  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState();
  // const [email, setEmail] = useState(null);

  // Email-verification
  function emailValidations(email) {
    console.log(email);

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log(true);
      setProfileData({ ...profileData, email: email });
    } else {
      alert("You have entered an invalid email address!");
      setEmail(profileData.email);
    }
  }

  //Number
  function numberValidations() {
    // console.log(number.toString().slice(0, 1));
    if (number.toString().slice(0, 1) > 5 && number.length === 10) {
      setProfileData({ ...profileData, whatsappMob: number });
    } else {
      alert("You have entered an invalid number!");
      setNumber(profileData.whatsappMob);
    }
  }

  function uploadPic() {
    setUploadPics(true);
    {
      console.log("submit list", list);
    }
    setLoading(true);
    let formData = new FormData();
    formData.append("uploadPhotoImage", profilePhoto);
    axios
      .post(
        baseUrl() + `/uploadPhoto?userName=${Cookies.get("email")}`,
        formData,
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
          setUploadPics(false);
          setImgLoad(false);
          setLoading(false);
        }
      })
      .catch((e) => {
        setUploadPics(false);
        setImgLoad(false);
        setLoading(false);
      });
  }

  function checke(id) {
    course1.topic.map((e) => {
      if (id == e.topicId) {
        return e.isSelected;
      }
    });
  }

  function courseChange(item, id) {
    // console.log(
    //   course1?.topicBeans.filter((course) => course.selection !== true)
    // );

    if (
      course1?.topicBeans.filter((course) => course.selection !== false)
        .length < course1.maxSelection
    ) {
      let temp = course1?.topicBeans.map((e) =>
        e.topicId == id ? { ...e, selection: item.target.checked } : e
      );
      setCourse1({ ...course1, topicBeans: temp });
    } else if (
      course1?.topicBeans.filter((course) => course.selection !== false)
        .length < course1.maxSelection ||
      item.target.checked == false
    ) {
      let temp = course1?.topicBeans.map((e) =>
        e.topicId == id ? { ...e, selection: item.target.checked } : e
      );
      setCourse1({ ...course1, topicBeans: temp });
    } else {
      alert(
        "Atmost one language subject can be opted from Section I (Languages)."
      );
    }
  }

  function courseChange2(item, id) {
    // console.log(
    //   course2?.topicBeans.filter((course) => course.isSelected !== true)
    // );

    if (
      course2?.topicBeans.filter((course) => course.selection !== false)
        .length < course2.maxSelection
    ) {
      let temp = course2?.topicBeans.map((e) =>
        e.topicId == id ? { ...e, selection: item.target.checked } : e
      );
      setCourse2({ ...course2, topicBeans: temp });
    } else if (
      course2?.topicBeans.filter((course) => course.selection !== false)
        .length < course2.maxSelection ||
      item.target.checked == false
    ) {
      let temp = course2?.topicBeans.map((e) =>
        e.topicId == id ? { ...e, selection: item.target.checked } : e
      );
      setCourse2({ ...course2, topicBeans: temp });
    } else {
      alert(
        "Atmost four subjects can be selected from the section II, Domain-Specific Subjects."
      );
    }
  }

  function courseChange3(item, id) {
    let temp = course3.topicBeans.map((e) => {
      console.log(e.topicId, id);
      return { ...e, selection: item.target.checked };
    });
    console.log(temp);
    setCourse3({ ...course3, topicBeans: temp });
  }

  function postCourseData() {
    fetch(`${baseUrl()}/df/saveCoursestopicWise`, {
      method: "POST",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: `${Cookies.get("token")}`,
      },
      body: JSON.stringify(mainData),
    });
  }

  useEffect(() => {
    document.body.style.overflow = "visible";
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
        // console.log(response.data.Data);
        if (response.status === 200) {
          console.log(response.data.Data);
          // setSelectedCourse(response.data.Data.courseBeans[0].topicBeans);
          // console.log(selectedCourse);
          setProfileData(response.data.Data);
          setCourseName(response.data.Data.courseBeans);
          setName(response.data.Data);
          setNumber(response.data.Data.whatsappMob);
          setQualification(response.data.Data.qualification);
          setProfileName(response.data.Data.firstName);
          setSchool(response.data.Data.schoolName);
          setAddress(response.data.Data.address);
          setCity(response.data.Data.city);
          setPin(response.data.Data.pincode);
          setEmail(response.data.Data.email);
          setProfileImg(
            baseUrl() + `/df/showProfilePic/${response.data.Data.image}`
          );
        }
      })
      .catch((e) => {
        navigate("/");
        console.log(e);
      });
  }, [loading]);

  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/coursesAndTopics",
        {
          courseId: "1",
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          //   console.log("data api" ,apiData)
          setSubjects(response.data.Data);
          console.log(subjects);
        }
      });
  }, [loading]);

  useEffect(() => {
    fetch(`${baseUrl()}/df/coursestopicWise/1/${Cookies.get("userId")}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "true",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: Cookies.get("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCourse1(data.Data.categorys[0]);
        setCourse2(data.Data.categorys[1]);
        setCourse3(data.Data.categorys[2]);
        setIsSection3(data.Data.categorys[2].topicBeans[0].selection);
        setMainData(data.Data);
      });
  }, [loading]);

  useEffect(() => {
    setMainData({ ...mainData, categorys: [course1, course2, course3] });
  }, [course1, course2, course3]);

  const handleFileInput = (e) => {
    alert("Press Ok to proceed");
    setProfilePhoto(e.target.files[0]);
    setImgLoad(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    {
      console.log("submit list", list);
    }
    setLoading(true);
    postCourseData();
    if (profilePhoto !== null) {
      let formData = new FormData();
      console.log(formData);
      formData.append("uploadPhotoImage", profilePhoto);
      axios
        .post(
          baseUrl() + `/uploadPhoto?userName=${Cookies.get("email")}`,
          formData,
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
            // setProfileImg(response.data.Data.UploadPhotoName);
            // setProfileData({
            //   ...profileData,
            //   image: response.data.Data.UploadPathUrl,
            // });
            setLoading(false);
            setImgLoad(false);
            if (list.length > 0) {
              axios
                .post(
                  baseUrl() + `/df/addUpdateCourse`,
                  {
                    userId: JSON.parse(userId),
                    emailId: Cookies.get("email"),
                    courseId: checked.courseId,
                    topicBeans: list,
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
                  if (response.status == 200) {
                    setLoading(false);
                    setImgLoad(false);
                  }
                });
            }
          }
        })
        .catch((e) => {
          alert(e);
          setLoading(false);
          setImgLoad(false);
        });
    } else if (list.length > 0) {
      console.log("checked", checked.courseId);
      axios
        .post(
          baseUrl() + `/df/addUpdateCourse`,
          {
            userId: JSON.parse(userId),
            emailId: Cookies.get("email"),
            courseId: checked.courseId ? checked.courseId : 1,
            topicBeans: list,
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
          if (response.status == 200) {
            setLoading(false);
            setImgLoad(false);
          }
        });
    } else {
      axios
        .post(baseUrl() + `/userUpdateProfileDetails`, profileData, {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setLoading(false);
            setImgLoad(false);
            if (list.length > 0) {
              axios
                .post(
                  baseUrl() + `/df/addUpdateCourse`,
                  {
                    userId: JSON.parse(userId),
                    emailId: Cookies.get("email"),
                    courseId: checked.courseId,
                    topicBeans: list,
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
                  if (response.status == 200) {
                    setLoading(false);
                    setImgLoad(false);
                  }
                });
            }
          }
        });
    }
  };

  const checkedResponse = (items, index) => {
    console.log("abcd", items);
    let app = 0;
    if (courseName.length > 0) {
      courseName[index].topicBeans.map((e2) => {
        if (items.topicId === e2.topicId) app = 1;
      });
    }
    console.log("return", app);
    if (app === 1) return true;
    else return false;
  };

  const oncheckBox = (event, selectedCard) => {
    // console.log("event", index);
    if (event === true) {
      selectedCard = {
        ...selectedCard,
        is_checked: true,
      };
      let tempUserList;
      {
        courseName.length > 0
          ? (tempUserList = [...courseName[0].topicBeans, selectedCard])
          : (tempUserList = [...list, selectedCard]);
      }
      setlist(tempUserList);
      for (let i = 0; i < checked.length; i++) {
        if (checked[i].topicId === selectedCard.topicId) {
          checked[i]["is_checked"] = event;
        }
      }
    } else if (event === false) {
      // console.log(courseName[index].topicBeans);
      // let tempUserList = []
      setlist(list.filter((item) => item.topicId !== selectedCard.topicId));

      for (let i = 0; i < checked.length; i++) {
        if (checked[i].topicId === selectedCard.topicId) {
          checked[i]["is_checked"] = event;
        }
      }
    }
    console.log("list", list);
  };

  const onSelectClick = (data, index) => {
    let courseName2 = data.topicBeans.map((item) => {
      return {
        ...item,
        is_checked: checkedResponse(item, index),
      };
    });

    setChecked(courseName2);
    for (let i = 0; i < 3; i++) {
      section1.push(courseName2[i]);
    }
    for (let i = courseName2.length - 1; i > courseName2.length - 7; i--) {
      section3.push(courseName2[i]);
    }
    for (let i = 2; i <= courseName2.length - 7; i++) {
      section2.push(courseName2[i]);
    }

    // console.log(sect)
    // setlist(courseName[index].topicBeans);
  };

  return !loading ? (
    <>
      <Header profileData={name} />
      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        <div className="row mt-4 p-2 faq-row profile-responsive">
          <div className="col-4 p-3">
            <div style={{ height: "130px", width: "140px" }} className="border">
              <p>
                <img
                  id="displayData"
                  height="130px"
                  width="140px"
                  // value={profileImg}
                  src={profileImg ? profileImg : ProfilePic}
                />
              </p>
            </div>
            <p>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileInput(e)}
              />
            </p>

            <label
              className="btn main-btn"
              for="file"
              style={{ cursor: "pointer" }}
            >
              Upload Image
            </label>
            <br />
            <br />
            {imgLoad && (
              <label onClick={() => uploadPic()} className="btn main-btn">
                {uploadPics ? "Uploading.." : "Upload Pic"}
              </label>
            )}
            <br />
            <Link
              className="btn main-btn  px-4 me-md-2"
              style={{ marginTop: "20px" }}
              to="/subscription"
            >
              <MdOutlinePayments style={{ fontSize: "25px" }} />
              <span style={{ marginLeft: "7px" }}>Subscription</span>
            </Link>

            {/* <ul className="list-group">
              <li
                className="list-group-item main-color-bg white"
                aria-current="true"
              >
                Applied Subjects
              </li>
              {profileData.courseBeans &&
                profileData.courseBeans.map((item) => (
                  <li className="list-group-item">{item.courseName}</li>
                ))}
            </ul> */}
          </div>
          <div className="col-4 p-3">
            <label>Name:</label>{" "}
            <input
              type="Text"
              className="form-control"
              id="nameProfile"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              onBlur={(e) => {
                if (
                  profileName.length > 0 &&
                  /^[a-zA-Z ]+$/.test(profileName)
                ) {
                  setProfileData({ ...profileData, firstName: profileName });
                } else {
                  alert("Please enter name");
                  setProfileName(profileData.firstName);
                }
              }}
            />
            <br />
            <label>Class:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={profileData.qualification}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  qualification: parseInt(e.target.value),
                });
              }}
            >
              {grade.length > 0
                ? grade.map((item, index) => (
                    <option value={item}>{item} th</option>
                  ))
                : ""}
            </select>
            <br />
            {/* <label>Age</label>{" "}
            <input
              type="number"
              className="form-control"
              id="ageProfile"
              value="24"
            />
            <br /> */}
            <label>WhatsApp Number:</label>{" "}
            <input
              type="text"
              className="form-control"
              id="numberProfile"
              value={number}
              onChange={(e) => {
                // setProfileData({ ...profileData, whatsappMob: e.target.value });
                setNumber(e.target.value);
              }}
              onBlur={(e) => {
                numberValidations(number);
              }}
            />
            <br />
            <label>Email:</label>{" "}
            <input
              type="text"
              className="form-control"
              id="nameProfile"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // setProfileData({ ...profileData, email: e.target.value });
              }}
              onBlur={() => {
                emailValidations(email);
              }}
            />
            <br />
            <label>City:</label>{" "}
            <input
              type="text"
              className="form-control"
              id="CityName"
              value={city}
              onChange={(e) => {
                // setProfileData({ ...profileData, city: e.target.value });
                setCity(e.target.value);
              }}
              onBlur={(e) => {
                const regex = "^[a-zA-Z]+$";
                if (city.length > 0 && city.match(regex)) {
                  setProfileData({ ...profileData, city: city });
                } else {
                  alert("Please enter city");
                  setCity(profileData.city);
                }
              }}
            />
            <br />
            <label>Pincode:</label>{" "}
            <input
              type="text"
              className="form-control"
              id="pin"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
              }}
              onBlur={(e) => {
                if (pin.toString().length === 6) {
                  setProfileData({ ...profileData, pincode: pin });
                } else {
                  alert("Please enter Pin Code");
                  setPin(profileData.pincode);
                }
              }}
            />
            <br />
          </div>

          <div className="col-4 p-3" style={{ maxWidth: "500px" }}>
            <label>School Name:</label>{" "}
            <input
              type="text"
              className="form-control"
              id="schoolProfile"
              value={school}
              onChange={(e) => {
                setSchool(e.target.value);
              }}
              onBlur={(e) => {
                const regex = "[a-zA-Z&,-]+$";
                if (school.length > 0 && school.match(regex)) {
                  setProfileData({ ...profileData, schoolName: school });
                } else {
                  alert("Please enter School Name");
                  setSchool(profileData.schoolName);
                }
              }}
            />
            <br />
            <label>Address:</label>{" "}
            <textarea
              type="Text"
              rows="4"
              cols="50"
              className="form-control"
              id="addressProfile"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={(e) => {
                if (address.length > 0) {
                  setProfileData({ ...profileData, address: address });
                } else {
                  alert("Please enter Address");
                  setAddress(profileData.address);
                }
              }}
            />
            <br />
            <label className="p-2">Course Name:</label>
            {subjects.length > 0
              ? subjects.map((items, index) => (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={() => {
                      onSelectClick(items, index);
                    }}
                  >
                    <option selected value={items.courseId}>
                      {items.courseName}
                    </option>
                  </select>
                ))
              : ""}
            <br />
            <label className="p-2">Available Subjects:</label>
            {course1 && (
              <>
                <p style={{ fontSize: "15px", color: "#ba00ba" }}>
                  {course1.catlevel}
                </p>
                {course1?.topicBeans?.map((beans) => {
                  return (
                    <div
                      key={beans.topicId}
                      style={{
                        display: "flex",
                        alignItems: "Center",
                        marginBottom: "10px",
                        justifyContent: "space-between",
                      }}
                      className="form-check form-profile"
                    >
                      <label className="form-check-label">
                        {beans.topicName}
                      </label>
                      {/* {console.log(course1.isSelected)} */}

                      <input
                        id="section1"
                        onChange={(e) => {
                          console.log(e);
                          courseChange(e, beans.topicId);
                        }}
                        checked={beans.selection || false}
                        // checked={course1.topic[beans.topicId].isSelected}
                        // disabled={}

                        value={beans.topicId}
                        style={{ width: "20%" }}
                        type="checkbox"
                      />
                    </div>
                  );
                })}
              </>
            )}
            {console.log(mainData)}
            {course2 && (
              <>
                <p style={{ fontSize: "15px", color: "#ba00ba" }}>
                  {course2.catlevel}
                </p>
                {course2?.topicBeans?.map((beans) => {
                  return (
                    <div
                      key={beans.topicId}
                      style={{
                        display: "flex",
                        alignItems: "Center",
                        marginBottom: "10px",
                        justifyContent: "space-between",
                        alignItems: "Center",
                      }}
                      className="form-check form-profile "
                    >
                      <label className="form-check-label">
                        {beans.topicName}
                      </label>
                      {/* {console.log(course1.isSelected)} */}

                      <input
                        id="section1"
                        onChange={(e) => {
                          console.log(e);
                          courseChange2(e, beans.topicId);
                        }}
                        checked={beans.selection || false}
                        // checked={course1.topic[beans.topicId].isSelected}
                        // disabled={}

                        value={beans.topicId}
                        style={{ width: "20%" }}
                        type="checkbox"
                      />
                    </div>
                  );
                })}
              </>
            )}
            {/* TODO: only select onces */}
            {course3 && (
              <>
                {/* <p style={{ fontSize: "15px", color: "#ba00ba" }}>
                  {course3.catlevel}
                </p> */}
                <p
                  style={{
                    fontSize: "15px",
                    color: "#ba00ba",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px 20px",
                  }}
                >
                  <span> {course3.catlevel}</span>{" "}
                  <input
                    style={{ width: "15px" }}
                    type="checkbox"
                    onChange={(e) => {
                      console.log(e);
                      setIsSection3(!isSection3);
                      courseChange3(e, course3.topicBeans[0].topicId);
                    }}
                    checked={isSection3}
                  />
                </p>

                {course3?.topicBeans?.map((beans) => {
                  return (
                    <div
                      key={beans.topicId}
                      style={{
                        display: "flex",
                        alignItems: "Center",
                        marginBottom: "10px",
                        justifyContent: "space-between",
                      }}
                      className="form-check form-profile"
                    >
                      <label className="form-check-label">
                        {beans.topicName}
                      </label>
                      {/* {console.log(course1.isSelected)} */}

                      <input
                        id="section1"
                        onChange={(e) => {
                          console.log("hello");
                          console.log(e);
                          courseChange3(e, beans.topicId);
                        }}
                        disabled="disabled"
                        checked={isSection3}
                        // disabled={}

                        // value={beans.topicId}
                        style={{ width: "20%" }}
                        type="checkbox"
                      />
                    </div>
                  );
                })}
              </>
            )}
            <button
              className="btn main-btn float-end "
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
              onClick={(e) => onSubmit(e)}
            >
              {loading ? "Please wait.. " : "Submit"}
            </button>
          </div>
        </div>
      </div>
      <br />

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
                Success!
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
                <h1 style={{ fontSize: "20px" }}>Your Profile is updated!</h1>

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
                <div className="mb-3 d-flex justify-content-center"></div>
                <Link
                  className="btn main-btn "
                  data-mdb-dismiss="modal"
                  to="/studentDashboard"
                  // to="/studentDashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="btn main-btn "
                  data-mdb-dismiss="modal"
                  to="/studentProfile"
                  style={{ marginLeft: "50px" }}
                  // to="/studentDashboard"
                >
                  Stay
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST (Brahmaputra Exam Success Support Team)
          </span>
        </div>
      </footer>
    </>
  ) : (
    ""
  );
}

export default Profile;
