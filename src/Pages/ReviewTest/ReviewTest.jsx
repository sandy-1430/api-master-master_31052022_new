import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
// eslint-disable-next-line
import { nextPrev, refer, QuizLoad } from "../../Components/quizWorking";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useRemoveModal from "../../Components/useRemoveModal";
import baseUrl from "../../Components/baseUrl";

function ReviewTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizId } = location.state;
  const [profileData, setProfileData] = useState([]);
  const [quizResult, setQuizResult] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);

  // const [loading, setLoading] = useState(false);
  // const [answerView, setAnswerView] = useState("");
  // const [explanation, setExplanation] = useState("");
  useRemoveModal();

  const profileDataApi = () => {
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
  };
  const previewApi = () => {
    axios
      .post(
        baseUrl() + "/df/PreviewPrgQuiz",
        {
          userId: Cookies.get("userId"),
          quizResultId: quizId,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setQuizResult(response.data.Data);
          QuizLoad();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    profileDataApi();
    previewApi();
  }, []);

  useEffect(() => {
    let questionNumber = 0;
    const mcqDataUpate = quizResult.map((questionSet, i) => {
      const updateQuestion = questionSet.questionsBeans.map((mcqQuestion, i) => {
        questionNumber++;
        return { ...mcqQuestion, questionNumber: questionNumber };
      });

      const updateParagraphQuestion = questionSet.paragraphQuestions.map((paragraphQuestion, i) => {
        const updateParagraph = paragraphQuestion.pgQuesmasters.map((paragraph, i) => {
          questionNumber++;
          return { ...paragraph, questionNumber: questionNumber };
        });
        return { ...paragraphQuestion, pgQuesmasters: updateParagraph };
      });
      // return [...updateQuestion, ...updateParagraphQuestion];
      return { ...questionSet, questionsBeans: updateQuestion, paragraphQuestions: updateParagraphQuestion };
    });

    console.log("mcqDataUpate", mcqDataUpate);
    setAllQuestion(mcqDataUpate);
    // setMcqDatas(mcqDataUpate);
  }, [quizResult]);

  return (
    <>
      <Header profileData={profileData} />
      <div href="#" className="float">
        <label>Subject : &nbsp;</label> <label className="fw-bold">{quizResult.length > 0 ? quizResult[0].basicDetailsBean.subject : ""}</label>
        <br />
        <label>Quiz Code : &nbsp;</label> <label className="fw-bold">{quizResult.length > 0 ? quizResult[0].basicDetailsBean.quizCode : ""}</label>
        <br />
        <label>Time Format :&nbsp;</label>
        <label> hh:mm:ss </label>
        <br />
        <label>Given Time : &nbsp;</label>
        <label className="fw-bold">
          <>
            <span>{quizResult.length > 0 ? ("0" + Math.floor(quizResult[0].basicDetailsBean.totalTime / 60)).slice(-2) : ""}:</span>
            <span>{quizResult.length > 0 ? ("0" + Math.floor(quizResult[0].basicDetailsBean.totalTime % 60)).slice(-2) : ""}:</span>
            <span>
              {quizResult.length > 0
                ? ("0" + Math.floor((quizResult[0].basicDetailsBean.totalTime % 60) * 60 - Math.floor(quizResult[0].basicDetailsBean.totalTime % 60) * 60)).slice(-2)
                : ""}
            </span>
          </>
        </label>
        <br />
        <label>Taken Time : &nbsp;</label> <label className="fw-bold">{quizResult.length > 0 ? quizResult[0].timeTaken : ""}</label>
        <br />
        <label>Marks Obtd : &nbsp;</label> <label className="fw-bold">{quizResult.length > 0 ? quizResult[0].marksObtained : ""}</label>
        <br />
      </div>

      <div href="#" className="float3" style={{ display: "none" }}>
        <label>Quiz Code : &nbsp;</label> <label className="fw-bold">{quizResult.length > 0 ? quizResult[0].quizId : ""}</label>
        <br />
        <label>Complexity : &nbsp;</label> <label className="fw-bold">Medium</label>
        <br />
        <label>Nagetive Marks : &nbsp;</label> <label className="fw-bold">{quizResult.length > 0 ? quizResult[0].negativeMarks : ""}</label>
      </div>

      <div href="#" className="float2" style={{ overflow: "auto", height: "200px", width: "240px" }}>
        <>
          {quizResult.length > 0
            ? allQuestion.map((items, index) => (
                <div className="row" id="progress" key={index}>
                  {items.questionsBeans.map((answer, key) => (
                    <div className="col-2" id="track1" key={key}>
                      {answer.markForReviewFlag == true ? (
                        <>
                          <div className="flaged marked" aria-label={answer.quesId}></div>
                        </>
                      ) : (
                        ""
                      )}

                      <a>
                        <button
                          className={answer.correctFlag == null ? "btn btn-que btn-null" : "btn btn-que"}
                          style={
                            answer.correctFlag == 1
                              ? {
                                  background: "green",
                                  color: "black",
                                  fontWeight: "500",
                                }
                              : {
                                  background: "red",
                                  color: "black",
                                  fontWeight: "500",
                                }
                          }
                          onClick={() => {
                            // refer(index);
                            const questionStart = document.querySelectorAll(".b" + key)[index];
                            const headerOffset = 125;
                            const elementPosition = questionStart.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {answer.questionNumber}
                        </button>
                      </a>
                    </div>
                  ))}
                  {/* <div></div> */}
                  {/* SECTION 2 */}
                  {/* {items.paragraphQuestions.length > 0 ? <div>Section: 2</div> : ""} */}
                  {items.paragraphQuestions.map((question, i) => (
                    <>
                      {question.pgQuesmasters.map((answer, key) => (
                        <>
                          <div className="col-2" id="track1" key={key}>
                            {answer.markForReviewFlag == true ? (
                              <>
                                <div className="flaged marked" aria-label={answer.quesId}></div>
                              </>
                            ) : (
                              ""
                            )}
                            <a>
                              <button
                                className={answer.correctFlag == null ? "btn btn-que btn-null" : "btn btn-que"}
                                style={
                                  answer.correctFlag == 1
                                    ? {
                                        background: "green",
                                        color: "black",
                                        fontWeight: "500",
                                      }
                                    : {
                                        background: "red",
                                        color: "black",
                                        fontWeight: "500",
                                      }
                                }
                                aria-label={answer.quesId}
                                // href={`data/1`}
                                onClick={() => {
                                  // refer(index);
                                  const questionStart = document.querySelectorAll(".para" + key + i)[index];
                                  console.log("questionStart", questionStart);
                                  const headerOffset = 125;
                                  const elementPosition = questionStart.getBoundingClientRect().top;
                                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                  window.scrollTo({
                                    top: offsetPosition,
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {/* {items.questionsBeans.length * (i + 1) + key + 1} */}
                                {/* {key + 1} */}
                                {answer.questionNumber}
                              </button>
                            </a>
                          </div>
                        </>
                      ))}
                      {/* <div></div> */}
                    </>
                  ))}
                </div>
              ))
            : ""}
        </>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {quizResult.map((_, index) => (
          <span className="step" key={index}></span>
        ))}
      </div>
      <form id="regForm">
        {quizResult.length > 0
          ? allQuestion.map((item, index) => (
              <div className="tab" style={{ display: "block" }} key={index}>
                <div>
                  <h2>{item?.topicName}</h2>
                  {/* <h2>{item.}</h2> */}
                  {item.questionsBeans.map((items, keys) => (
                    <div key={keys}>
                      <label className={"b" + keys}>
                        Q{keys + 1}&nbsp;&nbsp; &nbsp; <span dangerouslySetInnerHTML={{ __html: items.question }}></span>
                        &nbsp;
                        {items.correctFlag === 1 ? (
                          <i class="fa fa-check-circle" style={{ color: "green", fontSize: "2rem" }}></i>
                        ) : (
                          <i class="fa fa-times-circle-o" style={{ color: "red" }}></i>
                        )}
                      </label>
                      <br />
                      {items.optionBeans.map((answer, key) => (
                        <div key={key}>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="check1"
                              name={answer.quesId}
                              value={answer.optionValue}
                              defaultChecked={answer.selected === 0 ? false : true}
                              disabled={true}
                            />

                            <div>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: answer.optionValue,
                                }}
                              ></span>
                              &nbsp;
                              <label className="form-check-label">{answer.isCorrect === 1 && <i class="fa fa-check-circle" style={{ color: "green" }}></i>}</label>
                            </div>
                          </div>
                        </div>
                      ))}

                      <br />
                      <p>
                        <a
                          className="p-2"
                          data-toggle="collapse"
                          href={`#collapseExample/${items.quesId}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls={`collapseExample/${items.quesId}`}
                        >
                          Explanation
                        </a>
                      </p>
                      <div className="collapse" id={`#collapseAnswer/${items.quesId}`}>
                        <div className="card card-body">
                          {/* {items.optionBeans.map((item) => {
                            if (item.isCorrect === 1) return item.optionValue;
                          })} */}
                        </div>
                      </div>
                      <div className="collapse" id={`collapseExample/${items.quesId}`}>
                        <div className="card card-body">{items.explanation ? items.explanation : "No Explanation"}</div>
                      </div>

                      <br />
                    </div>
                  ))}

                  {item.paragraphQuestions.map((paragraphSet, key) => (
                    <div key={key}>
                      <h2>{paragraphSet.topicName ? paragraphSet.topicName : ""}</h2>
                      <br />
                      <div style={{ fontSize: "x-large", color: "black" }}>{paragraphSet.specialInstruction}</div>

                      <span className={`questions-mcq-mobile`} dangerouslySetInnerHTML={{ __html: paragraphSet.paragraph_desc }}></span>
                      <br />
                      <br />
                      {paragraphSet.pgQuesmasters.map((paraQuestionItem, keys) => (
                        <>
                          <>
                            <label className={"para" + keys + key}>
                              Q{paraQuestionItem.questionNumber}&nbsp;&nbsp; &nbsp; <span dangerouslySetInnerHTML={{ __html: paraQuestionItem.question }}></span>
                              &nbsp;
                              {paraQuestionItem.correctFlag === 1 ? (
                                <i class="fa fa-check-circle" style={{ color: "green", fontSize: "3rem" }}></i>
                              ) : (
                                <i class="fa fa-times-circle-o" style={{ color: "red" }}></i>
                              )}
                            </label>
                            <br />
                            <div>
                              {paraQuestionItem.optionBeans.map((answer, key) => (
                                <div key={key}>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      id="check1"
                                      name={answer.quesId}
                                      value={answer.optionValue}
                                      defaultChecked={answer.selected === 0 ? false : true}
                                      disabled={true}
                                    />

                                    <div>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: answer.optionValue,
                                        }}
                                      ></span>
                                      &nbsp;
                                      <label className="form-check-label">{answer.isCorrect === 1 && <i class="fa fa-check-circle" style={{ color: "green" }}></i>}</label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <br />
                              <p>
                                <a
                                  className="p-2"
                                  data-toggle="collapse"
                                  href={`#collapseExample/${paraQuestionItem.quesId}`}
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls={`collapseExample/${paraQuestionItem.quesId}`}
                                >
                                  Explanation
                                </a>
                              </p>
                              <div className="collapse" id={`#collapseAnswer/${paraQuestionItem.quesId}`}>
                                <div className="card card-body"></div>
                              </div>
                              <div className="collapse" id={`collapseExample/${paraQuestionItem.quesId}`}>
                                <div className="card card-body">{paraQuestionItem.explanation !== null ? paraQuestionItem.explanation : "No Explanation"}</div>
                              </div>

                              <br />
                            </div>
                          </>
                        </>
                      ))}
                    </div>
                  ))}
                </div>
                {/*) } */}
              </div>
            ))
          : ""}

        <div style={{ overflow: "auto" }}>
          <div style={{ float: "right" }}>
            <button className="btn-mcq" type="button" id="prevBtn" onClick={() => nextPrev(-1)}>
              Previous
            </button>
            <button className="btn-mcq" type="button" id="nextBtn" onClick={() => nextPrev(1)}>
              Next
            </button>
            <button
              className="btn-mcq"
              type="button"
              style={{ marginLeft: "10px" }}
              id="nextBtn1"
              onClick={() => {
                navigate("/studentDashboard");
                setTimeout(() => {
                  document.querySelector("#review-test-modal").click();
                }, 1000);
              }}
            >
              Back
            </button>
            <button className="btn-mcq" type="button" style={{ marginLeft: "10px" }} id="nextBtn" onClick={() => navigate("/studentDashboard")}>
              Close
            </button>
          </div>
        </div>
      </form>

      <br />
      <br />

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
        </div>
      </footer>
    </>
  );
}

export default ReviewTest;
