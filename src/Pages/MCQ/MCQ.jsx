/* eslint-disable */
import React, { memo, useEffect, useState, useCallback } from "react";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";
import { AiFillFlag } from "react-icons/ai";
import { nextPrev, refer, QuizLoad, navigate } from "../../Components/quizWorking";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";
// import moment from "moment";

import HackTimer from "../../ExternalScripts/HackTimer";

const ParaQuestions = memo(({ item, index, AnswerSet, answerAttempt, bookMark, clearAnswerSet }) => {
  return (
    <>
      <h2>{item.topicName ? item.topicName : ""}</h2>
      <br />
      <article style={{ fontSize: "20px", color: "black", backgroundColor: "white !important", padding: "10px 0" }}>{item.specialInstruction}</article>
      <span className={`${"para_ques" + index} questions-mcq-mobile`} dangerouslySetInnerHTML={{ __html: item.paragraph_desc }}></span>
      <br />
      <br />
      {item.pgQuesmasters.map((items, i) => (
        <div style={{ position: "relative" }} key={i}>
          <label className={`${"para" + i + index} questions-mcq-mobile`}>
            Q{items.questionNumber}.&nbsp;&nbsp; &nbsp;
            <span className="" dangerouslySetInnerHTML={{ __html: items.question }}></span>
          </label>
          <br />
          {items.optionBeans.map((answer, key) => (
            <div className="form-check form-check-media" style={{ margin: "0 0 0 45px" }} key={key}>
              <input
                type="radio"
                className="form-check-input"
                id={items.optionBeans[0].optionId}
                name={items.quesId}
                ariaValueText={items.optionBeans[0].optionId}
                value={answer.optionId}
                onChange={(e) => {
                  AnswerSet(e, "para");
                  answerAttempt(items.quesId, "para");
                }}
              />
              <label className="form-check-label questions-mcq-mobile">
                <span
                  dangerouslySetInnerHTML={{
                    __html: answer.optionValue,
                  }}
                ></span>
              </label>
            </div>
          ))}
          <div className="clear-bookmark">
            <div
              className="clear-mcq-selection bookmark-question"
              onClick={() => {
                clearAnswerSet(items.quesId, "para", index);
                const ele = document.getElementsByName(`${items.quesId}`);
                for (let i = 0; i < ele.length; i++) ele[i].checked = false;
              }}
            >
              <p>Clear</p>
            </div>
            <div className="bookmark-question" style={{ marginLeft: "-20px" }}>
              <p
                style={{
                  position: "absolute",
                  top: "-18px",
                  left: "-53px",
                }}
                onClick={(e) => {
                  bookMark(e, items.quesId, "para");
                }}
              >
                <AiFillFlag style={{ pointerEvents: "none" }} />
              </p>
            </div>
          </div>
        </div>
      ))}

      <br />
      <br />
    </>
  );
});

const McqQuestions = memo(({ items, i, AnswerSet, answerAttempt, bookMark, clearAnswerSet }) => {
  return (
    <div style={{ position: "relative" }}>
      <label className={`${"m" + i} questions-mcq-mobile`}>
        Q{items.questionNumber}.&nbsp;&nbsp; &nbsp;
        <span dangerouslySetInnerHTML={{ __html: items.question }}></span>
      </label>
      <br />
      {items.optionBeans.map((answer, key) => (
        <div className="form-check form-check-media" style={{ margin: "0 0 0 45px" }} key={key}>
          <input
            type="radio"
            className="form-check-input"
            id={items.optionBeans[0].optionId}
            name={items.quesId}
            value={answer.optionId}
            ariaValueText={items.optionBeans.optionId}
            onChange={(e) => {
              AnswerSet(e, "mcq");
              answerAttempt(items.quesId, "mcq");
            }}
          />
          <label className="form-check-label questions-mcq-mobile">
            <span
              dangerouslySetInnerHTML={{
                __html: answer.optionValue,
              }}
            ></span>
          </label>
        </div>
      ))}
      <div className="clear-bookmark">
        <div
          className="clear-mcq-selection bookmark-question"
          onClick={() => {
            clearAnswerSet(items.quesId, "mcq");
            const ele = document.getElementsByName(`${items.quesId}`);
            for (let i = 0; i < ele.length; i++) ele[i].checked = false;
          }}
        >
          <p>Clear</p>
        </div>
        <div className="bookmark-question" style={{ marginLeft: "-20px" }}>
          <p
            style={{
              position: "absolute",
              top: "-18px",
              left: "-53px",
            }}
            onClick={(e) => {
              bookMark(e, items.quesId, "mcq");
            }}
          >
            <AiFillFlag style={{ pointerEvents: "none" }} />
          </p>
        </div>
      </div>
    </div>
  );
});

