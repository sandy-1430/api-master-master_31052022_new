import Cookies from "js-cookie";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import carousel1 from "../../../Assets/images/hero-carousel-2.svg";
import CurrentAffairsCommponent from "./CurrentAffairsCommponent";
import NewsComponent from "./NewsComponent";

const styles = {
  imageSize: {
    maxWidth: "400px",
  },
};
const Headline = ({ onRegisterClick }) => {
  return (
    <div className="container py-3">
      <br />
      <div className="row  justify-content-around align-items-center ">
        <div className="col-md-4 col-12 py-5">
          <h1 className="fs-2 fw-normal">
            Brahmaputra Exam Success Support Team
          </h1>
          <p className="fw-light">
            {" "}
            Click below to explore more or register yourself to be a part of
            BESST family.{" "}
          </p>
          <div
            className="d-grid gap-2 d-md-flex justify-content-md-start"
            id="news"
          >
            {Cookies.get("token") ? (
              <>
                <a
                  type="button"
                  className="btn btn-outline-secondary px-4 px-3"
                  href="#about"
                >
                  Explore
                </a>
                <Link
                  type="button"
                  className="btn main-btn  px-4 px-3"
                  to="/studentDashboard"
                >
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn main-btn fw-bold px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                  onClick={() => onRegisterClick()}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="btn fw-bold btn-outline-secondary px-4"
                  href="#about"
                >
                  Explore
                </button>
              </>
            )}
          </div>

          <br />
        </div>
        <div className="col-12 col-md-8 col-lg-8">
          <img
            src={carousel1}
            className="d-block ms-auto img-fluid"
            alt="carousel_img"
            loading="lazy"
            style={styles.imageSize}
          />
        </div>
      </div>

      <div
        className="row justify-content-between"
        style={{ marginTop: "-3rem" }}
      >
        <NewsComponent />
        <CurrentAffairsCommponent />
      </div>
    </div>
  );
};

export default Headline;
