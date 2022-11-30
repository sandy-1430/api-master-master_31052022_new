import React from "react";

import about from "../../../Assets/images/about.png";

const AboutPage = () => {
  return (
    <section className="pt-5 bg-white" id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <img src={about} className="d-block mx-lg-auto img-fluid p-5" alt="Bootstrap Themes" loading="lazy" width="700" height="500" />
          </div>
          <div className="col-lg-6 col-md-12 pt-5" style={{ padding: "30px", textAlign: "justify" }}>
            <h3>What is BESST?</h3>
            <h5 className="fw-light">
              BESST (BRAHMAPUTRA EXAM SUCCESS SUPPORT TEAM) is an online educational platform consisting of experienced teachers from all over the country, helping students to have
              hands-on online tests starting with CUET (UG) 2022. It will provide mock tests/practice tests and live classes. This platform will help students to excel in
              competitive exams.
            </h5>

            <h3 className="mt-5">How does BESST help students?</h3>
            <h5 className="fw-light">
              BESST partners with teachers and faculties who have better experience of helping students to realise their full potential. It has a simulation platform wherein
              students can access notes by specialised teachers, guidance of previous year’s toppers, practice sessions, etc.{" "}
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AboutPage);

{
  /* <div className="col-md-12">
            <h4 className="my-5 mx-0 underline">A B O U T &nbsp;&nbsp; U S</h4>
          </div> */
}
