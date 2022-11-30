import React from "react";
import Logo from "../../Assets/images/logo.png";
import { Link } from "react-router-dom";
import useRemoveModal from "../../Components/useRemoveModal";
import { useEffect } from "react";
import { useState } from "react";
import baseUrl from "../../Components/baseUrl";

function FAQ() {
  const [faqQuestions, setFaqQuestions] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl()}/df/getFaqs`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        {console.log("day",result)}
        if (result.ResultCode === '200') {
        {console.log("day",result.Data)}

          setFaqQuestions(result.Data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useRemoveModal();
  document.body.style.overflow = "visible";
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light px-5 py-1 fixed-top white-bg">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt=""
            width="70"
            height="auto"
            className="d-inline-block align-text-top"
          />
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

      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        <div className="row mt-5 p-5 faq-row">
          <h2 className="text-center">
            FAQ<span style={{ fontSize: "small" }}>S</span>
          </h2>
          {faqQuestions && faqQuestions.length > 0 && faqQuestions.map((item) => (
          <div className="col-md-12 pt-4 pb-4" key={item.id}>
            <h4 className="main-color">{item.id}. {item.faq}</h4>
            <p>{item.answer}</p>
          </div>
          ))}
          <Link
            to="/"
            type="button"
            style={{ width: "150px", marginLeft: "auto" }}
            className="btn main-btn  px-4 me-md-2"
          >
            Go Back
          </Link>
        </div>
      </div>

      <br />
      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default FAQ;
