/* eslint-disable */
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import baseUrl from "../../Components/baseUrl";

import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function CourseAdd(props) {
  const { subjects, setSubjects, mainData, setMainData } = props;

  // Selectecd Course Id
  const [courseId, setCourseId] = useState(null);
  // ALL Subject Data according to Course
  // const [subjects, setSubjects] = useState([]);
  // Course Category
  const [subjectCategory, setSubjectCategory] = useState([]);
  // Indiviual Course DataFeilds
  const [subjectData, setSubjectData] = useState([]);

  // TODO: POST request.
  const [subjectsSelect, setSubjectsSelect] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(baseUrl() + "/df/coursestopicWise/", {
  //       headers: {
  //         "Acces-Control-Allow-Origin": "*",
  //         Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
  //         Authorization: Cookies.get("token"),
  //       },
  //     })
  //     .then((res) => {
  //       setSubjects(res.data.Data);
  //     })
  //     .catch((err) => console.warn(err));
  // }, []);

  useEffect(() => {
    const data = subjects.filter((item) => item.courseId === courseId);
    setSubjectData(data);
    setSubjectCategory(data[0]?.categorys || []); //data store in array
    setSubjectsSelect(data[0]?.categorys || []); // Upadte Section data
    console.log("subjectData", data);
    // console.log("SubjectCategory", data[0]?.categorys || []);
  }, [courseId, subjects]);
  // useEffect(()=>{},[setSubjectsSelect])
  // setMainData((prev) => ({ ...prev, categorys: subjectsSelect }));

  useEffect(() => {
    setMainData((prev) => ({ ...prev, categorys: subjectsSelect }));
  }, [subjectsSelect, setSubjectsSelect]);

  function postCourseData() {
    console.log(mainData);
    axios
      .post(baseUrl() + "/df/saveCoursestopicWise", mainData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
        },
      })
      .then((e) => {
        console.log(e);
        window.location.reload();
      });

    // fetch(`${baseUrl()}/df/saveCoursestopicWise`, {
    //   method: "POST",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //     Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
    //     Authorization: `${Cookies.get("token")}`,
    //   },
    //   body: JSON.stringify(),
    // }).then((res) => console.log(res));
  }

  return (
    <>
      <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="addCourse" tabindex="-1" aria-labelledby="addCourseLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addCourseLabel">
                Select Course
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setCourseId(null)}></button>
            </div>
            <div class="modal-body">
              <div style={{ overflowX: "scroll", whiteSpace: "nowrap", padding: 10 }}>
                <div class="" style={{ display: "flex", gap: 20 }}>
                  {subjects.length > 0
                    ? subjects.map((subject, index) => {
                        return (
                          <div
                            style={{
                              borderColor: courseId === subject.courseId ? "#009B33" : "black",
                              color: courseId === subject.courseId ? "#009B33" : "black",
                              borderWidth: "3px",
                              borderStyle: "solid",
                              padding: "20px",
                              borderRadius: "5px",
                              position: "relative",
                            }}
                            onClick={() => (courseId === null ? setCourseId(subject.courseId) : "")}
                            key={index}
                          >
                            <IoCheckmarkDoneCircle
                              size={30}
                              style={{
                                display: courseId === subject.courseId ? "block" : "none",
                                background: "white",
                                position: "absolute",
                                top: 0,
                                right: 0,
                                transform: "translate(50%, -50%)",
                              }}
                            />
                            <h5 className="m-0">{subject.courseName.split("(")[1].substring(0, subject.courseName.split("(")[1].length - 1)}</h5>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
              <hr />
              {/* DONE: Subject Selection */}
              <div>
                <div>
                  <label className="p-2">{subjectData[0]?.courseName || "Select the Available Cousers"}</label>

                  {subjectData.length !== 0 &&
                    subjectsSelect.map((list, index) => <CoursesList list={list} id={index} key={index} subjectsSelect={subjectsSelect} setSubjectsSelect={setSubjectsSelect} />)}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" disabled={!courseId} onClick={() => setCourseId(null)}>
                Unenroll
              </button>
              <button
                type="button"
                class="btn main-btn"
                onClick={(_e) => {
                  // TODO: category in []; --> POST
                  // onSubmit(e);
                  postCourseData();
                  // const modal = document.querySelector(".modal-backdrop");
                  // if (modal) modal.remove();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CoursesList({ list, setSubjectsSelect, subjectsSelect, id }) {
  // const [course, setCourse] = useState({});
  // const [subjectSelect, setSubjectSelect] = useState(subjectsSelect);
  // useEffect(() => {
  //   // setCourse(list);
  //   // console.log("course", subjectsSelect, id);
  //   return () => {
  //     console.log("unmount");
  //   };
  // }, []);

  return (
    <>
      {/* <button>CLICK</button> */}

      <p style={{ fontSize: "15px", color: "#ba00ba" }}>{list.catlevel}</p>

      {list?.topicBeans?.map((beans, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "Center",
              marginBottom: "10px",
              justifyContent: "space-between",
            }}
            className="form-check form-profile"
          >
            <label className="form-check-label">{beans.topicName}</label>
            {/* {console.log(course1.isSelected)} */}

            <input
              id="section1"
              onChange={(e) => {
                // console.log(id);
                // console.log(subjectsSelect[id]);
                // DONE: SELECT DATA STORE HERE.

                courseChange(e, beans.topicId, subjectsSelect[id], id, subjectsSelect, setSubjectsSelect);
              }}
              defaultChecked={beans.selection || false}
              // defaultValue={beans.topicId}
              // disabled="true"
              style={{ width: "20%" }}
              type="checkbox"
            />
          </div>
        );
      })}
    </>
  );
}

function courseChange(_item, _id, _selectedCourseDetails, subjectIndex, subjectsSelect, setSubjectsSelect) {
  console.log(_selectedCourseDetails?.topicBeans.filter((course) => course.selection !== true));
  console.log("subjectIndex: " + subjectIndex);
  if (_selectedCourseDetails?.topicBeans.filter((course) => course.selection !== false).length < _selectedCourseDetails.maxSelection) {
    let temp = _selectedCourseDetails?.topicBeans.map((e) => (e.topicId == _id ? { ...e, selection: _item.target.checked } : e));

    // console.log("temp", temp);
    /**
     *  updating Object type in react refer to
     *  https://bobbyhadz.com/blog/react-update-object-in-array#:~:text=To%20update%20an%20object%20in,all%20other%20objects%20as%20is.
     */
    const updateData = subjectsSelect.map((obj, index) => {
      if (index == subjectIndex) {
        return { ...obj, topicBeans: temp };
      }
      return obj;
    });

    setSubjectsSelect(updateData);
  } else if (_selectedCourseDetails?.topicBeans.filter((course) => course.selection !== false).length < _selectedCourseDetails.maxSelection || _item.target.checked == false) {
    let temp = _selectedCourseDetails?.topicBeans.map((e) => (e.topicId == _id ? { ...e, selection: _item.target.checked } : e));

    // console.log(temp);
    /**
     *  updating Object type in react refer to
     *  https://bobbyhadz.com/blog/react-update-object-in-array#:~:text=To%20update%20an%20object%20in,all%20other%20objects%20as%20is.
     */
    const updateData = subjectsSelect.map((obj, index) => {
      if (index == subjectIndex) {
        return { ...obj, topicBeans: temp };
      }
      return obj;
    });
    setSubjectsSelect(updateData);
  } else {
    alert("Atmost one language subject can be opted from Section I (Languages).");
  }

  // setMainData((prev) => ({ ...prev, categorys: subjectsSelect }));
}
//
/* {subjectData.length !== 0 && (
                    <CousersList1
                      course1={course1}
                      course2={course2}
                      course3={course3}
                      courseChange={courseChange}
                      courseChange2={courseChange2}
                      courseChange3={courseChange3}
                      setIsSection3={setIsSection3}
                      isSection3={isSection3}
                    />
                  )} */

//

// function onChange(list) {
//   console.log("Press", list);
// }

// function CousersList1({ course1, onSubmit, course2, course3, subjects, courseChange, courseChange2, courseChange3, setIsSection3, isSection3 }) {
//   return (
//     <>
//       {course1 && (
//         <>
//           <p style={{ fontSize: "15px", color: "#ba00ba" }}>{course1.catlevel}</p>
//           {course1?.topicBeans?.map((beans) => {
//             return (
//               <div
//                 key={beans.topicId}
//                 style={{
//                   display: "flex",
//                   alignItems: "Center",
//                   marginBottom: "10px",
//                   justifyContent: "space-between",
//                 }}
//                 className="form-check form-profile"
//               >
//                 <label className="form-check-label">{beans.topicName}</label>
//                 {/* {console.log(course1.isSelected)} */}

//                 <input
//                   id="section1"
//                   onChange={(e) => {
//                     console.log(e);
//                     courseChange(e, beans.topicId);
//                   }}
//                   checked={beans.selection || false}
//                   // checked={course1.topic[beans.topicId].isSelected}
//                   // disabled={}

//                   value={beans.topicId}
//                   style={{ width: "20%" }}
//                   type="checkbox"
//                 />
//               </div>
//             );
//           })}
//         </>
//       )}
//       {/* {console.log(mainData)} */}
//       {course2 && (
//         <>
//           <p style={{ fontSize: "15px", color: "#ba00ba" }}>{course2.catlevel}</p>
//           {course2?.topicBeans?.map((beans) => {
//             return (
//               <div
//                 key={beans.topicId}
//                 style={{
//                   display: "flex",
//                   alignItems: "Center",
//                   marginBottom: "10px",
//                   justifyContent: "space-between",
//                 }}
//                 className="form-check form-profile "
//               >
//                 <label className="form-check-label">{beans.topicName}</label>
//                 {/* {console.log(course1.isSelected)} */}

//                 <input
//                   id="section1"
//                   onChange={(e) => {
//                     console.log(e);
//                     courseChange2(e, beans.topicId);
//                   }}
//                   checked={beans.selection || false}
//                   // checked={course1.topic[beans.topicId].isSelected}
//                   // disabled={}

//                   value={beans.topicId}
//                   style={{ width: "20%" }}
//                   type="checkbox"
//                 />
//               </div>
//             );
//           })}
//         </>
//       )}

//       {course3 && (
//         <>
//           <p
//             style={{
//               fontSize: "15px",
//               color: "#ba00ba",
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "0px 20px",
//             }}
//           >
//             <span> {course3.catlevel}</span>{" "}
//             <input
//               style={{ width: "15px" }}
//               type="checkbox"
//               onChange={(e) => {
//                 console.log(e);
//                 setIsSection3(!isSection3);
//                 courseChange3(e, course3.topicBeans[0].topicId);
//               }}
//               checked={isSection3}
//             />
//           </p>

//           {course3?.topicBeans?.map((beans) => {
//             return (
//               <div
//                 key={beans.topicId}
//                 style={{
//                   display: "flex",
//                   alignItems: "Center",
//                   marginBottom: "10px",
//                   justifyContent: "space-between",
//                 }}
//                 className="form-check form-profile"
//               >
//                 <label className="form-check-label">{beans.topicName}</label>
//                 {/* {console.log(course1.isSelected)} */}

//                 <input
//                   id="section1"
//                   onChange={(e) => {
//                     console.log("hello");
//                     console.log(e);
//                     courseChange3(e, beans.topicId);
//                   }}
//                   disabled="disabled"
//                   checked={isSection3}
//                   // disabled={}

//                   // value={beans.topicId}
//                   style={{ width: "20%" }}
//                   type="checkbox"
//                 />
//               </div>
//             );
//           })}
//         </>
//       )}
//     </>
//   );
// }
