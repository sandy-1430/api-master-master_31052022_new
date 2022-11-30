import React from "react";
import exam from "../../../Assets/images/exam.png";
import tenth from "../../../Assets/images/10th.png";
import counselling from "../../../Assets/images/counselling.png";
import twelvth from "../../../Assets/images/12th.png";
import classname1 from "../../../Assets/images/class.png";
import student from "../../../Assets/images/students.png";

const SERVICE_DATA = {
  title: "S E R V I C E S",
  data: [
    { title: "CUET Entrance", desc: "Common University Entrance Test Support", img: exam },
    { title: "Online counselling", desc: "Counselling for admissions", img: counselling },
    { title: "SEBA Board", desc: "10th Board Exam", img: tenth },
    { title: "AHSEC Board", desc: "12th Board Exam", img: twelvth },
    { title: "Online classes", desc: "Classes for General Test paper for CUET", img: classname1 },
    { title: "Other Competitive Exams", desc: "Other Competitive Exams", img: student },
  ],
};

const Services = () => {
  const serviceList = SERVICE_DATA.data.map((item, index) => (
    <div key={index} className="col-md-4 col-sm-12 p-4">
      <div className="card card-landing">
        <img src={item.img} height="60px" width="60px" alt="exam" />
        <h5 className="mb-2 dark-grey">{item.title}</h5>
        <p>{item.desc}</p>
      </div>
    </div>
  ));

  return (
    <section className="container-fluid" id="services">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-12">
          <h4 className="my-5 underline">{SERVICE_DATA.title}</h4>
        </div>
        {serviceList}
      </div>
    </section>
  );
};

export default React.memo(Services);