const MCQ = () => {
  const location = useLocation();
  const { quizId, courseId, name, quizCode, level, negativeMarks, topicId } = location.state;
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mcqDatas, setMcqDatas] = useState([]);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const [list, setlist] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setTimerOn(true);
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => {
      return clearInterval(interval);
    };
  }, [timerOn]);

  useEffect(() => {
    document.body.style.overflow = "visible";
    setLoading(true);
    axios
      .post(
        baseUrl() + "/profileData",
        {
          email: Cookies.get("email"),
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
        if (response.status === 200) {
          setProfileData(response.data.Data);
          setLoading(false);
        }
      });
  }, []);

  // getMcqPragByQuizId
  // 👇👇 USE THIS BELOW DATA for testing
  // const quizId = 34;
  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/getMcqPragByQuizId",
        {
          quizId: quizId,
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
          console.log("mcq Data set");
          setMcqDatas(response.data.Data);
          setlist(response.data.Data);

          QuizLoad();
        }
      });
  }, [quizId]);

  useEffect(() => {
    let questionNumber = 0;
    const mcqDataUpate = mcqDatas.map((questionSet, i) => {
      const updateQuestion = questionSet.quesmasters.map((mcqQuestion, i) => {
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

      return { ...questionSet, quesmasters: updateQuestion, paragraphQuestions: updateParagraphQuestion };
    });

    console.log("updated mcqDataUpate with Question Number 👍🏼", mcqDataUpate);
    setAllQuestion(mcqDataUpate);
  }, [mcqDatas]);

  const AnswerSet = useCallback(
    (event, type) => {
      // console.log(type, event);
      let res;
      if (type === "mcq") {
        res = mcqDatas.map((e1) => {
          e1?.quesmasters.map((e2) => {
            if (e2.optionBeans.find((key) => key.optionId == event.target.value)) {
              e2?.optionBeans.map((el) => {
                if (event.target.value == el.optionId) {
                  el.selected = 1;
                  return el;
                } else {
                  el.selected = 0;
                  return el;
                }
              });
            }
            return e2;
          });
          return e1;
        });
      } else {
        res = mcqDatas.map((e1) => {
          e1?.paragraphQuestions.map((e2) => {
            e2?.pgQuesmasters.map((e3) => {
              if (e3.optionBeans.find((key) => key.optionId == event.target.value)) {
                e3?.optionBeans.map((el) => {
                  if (event.target.value == el.optionId) {
                    el.selected = 1;
                    return el;
                  } else {
                    el.selected = 0;
                    return el;
                  }
                });
              }
              return e3;
            });
            return e2;
          });
          return e1;
        });
      }
      console.log(res);
      setlist((prev) => ({ ...prev, Data: res }));
    },
    [mcqDatas]
  );

  const clearAnswerSet = useCallback(
    (id, type, paraIndex = -1) => {
      const navigation = document.querySelectorAll(".selection-btn-stand-" + type);

      navigation.forEach((e) => {
        if (e.getAttribute("aria-label") == id) {
          console.log(e.getAttribute("aria-label"));
          e.classList.remove("attempted");
        }
      });

      let res;
      if (type === "mcq") {
        res = mcqDatas.map((e1) => {
          e1?.quesmasters.map((e2) => {
            if (e2.quesId == id) {
              e2?.optionBeans.map((el) => {
                el.selected = 0;
                return el;
              });
            }
            return e2;
          });
          return e1;
        });
      } else {
        res = mcqDatas.map((e1) => {
          e1?.paragraphQuestions.map((e2) => {
            e2?.pgQuesmasters.map((e3) => {
              if (e3.quesId == id) {
                e3?.optionBeans.map((el) => {
                  el.selected = 0;
                  return el;
                });
              }
              return e3;
            });
            return e2;
          });
          return e1;
        });
      }
      console.log(res);
      setlist(res);
    },
    [mcqDatas]
  );

  const bookMark = useCallback(
    (event, id, type) => {
      const navigation = document.querySelectorAll(".flaged-" + type);
      console.log("navigation", navigation);
      // const text1 = "Clear Mark";
      // const text2 = "Mark for Later";
      navigation.forEach((e) => {
        if (e.getAttribute("aria-label") == id && !e.classList.contains("marked")) {
          console.log(e.getAttribute("aria-label"));
          e.classList.add("marked");
          event.target.classList.add("unmarked");
          let res = mcqDatas.map((e1) => {
            e1?.quesmasters.map((e2) => {
              if (e2.quesId == id) {
                e2.markForReviewFlag = true;
              }
              return e2;
            });
            return e1;
          });
          console.log(res);
          setlist(res);
        } else if (e.getAttribute("aria-label") == id && e.classList.contains("marked")) {
          e.classList.remove("marked");
          event.target.classList.remove("unmarked");
          let res = mcqDatas.map((e1) => {
            e1?.quesmasters.map((e2) => {
              if (e2.quesId == id) {
                e2.markForReviewFlag = false;
              }
              return e2;
            });
            return e1;
          });
          console.log(res);
          setlist(res);
        }
      });
    },
    [mcqDatas]
  );

  const answerAttempt = useCallback(
    (id, type) => {
      const navigation = document.querySelectorAll(".selection-btn-stand-" + type);

      if (type === "mcq") {
        navigation.forEach((e) => {
          if (e.getAttribute("aria-label") == id) {
            e.classList.add("attempted");
          }
        });
      }

      let res;
      if (type === "para") {
        res = mcqDatas.forEach((e1) => {
          e1.paragraphQuestions.forEach((e2, ei) => {
            e2.pgQuesmasters.forEach((e3, i) => {
              e3.optionBeans.forEach((el) => {
                navigation.forEach((e) => {
                  if (e.getAttribute("aria-label") == id) {
                    e.classList.add("attempted");
                  }
                });
                return el;
              });

              return e3;
            });
            return e2;
          });
          return e1;
        });
      }

      // console.log("navigate", navigation, id);
    },
    [mcqDatas]
  );

  const submitQuiz = (e) => {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    let result = `${hours === 0 || hours < 10 ? `${0}${hours}` : hours} : ${minutes === 0 || minutes < 10 ? `${0}${minutes}` : minutes} : ${
      seconds === 0 || seconds < 10 ? `${0}${seconds}` : seconds
    }`;

    console.log(
      "result",
      hours === 0 || hours < 10 ? "0" + hours : hours,
      minutes === 0 || minutes < 10 ? "0" + minutes : minutes,
      seconds === 0 || seconds < 10 ? "0" + seconds : seconds,
      result
    );
    console.log(typeof result);

    // let result = `${hours} : ${minutes} : ${seconds}`;
    // console.log("result", hours, minutes, seconds, result);
    // let res;
    // console.log(list);

    // if (list.length > 0) {
    //   console.log("1");
    let res = mcqDatas.map((e1) => {
      e1?.quesmasters.map((e2) => {
        e2?.optionBeans.map((el) => {
          if (el.selected === null) {
            el.selected = 0;
            return el;
          } else return el;
        });
        return e2;
      });
      return e1;
    });

    res = mcqDatas.map((e1) => {
      e1?.paragraphQuestions.map((e2) => {
        e2?.pgQuesmasters.map((e3) => {
          e3?.optionBeans.map((el) => {
            if (el.selected === null) {
              el.selected = 0;
              return el;
            } else return el;
          });
          // }
          return e3;
        });
        return e2;
      });
      return e1;
    });
    // console.log("res124123543252", res);
    setlist((prev) => ({ ...prev, Data: res }));

    axios
      .post(
        baseUrl() + "/df/saveMcqPragraphQuizData",
        {
          quizId: quizId,
          courseId: courseId,
          userId: Cookies.get("userId"),
          quizSectionWises: mcqDatas,
          timeTaken: result,
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
          console.log("data", response.data.Data);
          navigate("/testsubmit", { state: { data: response.data.Data } });

          setLoading(false);
        }
      });
    console.log("submitted");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header profileData={profileData} />
      <div href="#" className="float" style={{}}>
        <label>Subject : &nbsp;</label>
        <label className="fw-bold">
          {mcqDatas.map((item, index) => (
            <span key={index}>{item.basicDetailsBean.subject}</span>
          ))}
        </label>
        <br />
        <label>Quiz Code : &nbsp;</label>
        <label className="fw-bold">
          {mcqDatas.map((item, index) => (
            <span key={index}>{item.basicDetailsBean.quizCode}</span>
          ))}
        </label>
        <br />
        <label>Time Format :&nbsp;</label>
        <label> hh:mm:ss </label>
        <br />
        <label>Given Time : &nbsp;</label>{" "}
        {mcqDatas.map((item, index) => (
          <span key={index}>
            <span>{("0" + Math.floor(item.basicDetailsBean.totalTime / 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor(item.basicDetailsBean.totalTime % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((item.basicDetailsBean.totalTime % 60) * 60 - Math.floor(item.basicDetailsBean.totalTime % 60) * 60)).slice(-2)}</span>
          </span>
        ))}
        <br />
        <div id="display">
          <label>Taken Time : &nbsp;</label> <span>{("0" + Math.floor((time / 600000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>
      </div>

      {/* <div href="#" className="float3" style={{ display: "none" }}>
        <label>Quiz Code : &nbsp;</label> <label className="fw-bold">{quizCode}</label>
        <br />
        <label>Complexity : &nbsp;</label> <label className="fw-bold">{level}</label>
        <br />
        <label>Nagetive Marks : &nbsp;</label> <label className="fw-bold">{negativeMarks}</label>
      </div> */}

      <div href="#" className="float2" style={{ overflow: "auto", height: "400px !important", width: "240px" }}>
        <>
          {allQuestion.map((items, index) => (
            <div className="row" id="progress">
              {/* <div>Section : {index + 1}</div> */}
              {items.quesmasters.map((answer, key) => (
                <>
                  <div className="col-2" style={{ position: "relative" }} id="track1">
                    <div className="flaged flaged-mcq" aria-label={answer.quesId}></div>
                    <>
                      <button
                        className="btn btn-que selection-btn-stand-mcq"
                        style={{ overflow: "hidden" }}
                        aria-label={answer.quesId}
                        // href={`data/1`}
                        onClick={() => {
                          refer(index);
                          const questionStart = document.querySelectorAll(".m" + key)[index];
                          const headerOffset = 125;
                          const elementPosition = questionStart.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          console.log("questionStart", questionStart, key, index);

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }}
                      >
                        {answer.questionNumber}
                      </button>
                    </>
                  </div>
                </>
              ))}
              {/* TODO: PARA BTN */}
              {/* SECTION 2 */}
              {/* {items.paragraphQuestions.length > 0 ? <div>Section: 2</div> : ""} */}
              {items.paragraphQuestions.map((_, keys) => (
                <>
                  {_.pgQuesmasters.map((answer, key) => (
                    <>
                      <div className="col-2" style={{ position: "relative" }} id="track1">
                        <div className="flaged flaged-para" aria-label={answer.quesId}></div>
                        <>
                          <button
                            className="btn btn-que selection-btn-stand-para"
                            style={{ overflow: "hidden" }}
                            aria-label={answer.quesId}
                            onClick={() => {
                              refer(index);
                              const questionStart = document.querySelectorAll(".para" + key + keys)[index];
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
                            {answer.questionNumber}
                          </button>
                        </>
                      </div>
                    </>
                  ))}
                </>
              ))}
            </div>
          ))}
        </>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {mcqDatas.map((item) => (
          <span className="step" id={`data/${item.topicId}`}></span>
        ))}
      </div>

      <form id="regForm" onSubmit={handleSubmit}>
        {allQuestion.map((item, idx) => (
          <div className="tab " id={`data/${item.topicId}`} key={idx}>
            <div className="mcq-alternate-color">
              <h2>{item.topicName}</h2>
              <article style={{ fontSize: "20px", color: "black", backgroundColor: "white !important", padding: "10px 0" }}>{item.specialInstruction}</article>

              {/* MCQ QUESTION */}
              {item.quesmasters.map((items, i) => (
                <McqQuestions key={i + "" + idx} {...{ items, i, clearAnswerSet, answerAttempt, bookMark, AnswerSet }} />
              ))}
              {/* PARA QUESTION */}
              {item.paragraphQuestions.map((paragraph, index) => (
                <ParaQuestions item={paragraph} key={idx + "" + index + index} {...{ clearAnswerSet, AnswerSet, answerAttempt, bookMark, index }} />
              ))}

              <br />
              <br />
            </div>
          </div>
        ))}

        {/*  */}
        <div style={{ overflow: "auto" }}>
          <div style={{ float: "right" }}>
            <button className="btn-mcq" type="button" id="prevBtn" onClick={() => nextPrev(-1)}>
              Previous
            </button>

            <button className="btn-mcq" type="button" id="nextBtn" onClick={() => nextPrev(1)}>
              Next
            </button>

            <a
              href="/#"
              className="btn main-btn  px-4"
              style={{
                margin: "10px 10px 10px 0px",
                padding: "9px 20px",
                fontSize: "17px",
                borderRadius: "0px",
              }}
              data-bs-toggle="modal"
              data-bs-target="#leaveQuiz"
            >
              Leave Quiz
            </a>

            <button className="btn-mcq" data-bs-toggle="modal" data-bs-target="#confirmQuiz" type="submit" id="submitbtn" style={{ display: "none" }}>
              Submit
            </button>
          </div>
        </div>
      </form>

      <br />
      <br />

      <div className="modal fade" id="confirmQuiz" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Quiz Submission
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-auto">
              <form>
                <h1 style={{ fontSize: "20px" }}>Are you sure you want to submit the quiz ?</h1>

                <div className="mb-3 d-flex justify-content-center"></div>
                <button
                  className="btn main-btn "
                  data-mdb-dismiss="modal"
                  id="submitbtn"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setTimerOn(false);
                    submitQuiz(e);
                  }}
                >
                  Yes
                </button>
                <button type="button" className="btn main-btn " data-bs-dismiss="modal" aria-label="Close" style={{ marginLeft: "50px" }}>
                  No
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="leaveQuiz" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Leave Quiz
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-auto">
              <form>
                <h1 style={{ fontSize: "20px" }}>Are you sure you want to leave quiz ?</h1>
                <div className="mb-3 d-flex justify-content-center"></div>
                <Link className="btn main-btn " data-mdb-dismiss="modal" to="/studentDashboard">
                  Yes
                </Link>
                <button type="button" className="btn main-btn" data-bs-dismiss="modal" aria-label="Close" style={{ marginLeft: "50px" }}>
                  No
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team) </span>
        </div>
      </footer>
    </>
  );
};

export default MCQ;

// useEffect(() => {
//   axios
//     .post(
//       baseUrl() + "/df/mcq",
//       {
//         quizId: quizId,
//       },
//       {
//         headers: {
//           "Acces-Control-Allow-Origin": "*",
//           Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
//           Authorization: Cookies.get("token"),
//         },
//       }
//     )
//     .then((response) => {
//       if (response.status === 200) {
//         // setMcqDatas(response.data.Data);
//         // QuizLoad();
//       }
//     });
// }, []);
/* </> */

/* {question.pgQuesmasters.map((answer, key) => (
                    <>
                      <div className="col-2" style={{ position: "relative" }} id="track1">
                        <div className="flaged flaged-para" aria-label={answer.quesId}></div>
                        <a>
                          <button
                            className="btn btn-que selection-btn-stand-para"
                            style={{ overflow: "hidden" }}
                            aria-label={answer.quesId}
                            // href={`data/1`}
                            onClick={() => {
                              refer(index);
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
                            {key + 1}
                          </button>
                        </a>
                      </div>
                    </>
                  ))} */

/* <div></div> */

/* && */

/* {item.paragraphQuestions.length > 0 ? (
                  <>
                    {item.paragraphQuestions.map((paragraph, index) => (
                      <ParaQuestion item={paragraph} key={index} />
                    ))}
                  </>
                ) : ( */
