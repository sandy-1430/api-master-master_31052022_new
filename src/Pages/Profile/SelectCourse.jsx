import React, { useEffect, useState } from "react";
import "./SelectCourse.css";

const SelectCourse = (props) => {
  const { subjects, setSubjects, mainData, setMainData } = props;
  const [courseId, setCourseId] = useState(null);
  const [subjectData, setSubjectData] = useState([]);
  const [subjectsSelect, setSubjectsSelect] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState([]);

  useEffect(() => {
    const data = subjects.filter((item) => item.courseId === Number(courseId));
    setSubjectData(data);
    setSubjectCategory(data[0]?.categorys || []); //data store in array
    setSubjectsSelect(data[0]?.categorys || []); // Upadte Section data
    console.log("subjectData", data, courseId);
    // console.log("SubjectCategory", data[0]?.categorys || []);
  }, [courseId, subjects]);

  // useEffect(()=>{},[setSubjectsSelect])
  // setMainData((prev) => ({ ...prev, categorys: subjectsSelect }));

  useEffect(() => {
    setMainData((prev) => ({ ...prev, categorys: subjectsSelect }));
  }, [subjectsSelect, setSubjectsSelect]);

  const handleSelect = (e) => {
    const { value } = e.target;
    setCourseId(value);
  };
  return (
    <div>
      <div className="main-container">
        <div className="form-floating py-2" style={{ width: "100%" }}>
          <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handleSelect}>
            <option selected>Choice</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject.courseId}>
                {subject.courseName}
              </option>
            ))}
          </select>
          <label for="floatingSelect">Select the Course</label>
        </div>
        {/* <h4 className="p-2">{subjectData[0]?.courseName || "Select the Available Cousers"}</h4> */}
        <div className="radio-buttons py-2">
          {subjectsSelect.map((list, index) => (
            <CoursesList list={list} id={index} key={index} subjectsSelect={subjectsSelect} setSubjectsSelect={setSubjectsSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCourse;

function CoursesList({ list, setSubjectsSelect, subjectsSelect, id }) {
  return (
    <>
      <h5 style={{ fontSize: "15px", color: "#ba00ba" }}>{list.catlevel}</h5>
      <div className="d-flex flex-wrap justify-content-md-start justify-content-around">
        {list.topicBeans.map((beans, index) => (
          <label className="custom-radio" key={index}>
            <span className="radio-btn" style={beans.selection ? { border: "3px solid #8373e6" } : {}}>
              <input
                type="checkbox"
                name="radio"
                onChange={(e) => courseChange(e, beans.topicId, subjectsSelect[id], id, subjectsSelect, setSubjectsSelect)}
                checked={beans.selection || false}
              />
              <div className="hobbies-icon">
                <h3>{beans.topicName}</h3>
              </div>
            </span>
          </label>
        ))}
      </div>
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
