import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const FAQ_VAL = [
  { query: "Are there any free practice papers?", reply: "Yes, there will be free practice papers." },
  { query: "For which standard the courses are available?", reply: "Currently, we are providing guidance for CUET (UG)2022." },
  { query: "Do I need to subscribe?", reply: "Yes, you need to subscribe for it." },
  { query: "How can we contact and report an error, if found?", reply: "A student can contact with BESST team on given whatsapp number and also via email." },
  { query: "Is regional language available?", reply: "Yes, regional language paper like Bengali and Assamese are available." },
];

const styles = {
  container: { paddingTop: "6.25rem", paddingBottom: "6.25rem" },
  blackColor: { color: "black" },
  innerContainer: { maxWidth: "50rem" },
};

const FAQ = () => {
  return (
    <div className="bg-light container-fluid" style={styles.container}>
      <div className="mx-auto" style={styles.innerContainer}>
        <ul class="list-group bg-body ">
          <li class="list-group-item bg-light fw-bolder p-3 fs-5 d-flex align-items-center gap-2">
            <AiOutlineQuestionCircle size={20} /> <span style={styles.blackColor}>Frequent Asked Questions</span>
          </li>
          <li class="list-group-item list-group-item-white p-4">
            <div class="accordion accordion-flush bg-white" id="accordionFlushFAQ">
              {FAQ_VAL.map((val, index) => (
                <div class="accordion-item border rounded bg-white my-3 overflow-hidden" key={index}>
                  <h2 class="accordion-header border-0" id="flush-headingOne">
                    <button
                      class="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#flush-collapseOne" + index}
                      aria-expanded="false"
                      aria-controls={"flush-collapseOne" + index}
                    >
                      {val.query}
                    </button>
                  </h2>
                  <div id={"flush-collapseOne" + index} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushFAQ">
                    <div class="accordion-body">{val.reply}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 mb-5">
              <Link style={{ width: "10.12rem" }} to="/FAQ" type="button" className="btn btn-outline-secondary main-color mx-auto d-block">
                <span className="fw-bolder text-uppercase m-3">Veiw More</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FAQ;
