/* eslint-disable */
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import profileHook from "./useProfile";
// import { AiFillFlag } from "react-icons/ai";

import "./StudentMCQ.css";
import QuestionButton from "./QuestionButton";

import { useLocation, useNavigate } from "react-router";

export default function StudentMCQ() {
  const [mcqDatas, setMcqDatas] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const profileData = profileHook();

  const [clickBtn, setClickBtn] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const location = useLocation();
  const { quizId, courseId } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (mcqDatas.length > 0) {
      timer = setInterval(() => {
        setSeconds((seconds) => 1 + seconds);
        if (seconds === 59) {
          setMinutes((minutes) => minutes + 1);
          setSeconds(0);
        }
        if (minutes === 59) {
          setHours((hours) => hours + 1);
          setMinutes(0);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    const arr = [];

    for (let i = 0; i < totalQuestion; i++) {
      arr.push({ number: i + 1, markAndSave: false, markReview: false, saveAndReview: false });
    }

    setClickBtn(arr);
  }, [totalQuestion]);

  // const quizId = 137;
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
          console.log("mcq Data set 🚀 DONE");
          setMcqDatas(response.data.Data);
        }
      });
  }, [quizId]);

  // 👇👇 this Effect will set the question number for every Question
  useEffect(() => {
    let questionNumber = 0;
    const mcqDataUpate = mcqDatas.map((questionSet, i) => {
      const updateQuestion = questionSet.quesmasters.map((mcqQuestion) => {
        questionNumber++;
        const option = mcqQuestion.optionBeans.map((option) => {
          return { ...option, selected: 0 };
        });
        return { ...mcqQuestion, questionNumber: questionNumber, optionBeans: option };
      });

      const updateParagraphQuestion = questionSet.paragraphQuestions.map((paragraphQuestion) => {
        const updateParagraph = paragraphQuestion.pgQuesmasters.map((paragraph) => {
          questionNumber++;
          const option = paragraph.optionBeans.map((option) => {
            return { ...option, selected: 0 };
          });
          return { ...paragraph, questionNumber: questionNumber, optionBeans: option };
        });
        return { ...paragraphQuestion, pgQuesmasters: updateParagraph };
      });
      return { ...questionSet, quesmasters: updateQuestion, paragraphQuestions: updateParagraphQuestion };
    });

    // console.log("updated mcqDataUpate with Question Number 👍🏼", mcqDataUpate);
    setAllQuestion(mcqDataUpate);
    setTotalQuestion(questionNumber);
  }, [mcqDatas]);

  const handleNext = () => {
    if (currentQuestion < totalQuestion) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
      return;
    }
    setCurrentQuestion(totalQuestion);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((currentQuestion) => currentQuestion - 1);
      return;
    }
    setCurrentQuestion(1);
  };

  const submitQuiz = (e) => {
    const resultTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    // console.log("", allQuestion);
    // return;
    axios
      .post(
        baseUrl() + "/df/saveMcqPragraphQuizData",
        {
          quizId: quizId,
          courseId: courseId,
          userId: Cookies.get("userId"),
          quizSectionWises: allQuestion,
          timeTaken: resultTime,
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
          // console.log("data", response.data.Data);
          navigate("/testsubmit", { state: { data: response.data.Data } });
        }
      });
    // console.log("submitted");
  };

  return (
    <section className="container position-relative">
      <Header profileData={profileData} />
      <div style={{ marginTop: "100px", height: "80%" }}>
        <>
          <div>
            <h1 className="text-end">
              {hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
            </h1>
          </div>
          {allQuestion.map((questionSet, idx) => (
            <div id={`data/${questionSet.topicId}`} key={idx}>
              {/* mcq-alternate-color */}
              <>
                <h2>{questionSet.topicName}</h2>
                <article>{questionSet.specialInstruction}</article>
                <div className="row" style={{ height: "60vh" }}>
                  <div className="col-lg-7 col-12 order-lg-1 order-2">
                    <McqPaper {...{ questionSet, currentQuestion, clickBtn, totalQuestion, setAllQuestion, handleNext, setClickBtn }} />
                  </div>
                  <div className="col-lg-5 col-12 order-lg-2 order-1 bg-light">
                    <QuestionButton {...{ clickBtn, setCurrentQuestion, currentQuestion }} />
                  </div>
                </div>
              </>
            </div>
          ))}
        </>
        <div>
          <div className="d-flex justify-content-end gap-1 mt-5" style={{}}>
            <button className="btn-mcq" type="button" id="prevBtn" onClick={handlePrevious}>
              Previous
            </button>
            <button className="btn-mcq" type="button" id="nextBtn" onClick={handleNext}>
              Next
            </button>
            <button className="btn-mcq" type="button" id="nextBtn" onClick={submitQuiz}>
              Submit
            </button>
            {/* <a href="/#" className="btn main-btn  px-4" data-bs-toggle="modal" data-bs-target="#leaveQuiz">
              Leave Quiz
            </a>

            <button className="btn-mcq" data-bs-toggle="modal" data-bs-target="#confirmQuiz" type="submit" id="submitbtn" style={{ display: "none" }}>
              Submit
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function McqPaper({ questionSet, currentQuestion, totalQuestion, setAllQuestion, handleNext, clickBtn, setClickBtn }) {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const quesmasterUpdate = questionSet.quesmasters.filter((question) => question.questionNumber === currentQuestion);
    setFilter([...quesmasterUpdate]);

    const paragraphQuestionsUpdate = questionSet.paragraphQuestions.map((pgQuestion) => {
      let pg = pgQuestion.pgQuesmasters.map((question) => {
        if (question.questionNumber === currentQuestion) return question;
        return null;
      });

      let filterPg = pg.filter((question) => question);
      console.log("filterPgQuestion 🚴🏼‍♀️", filterPg);
      if (filterPg.length) setFilter([...filterPg]);
      return filterPg;
    });
  }, [currentQuestion, questionSet.paragraphQuestions, questionSet.quesmasters]);

  useEffect(() => {
    const quesId = filter.map((question) => question.quesId);
    const ele = document.getElementsByName(`${quesId}`);
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].ariaChecked === "0") {
        ele[i].checked = false;
        // console.log(ele[i].ariaChecked, typeof ele[i].ariaChecked);
      } else ele[i].checked = true;
    }
  }, [filter]);

  const handleSaveNext = (e) => {
    e.preventDefault();
    const quesId = filter.map((question) => question.quesId);
    // console.log("quesId", quesId);
    const ele = document.getElementsByName(`${quesId}`);
    let answer = "";
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        answer = ele[i].value;
        break;
      }
    }
    // console.log("answer", answer);
    if (answer === "") {
      alert("Please select an option");
      return true;
    } else {
      console.log("save answer");
      if (currentQuestion <= questionSet.quesmasters.length) {
        const optionUpdate = questionSet.quesmasters.map((mcqQuestion) => {
          const updateOption = mcqQuestion.optionBeans.map((option) => {
            if (mcqQuestion.questionNumber === currentQuestion) {
              // console.log("option.optionId", typeof option.optionId);

              if (option.optionId === Number(answer)) return { ...option, selected: 1 };
              else return { ...option, selected: 0 };
            }
            return option;
          });
          return { ...mcqQuestion, optionBeans: updateOption };
        });
        setAllQuestion([{ ...questionSet, quesmasters: optionUpdate }]);
      } else if (currentQuestion - questionSet.quesmasters.length <= totalQuestion - questionSet.quesmasters.length) {
        const optionUpdate = questionSet.paragraphQuestions.map((pgQuestion) => {
          const updateQuestion = pgQuestion.pgQuesmasters.map((question) => {
            const updateOption = question.optionBeans.map((option) => {
              if (question.questionNumber === currentQuestion) {
                // console.log("option.optionId", typeof option.optionId);
                if (option.optionId === Number(answer)) return { ...option, selected: 1 };
                else return { ...option, selected: 0 };
              }
              return option;
            });
            return { ...question, optionBeans: updateOption };
          });

          return { ...pgQuestion, pgQuesmasters: updateQuestion };
        });
        // console.log("updateQuestion", optionUpdate);

        setAllQuestion([{ ...questionSet, paragraphQuestions: optionUpdate }]);
      }

      // Save Question button
      const val = clickBtn.map((btn) => {
        if (btn.number === currentQuestion) return { ...btn, markAndSave: true, markReview: false };
        return btn;
      });
      setClickBtn(val);
      // console.log("filter", filter);
      handleNext();
    }
  };

  const handleClearResponse = (e) => {
    const quesId = filter.map((question) => question.quesId);
    const ele = document.getElementsByName(`${quesId}`);
    for (let i = 0; i < ele.length; i++) ele[i].checked = false;
    if (currentQuestion <= questionSet.quesmasters.length) {
      const optionUpdate = questionSet.quesmasters.map((mcqQuestion) => {
        const updateOption = mcqQuestion.optionBeans.map((option) => {
          if (mcqQuestion.questionNumber === currentQuestion) {
            return { ...option, selected: 0 };
          }
          return option;
        });
        return { ...mcqQuestion, optionBeans: updateOption };
      });
      setAllQuestion([{ ...questionSet, quesmasters: optionUpdate }]);
    } else if (currentQuestion - questionSet.quesmasters.length <= totalQuestion - questionSet.quesmasters.length) {
      const optionUpdate = questionSet.paragraphQuestions.map((pgQuestion) => {
        const updateQuestion = pgQuestion.pgQuesmasters.map((question) => {
          const updateOption = question.optionBeans.map((option) => {
            if (question.questionNumber === currentQuestion) {
              return { ...option, selected: 0 };
            }
            return option;
          });
          return { ...question, optionBeans: updateOption };
        });

        return { ...pgQuestion, pgQuesmasters: updateQuestion };
      });
      // console.log("updateQuestion", optionUpdate);

      setAllQuestion([{ ...questionSet, paragraphQuestions: optionUpdate }]);
    }

    // Save Question button
    const val = clickBtn.map((btn) => {
      if (btn.number === currentQuestion) return { ...btn, markAndSave: false, markReview: false, saveAndReview: false };
      return btn;
    });
    setClickBtn(val);
  };

  const handleMarkForReview = (e) => {
    handleClearResponse();
    const clickUpdate = clickBtn.map((btn) => {
      if (btn.number === currentQuestion) return { ...btn, markReview: true, markAndSave: false, saveAndReview: false };
      return btn;
    });
    setClickBtn(clickUpdate);
    handleNext();
  };

  const handleSaveAndMark = (e) => {
    const notMarkAnswer = handleSaveNext(e);
    if (notMarkAnswer) return;
    const clickUpdate = clickBtn.map((btn) => {
      if (btn.number === currentQuestion) return { ...btn, markReview: true, markAndSave: false, saveAndReview: true };
      return btn;
    });
    setClickBtn(clickUpdate);
  };

  const question = filter.map((question, idx) => (
    <div style={{ position: "relative" }} key={idx}>
      <label className={`questions-mcq-mobile`}>
        Q{question.questionNumber}.&nbsp;&nbsp; &nbsp;
        <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
      </label>
      <br />
      {question.optionBeans.map((answer, key) => (
        <div className="form-check form-check-media" style={{ margin: "0 0 0 45px" }} key={key}>
          <input type="radio" className="form-check-input" id={answer.optionId} aria-checked={answer.selected || 0} value={answer.optionId} name={question.quesId} />
          <label htmlFor={answer.optionId} className="form-check-label questions-mcq-mobile">
            <span dangerouslySetInnerHTML={{ __html: answer.optionValue }}></span>
          </label>
        </div>
      ))}
      <div className="d-flex flex-wrap gap-1 mt-5">
        <button className="btn-mcq" type="button" style={{ background: "teal" }} onClick={handleSaveNext}>
          Save & Next
        </button>
        <button className="btn-mcq" type="button" onClick={handleSaveAndMark}>
          Save & Mark for Review
        </button>
        <button className="btn-mcq" type="button" style={{ background: "lightblue" }} onClick={handleClearResponse}>
          Clear Response
        </button>
        <button className="btn-mcq" type="button" style={{ background: "orange" }} onClick={handleMarkForReview}>
          Mark for Review & Next
        </button>
      </div>
    </div>
  ));

  return <>{question}</>;
}

// memo(function McqQuestions({ items, i }) {
//   return (
//     <div style={{ position: "relative" }}>
//       <label className={`${"m" + i} questions-mcq-mobile`}>
//         Q{items.questionNumber}.&nbsp;&nbsp; &nbsp;
//         <span dangerouslySetInnerHTML={{ __html: items.question }}></span>
//       </label>
//       <br />
//       {items.optionBeans.map((answer, key) => (
//         <div className="form-check form-check-media" style={{ margin: "0 0 0 45px" }} key={key}>
//           <input
//             type="radio"
//             className="form-check-input"
//             id={items.optionBeans[0].optionId}
//             name={items.quesId}
//             value={answer.optionId}
//             ariaValueText={items.optionBeans.optionId}
//             onChange={(e) => {}}
//           />
//           <label className="form-check-label questions-mcq-mobile">
//             <span
//               dangerouslySetInnerHTML={{
//                 __html: answer.optionValue,
//               }}
//             ></span>
//           </label>
//         </div>
//       ))}
//       <div className="clear-bookmark">
//         <div
//           className="clear-mcq-selection bookmark-question"
//           onClick={() => {
//             // clearAnswerSet(items.quesId, "mcq");
//             // const ele = document.getElementsByName(`${items.quesId}`);
//             // for (let i = 0; i < ele.length; i++) ele[i].checked = false;
//           }}
//         >
//           <p>Clear</p>
//         </div>
//         <div className="bookmark-question" style={{ marginLeft: "-20px" }}>
//           <p
//             style={{
//               position: "absolute",
//               top: "-18px",
//               left: "-53px",
//             }}
//             onClick={(e) => {
//               //   bookMark(e, items.quesId, "mcq");
//             }}
//           >
//             <AiFillFlag style={{ pointerEvents: "none" }} />
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// });

/* MCQ QUESTION */

/* {item.quesmasters.map((items, i) => (

                  <McqQuestions key={i + "" + idx} {...{ items, i }} />
                ))} */

/* PARA QUESTION */

/* {item.paragraphQuestions.map((paragraph, index) => ({
                  /* <ParaQuestions item={paragraph} key={idx + "" + index + index} {...{ clearAnswerSet, AnswerSet, answerAttempt, bookMark, index }} /> */
/* }))} */

//   console.log("questionSet", questionSet.quesmasters);

/* <div className="clear-bookmark">
    <div
      className="clear-mcq-selection bookmark-question"
      // clearAnswerSet(items.quesId, "mcq");
      onClick={() => {
        const ele = document.getElementsByName(`${question.quesId}`);
        for (let i = 0; i < ele.length; i++) ele[i].checked = false;
      }}
    >
      <p>Clear</p>
    </div>
    <div className="bookmark-question" style={{ marginLeft: "-20px" }}>
      <p
        style={{ position: "absolute", top: "-18px", left: "-53px" }}
        onClick={(e) => {
          //   bookMark(e, items.quesId, "mcq");
        }}
      >
        <AiFillFlag style={{ pointerEvents: "none" }} />
      </p>
    </div>
  </div> */
