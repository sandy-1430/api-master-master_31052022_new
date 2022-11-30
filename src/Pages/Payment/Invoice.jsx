import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import useRemoveModal from "../../Components/useRemoveModal";
import "./payment.css";
import { Link, useNavigate } from "react-router-dom";
import Under from "../../Assets/under1.png";
import "./invoice.css";

function Invoice() {
  const [profileData, setProfileData] = useState([]);
  const [pack, setPack] = useState([]);
  const navigate = useNavigate();

  useRemoveModal();
  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  useEffect(() => {
    if (Cookies.get("token") !== null) {
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
            // console.log(response.data);
          }
        })
        .catch((e) => {
          navigate("/");
          console.log(e);
        });
    }
  }, []);

  const [gstCal, setGstCal] = useState(0);
  const [uid, setUid] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [actualPrice, setActualPrice] = useState(0);
  const [billModal, setBillModal] = useState(false);
  useEffect(() => {
    fetch(`${baseUrl()}/df/findSubscriptionPlan/2`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // const calTotal = data.result[1].totalPrice - data.result[1].afterDiscountGst - data.result[1].afterDiscountGst;
        setPack(data.result[1]);
        setActualPrice(
          data.result[1].totalPrice.split(" ")[1] -
            data.result[1].afterDiscountTotalPrice.split(" ")[1]
        );
        setGstCal(parseInt(data.result[1].afterDiscountGst.split(" ")[1]) / 2);
        setUid(create_UUID());
        setCurrentDate(new Date().toISOString().split("T")[0]);

        // console.log(data.result[1]);
      });
  }, []);

  useEffect(() => {
    fetch(`${baseUrl()}/df/findAllCoupanMaster/2`, {
      method: "GET",
      "Acces-Control-Allow-Origin": "*",
      Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  function create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxx-xxxx-4xxx-yxxx-xxxxxx".replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  return (
    <>
      <Header profileData={profileData} />
      <div className="invoice-page">
        {/* <h1>Invoice</h1>
        <div className="invoice-basic-details">
          <p>
            <span>Name:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Test</span>
          </p>
          <p>
            <span>Mobile:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>7676767676</span>
          </p>
          <p>
            <span>Email:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>test@besst.com</span>
          </p>
        </div> */}
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          id="sheet0"
          className="sheet0 gridlines"
          style={{
            transform: "scale(0.7)",
            width: "75%",

            margin: "auto",
            marginTop: "-150px",
          }}
        >
          <col className="col0" />
          <col className="col1" />
          <col className="col2" />
          <col className="col3" />
          <col className="col4" />
          <col className="col5" />
          <col className="col6" />
          <col className="col7" />
          <col className="col8" />
          <col className="col9" />
          <tbody>
            <tr className="row3">
              <td
                className="column2 style10 s style11"
                style={{ fontSize: "20px", textAlign: "center" }}
                colspan="8"
              >
                Tax Invoice
              </td>
            </tr>
            <tr className="row4">
              <td className="column0">&nbsp;</td>
              <td className="column1">&nbsp;</td>
              <td className="column2 style33 null"></td>
              <td className="column3 style34 null"></td>
              <td className="column4 style34 null"></td>
              <td className="column5 style34 null"></td>
              <td className="column6 style9 s style11" colspan="4">
                Invoice Number # {uid}
              </td>
            </tr>
            <tr className="row5">
              <td className="column2 style12 s style14 text-center" colspan="8">
                Brahmaputra Exam Success Support Team Private Limited
              </td>
            </tr>
            <tr className="row6">
              <td className="column2 style15 s style16" colspan="2">
                37, 2nd bye lane
                <br />
                B.R.Mazumdar Path
                <br />
                Banghorbori, Panjabari
                <br />
                Guwahati-781037
                <br />
                Assam
              </td>
              <td className="column4 style17 s style18" colspan="3">
                Tel: 9365834467
                <br />
                Whatsapp: 9365834467
                <br />
                Email: info@besst.in
              </td>
              <td className="column7 style1 null"></td>
              <td
                className="column8 style1 null"
                style={{ position: "relative" }}
              >
                <div>
                  <img
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      left: "1px",
                      top: "20px",
                      width: "67px",
                      height: "67px",
                    }}
                    src="	https://www.besst.in/registration/static/media/logo.68b0f781c0c03e19629d.png"
                    border="0"
                  />
                </div>
              </td>
              <td className="column9 style2 null"></td>
            </tr>
            <tr className="row7">
              <td className="column2 style21 s style23" colspan="8">
                GSTIN: 18AAKCB7224J1ZF
              </td>
            </tr>
            <tr className="row8">
              <td className="column2 style3 null"></td>
              <td className="column3">&nbsp;</td>
              <td className="column4 style19 s style19" colspan="2">
                Bill To
              </td>
              <td className="column6 style19 s style20" colspan="4">
                Ship To
              </td>
            </tr>
            <tr className="row9">
              <td className="column2 style25 s style26" colspan="2">
                Order ID: {uid}
                <br />
                Order Date: {currentDate}
                <br />
                Invoice Date: {currentDate}
                <br />
                PAN: AAKCB7224J
                <br />
                CIN: U80904AS2022PTC022908
              </td>
              <td className="column4 style24 s style24" colspan="2">
                <br />
                Mr. {profileData.firstName}
                <br />
                {profileData.address}
                <br />
                {profileData.city}
                <br />
                {profileData.state}-{profileData.pincode}
                <br />
                Phone: {profileData.mobile}
              </td>
              <td className="column6 style24 s style24 text-center" colspan="4">
                Non Shipable item
              </td>
            </tr>

            <tr className="row11">
              <td className="column2 style27 s style29" colspan="8">
                Total Item: X
              </td>
            </tr>
            <tr className="row12">
              <td className="column2 style30 s">Product Details</td>
              <td className="column3 style31 s">Title</td>
              <td className="column4 style31 s">QTY</td>
              <td className="column5 style31 s">Gross Amount</td>
              <td className="column6 style31 s">Discount</td>
              <td className="column7 style31 s">Taxable Value</td>
              <td className="column8 style31 s">CGST (9%)</td>
              <td className="column8 style31 s">SGST (9%)</td>
              <td className="column9 style32 s" style={{ textAlign: "right" }}>
                Total
              </td>
            </tr>

            <tr className="row14">
              <td className="column2 style3 s">PREMIUM PACK</td>
              <td className="column3 style1 s">CUET (UG) - Premium Pack</td>
              <td className="column4 style1 n">1</td>
              <td className="column5 style4 n">{pack.totalPrice}</td>
              <td className="column6 style4 n">
                -{pack.afterDiscountTotalPrice}
              </td>
              <td className="column7 style4 n">{pack.afterDiscountPrice}</td>
              <td className="column8 style4 n">Rs.{gstCal} </td>
              <td className="column8 style4 n">Rs.{gstCal}</td>
              <td className="column9 style5 n" style={{ textAlign: "right" }}>
                {/* {pack.afterDiscountTotalPrice} */}
                {actualPrice}
              </td>
            </tr>

            <tr className="row18">
              <td className="column2 style3 null"></td>
              <td className="column3 style1 s">Total</td>
              <td className="column4 style1 n">1</td>
              <td className="column5 style4 n">{pack.totalPrice}</td>
              <td className="column6 style4 n">
                -{pack.afterDiscountTotalPrice}
              </td>
              <td className="column7 style4 n">{pack.afterDiscountPrice}</td>
              <td
                colspan="2"
                className="column8 style4 n"
                style={{ textAlign: "center" }}
              >
                {pack.afterDiscountGst}
              </td>
              <td className="column9 style5 n" style={{ textAlign: "right" }}>
                {/* {pack.afterDiscountTotalPrice} */}
                {actualPrice}
              </td>
            </tr>

            <tr className="row20">
              <td className="column2 style3 null"></td>
              <td className="column3 style1 null"></td>
              <td className="column4 style1 null"></td>
              <td className="column5 style4 null"></td>
              <td className="column6 style4 s">Grand Total</td>
              <td
                colspan="4"
                className="column8 style4 n"
                style={{ textAlign: "right" }}
              >
                {/* 1500.00 */}
                {actualPrice}
              </td>
            </tr>

            <tr className="row22">
              <td className="column2 style3 null"></td>
              <td className="column3 style1 null"></td>
              <td className="column4 style1 null"></td>
              <td className="column5 style1 null"></td>
              <td colspan="5" className="column6 style1 s">
                Brahmaputra Exam Success Support Team
              </td>
            </tr>

            <tr className="row25">
              <td className="column2 style6 null"></td>
              <td className="column3 style7 null"></td>
              <td className="column4 style7 null"></td>
              <td className="column5 style7 null"></td>
              <td colspan="5" className="column7 style7 s">
                Authorized Signatory
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          class="btn main-btn m-auto"
          data-bs-toggle="modal"
          data-bs-target="#PaymentModal"
        >
          Payment
        </button>
      </div>
      <footer className="footer mt-auto py-3 main-color-bg border-top ">
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>

      <PaymentMethod />
    </>
  );
}

function PaymentMethod() {
  return (
    <div
      class="modal fade"
      id="PaymentModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Pay Invoice
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form class="modal-body">
            {/* <form onSubmit={(e) => e.preventDefault()} method="post"> */}
            <div className="d-flex align-items-center justify-content-between">
              <p style={{ margin: 0 }}>Amount</p>
              <p style={{ margin: 0 }}>Rs 1500.00</p>
            </div>
            <div className="d-flex align-items-center justify-content-between my-4">
              <p style={{ margin: 0 }}>Coupon</p>
              <DropDown />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p style={{ margin: 0 }}>Coupon Discount</p>
              <p style={{ margin: 0 }}>Rs 00.00</p>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-4">
              <p style={{ margin: 0 }}>Total Amount Pay</p>
              <p style={{ margin: 0 }}>Rs 1500.00</p>
            </div>
          </form>
          {/* </div> */}
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <Link className="btn main-btn" to="/payment-gateway">
              Pay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDown() {
  return (
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Select Coupon
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a class="dropdown-item" href="#">
            ABCD123
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            XUSDF977
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            DESTS342
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Invoice;
