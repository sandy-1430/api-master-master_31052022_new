import React from "react";
import { useNavigate } from "react-router";

import Fail from "../../Assets/Error.png";

export default function PaymentError({ profileData, orderId }) {
  const navigate = useNavigate();
  return (
    <>
      <div id="content" className="align-self-center fs-4 fs-md-3">
        <p>
          <strong>Error</strong>
        </p>
        <p className="pb-3">Something has gone wrong, please try again</p>
        <div className="mt-4">
          <button className="btn main-btn mr-2 mt-2 fs-5" onClick={() => navigate("/subscription")}>
            Retry again
          </button>
          <button className="btn main-btn mt-2  fs-5" onClick={() => navigate("/studentDashboard")}>
            Go to DashBoard
          </button>
        </div>
      </div>
      {/* transaction-img */}
      <div className="pb-2">
        <img src={Fail} alt="success" width={55} />
      </div>
    </>
  );
}
