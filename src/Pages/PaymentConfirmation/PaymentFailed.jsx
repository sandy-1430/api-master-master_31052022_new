import React from "react";

import Fail from "../../Assets/Fail.png";
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

export default function PaymentFailed({ profileData, orderId, transactionId, orderDate, orderValue }) {
  const navigate = useNavigate();
  return (
    <>
      <div id="content" className="align-self-center fs-4 fs-md-3">
        <p className="m-0">
          <strong>Payment Failure</strong>
          {/* Dear <span className="fw-bolder">{profileData?.firstName}</span> */}
        </p>
        <button className="view_details mb-5" data-bs-toggle="modal" data-bs-target="#InvoiceModal">
          View Transaction details
        </button>

        <div className="payment_details">
          <div className="d-flex justify-content-between">
            <p>Payment Type</p>
            <p>PayTm</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Bank Ref ID</p>
            <p>HDFCXXX</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Order date</p>
            <p>22-11-2022</p>
          </div>
          <div className="d-flex justify-content-between">
            <p><strong>Order Amount</strong></p>
            <p><strong><BiRupee />1240.00</strong></p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Transacrion ID</p>
            <p>1234284482</p>
          </div>
        </div>

        <div className="mt-4">
          <button className="btn main-btn me-3 fs-5" onClick={() => navigate("/subscription")}>
            Retry again
          </button>
          <button className="btn main-btn fs-5" onClick={() => navigate("/studentDashboard")}>
            Go to DashBoard
          </button>
        </div>
      </div>
      {/* transaction-img */}
      <div className="pb-2">
        <img src={Fail} alt="success" width={55} />
      </div>
      <InvoiceModal {...{ profileData, orderId, transactionId, orderDate, orderValue }} />
    </>
  );
}

function InvoiceModal({ profileData, orderId, transactionId, orderDate, orderValue }) {
  return (
    <>
      {/* eslint-disable-next-line */}
      <div className="modal fade" id="InvoiceModal" role="dialog" tabIndex="-1" aria-labelledby="InvoiceModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ background: "rgb(237 105 90)" }}>
              <h5 className="modal-title" id="InvoiceModalLabel" style={{ color: "white" }}>
                Payment Failed
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <div className="row">
                <div className="col-md-6 payment-receipt-details">
                  <h6>Bank Reference: </h6>
                </div>
                <div className="col-md-6 payment-receipt-details">
                  <h6>{transactionId} </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 payment-receipt-details">
                  <h6>Order No: </h6>
                </div>
                <div className="col-md-6 payment-receipt-details">
                  <h6>{orderId} </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 payment-receipt-details">
                  <h6>Order Date: </h6>
                </div>
                <div className="col-md-6 payment-receipt-details">
                  <h6>{orderDate} </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 payment-receipt-details">
                  <h6>Order Amount: </h6>
                </div>
                <div className="col-md-6 payment-receipt-details">
                  <h6>{orderValue} </h6>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
