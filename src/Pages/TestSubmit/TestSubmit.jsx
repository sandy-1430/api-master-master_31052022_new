import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import useRemoveModal from "../../Components/useRemoveModal";

function TestSubmit() {
  const location = useLocation();
  const { data } = location.state;
  useRemoveModal();

  const [profileData, setProfileData] = useState([]);
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
        if (response.status === 200) {
          setProfileData(response.data.Data);
        }
      });
  }, []);
  return (
    <>
      <Header profileData={profileData} />
      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        <div className="row mt-5 p-4 faq-row">
          <h4 className="text-center">
            Test submitted successfully
            <lord-icon
              src="https://cdn.lordicon.com/lupuorrc.json"
              trigger="loop"
              colors="primary:#121331,secondary:#6c16c7"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
          </h4>
          <div className="col-md-12 pt-4 pb-4">
            <div className="row">
              <div className="col-md-12 text-center">
                <label>Total Questions :</label>
                <label>&nbsp; &nbsp;</label>
                <label className="fw-bold">{data.totalQuest}</label>
                <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
                <label>Maximum Marks :</label>
                <label>&nbsp; &nbsp;</label>
                <label className="fw-bold">{data.totalMarks}</label>
              </div>
              <div className="col-md-12 text-center">
                <label>Correct Questions:</label>
                <label>&nbsp; &nbsp;</label>
                <label className="fw-bold">{data.correctQues}</label>
                <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
                <label>Marks Obtained :</label>
                <label>&nbsp; &nbsp;</label>
                <label className="fw-bold">{data.positiveMarks}</label>
                <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
              </div>
              <div className="col-md-12 text-center">
                <label>Time Taken :</label>
                <label>&nbsp; &nbsp;</label>
                <label className="fw-bold">{data.timeTaken}</label>
                <label>&nbsp; &nbsp;&nbsp;</label>
                {/* <label>Questions Attempted :</label>
                <label>&nbsp; &nbsp;</label>
                <label className="fw-bold">40 / 50</label> */}
                <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
              </div>
            </div>

            <hr />

            <div className="row">
              {/* <div className="col-md-12 text-center">
                <h4 className="text-center">Test Garph</h4>
              </div> */}

              <div className="col-md-12 ">
                <Link className="btn main-btn float-end" to="/studentDashboard">
                  Dashboard
                </Link>
                <Link
                  className="btn main-btn float-start"
                  to="/reviewTest"
                  state={{ quizId: data.quizResultId }}
                >
                  Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <footer className="footer mt-auto py-3 main-color-bg border-top fixed-footer">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default TestSubmit;
