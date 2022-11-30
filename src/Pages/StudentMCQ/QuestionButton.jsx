import React from "react";

export default function QuestionButton({ clickBtn, setCurrentQuestion, currentQuestion }) {
  const handleChangeQuestion = (e) => {
    console.log(e.target);
    setCurrentQuestion(Number(e.target.id));
  };

  const handleStyle = (btnProps) => {
    const styles = { border: "2px solid gray", background: "white" };
    if (btnProps.number === currentQuestion) styles.border = "2px solid red";
    if (btnProps.markAndSave) styles.background = "green";
    if (btnProps.markReview) styles.background = "orange";
    return styles;
  };

  return (
    <div className="row flex-lg-wrap flex-nowrap py-3" style={{ overflowY: "scroll" }}>
      {clickBtn.map((btn) => (
        <div className="col-3 mt-2" key={btn.number}>
          <button type="button" className="btn btn-question" style={handleStyle(btn)} id={btn.number} onClick={handleChangeQuestion}>
            <span className="btn-que-mark" style={btn.saveAndReview ? { display: "block" } : {}}></span>
            {btn.number}
          </button>
        </div>
      ))}
    </div>
  );
}
