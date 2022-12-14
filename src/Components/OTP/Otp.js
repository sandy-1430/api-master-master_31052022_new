import React from "react";
import "./otp.css";

function Otp() {
	document.addEventListener("DOMContentLoaded", function (event) {
		function OTPInput() {
		  const inputs = document.querySelectorAll("#otp > *[id]");
		  for (let i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener("keydown", function (event) {
			  if (event.key === "Backspace") {
				inputs[i].value = "";
				if (i !== 0) inputs[i - 1].focus();
			  } else {
				if (i === inputs.length - 1 && inputs[i].value !== "") {
				  return true;
				} else if (event.keyCode > 47 && event.keyCode < 58) {
				  inputs[i].value = event.key;
				  if (i !== inputs.length - 1) inputs[i + 1].focus();
				  event.preventDefault();
				} else if (event.keyCode > 64 && event.keyCode < 91) {
				  inputs[i].value = String.fromCharCode(event.keyCode);
				  if (i !== inputs.length - 1) inputs[i + 1].focus();
				  event.preventDefault();
				}
			  }
			});
		  }
		}
		OTPInput();
	  });
	  
	
  return (
    <div className="container height-100 d-flex justify-content-center align-items-center">
      <div className="position-relative">
        <div className="card p-2 text-center">
          <div
            id="otp"
            className="otp-inputs d-flex flex-row justify-content-center mt-2"
          >
            {" "}
            <input
              className="m-2 text-center form-control rounded"
              type="text"
              id="first"
              maxlength="1"
            />{" "}
            <input
              className="m-2 text-center form-control rounded"
              type="text"
              id="second"
              maxlength="1"
            />{" "}
            <input
              className="m-2 text-center form-control rounded"
              type="text"
              id="third"
              maxlength="1"
            />{" "}
            <input
              className="m-2 text-center form-control rounded"
              type="text"
              id="fourth"
              maxlength="1"
            />{" "}
          </div>
          <div className="mt-4">
            {" "}
            <button className="btn btn-danger px-4 validate">Verify OTP</button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
