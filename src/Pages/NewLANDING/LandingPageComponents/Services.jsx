import React from "react";
import exam from "../../../Assets/images/exam.png";
import tenth from "../../../Assets/images/10th.png";
import counselling from "../../../Assets/images/counselling.png";
import twelvth from "../../../Assets/images/12th.png";
import classname1 from "../../../Assets/images/class.png";
import student from "../../../Assets/images/students.png";

const SERVICE_DATA = {
  title: "Services",
  data: [
    { title: "CUET Entrance", desc: "Common University Entrance Test Support", img: exam, url: "https://www.nta.ac.in/" },
    { title: "Online counselling", desc: "Counselling for admissions", img: counselling, url: "#" },
    { title: "SEBA Board", desc: "10th Board Exam", img: tenth, url: "https://www.sebaonline.org/" },
    { title: "AHSEC Board", desc: "12th Board Exam", img: twelvth, url: "https://ahsec.assam.gov.in/" },
    { title: "Online classes", desc: "Classes for General Test paper for CUET", img: classname1, url: "#" },
    { title: "Other Competitive Exams", desc: "Other Competitive Exams", img: student, url: "#" },
  ],
};

const handleClick = (url) => {
  if (url === "#") return;
  window.open(url, "_blank");
};

const Services = () => {
  const serviceList = SERVICE_DATA.data.map((item, index) => (
    <div key={index} className="col-md-4 col-sm-12 p-4" style={{cursor: 'pointer'}}>
      <div className="card card-landing bg-light border" style={{ height: "100%" }} onClick={() => handleClick(item.url)}>
        <img src={item.img} height="60px" width="60px" alt="exam" />
        <h5 className="mb-2 dark-grey">{item.title}</h5>
        <p>{item.desc}</p>
      </div>
    </div>
  ));

  return (
    <section className="container-fluid bg-light" id="services">
      <div className="row p-5 container mx-auto">
        <div className="col-md-12">
          <h4 className="my-5 fs-2 text-center">{SERVICE_DATA.title}</h4>
        </div>
        {serviceList}
      </div>
    </section>
  );
};

export default React.memo(Services);
