import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-5 main-color-bg border-top fw-light">
      <div className="termncondition flex-sm-row flex-column mb-5 white">
        <a href="https://www.besst.in/registration/documents/Terms%20and%20Conditiion%20BESST.pdf" target="_blank">
          Terms And Conditions
        </a>
        <span className="white d-sm-inline d-none">|</span>
        <a href="https://www.besst.in/registration/documents/PRIVACY%20POLICY%20BESST.pdf" target="_blank">
          Privacy Policy
        </a>
        <span className="white d-sm-inline d-none">|</span>
        <a href="https://www.besst.in/registration/documents/PRIVACY%20POLICY%20BESST.pdf" target="_blank">
          Data Sharing Policy
        </a>
      </div>
      <div className="container text-center">
        <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
      </div>
    </footer>
  );
};

export default Footer;
