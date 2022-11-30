import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../../Components/baseUrl";

import { AiOutlineEye } from "react-icons/ai";
// import { memo } from "react";

// PaymentOrder.defaultProps = {
//   paydata: [],
// };

const PDF_DOC = memo(({ orderNo }) => {
  const [pdfFile, setPdfFile] = useState("");
  // console.log("🚀 ~ file: PaymentOrder.jsx ~ line 70 ~ PaymentOrder ~ paydata");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const config = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
        };
        const pdf = await axios.get(baseUrl() + "/pg/getInvoicePdf/" + orderNo, { headers: config, data: {} });
        const data = await pdf.data;
        let fileURL;
        if (data.ResultCode === "200") {
          const arrFile = new Uint8Array(JSON.parse(data.Data.invoicePdfByteArrStr));
          const file = new Blob([arrFile], { type: "application/pdf" });
          fileURL = URL.createObjectURL(file);
          console.log("✅ FETCH SUCCESS");
        } else {
          fileURL = "";
          console.log("⚠️ NO File Contain");
        }
        setPdfFile(fileURL);
      } catch (errors) {
        console.log(errors.message);
        console.log("❌ FAIL TO FETCH");
      }
    };
    fetchPdf();
    // console.log("🚀 ~ file: PaymentOrder.jsx ~ line 39 ~ PaymentOrder ~ paydata");
    return () => {
      // console.log("🚀 ~ file: PaymentOrder.jsx ~ line 42 ~ PaymentOrder ~ paydata");
      setPdfFile("");
    };
  }, [orderNo]);

  return <iframe src={pdfFile} title="modal" frameborder="0" width={"100%"} height={"700px"} allowfullscreen></iframe>;
});

const PaymentOrder = memo((props) => {
  const { paydata } = props;

  const [orderNo, setOrderNo] = useState("");
  useEffect(() => {
    const val = paydata.map((obj) => {
      const date = obj.orderDate.split(" ")[0] ? obj.orderDate.split(" ")[0] : obj.orderDate;
      // console.log(obj.orderDate.split(" "));
      let value = obj.orderDate;
      if (date !== obj.orderDate) {
        const spl = date.split("-");
        const newDate = spl.reverse().join("-") + " " + obj.orderDate.split(" ")[1] + " " + obj.orderDate.split(" ")[2];
        value = newDate;
        // console.log(value);
      }
      return { ...obj, date: new Date(value).getTime() };
    });

    console.log("VALUE = ", val);
    const sortedDesc = val.sort((objA, objB) => Number(objB.date) - Number(objA.date));

    console.log(sortedDesc);
  }, [paydata]);

  return (
    <div>
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr className="text-center">
              <th></th>
              {/* <th></th> */}
              <th>Pack Name</th>
              <th>Order No.</th>
              <th>Amount</th>
              <th>Order Date</th>
              <th>Bank RefId</th>
              <th className="text-nowrap">Activated on</th>
              <th className="text-nowrap">Expiring on</th>
              <th className="">Order Status</th>
              <th className="text-nowrap">Invoice</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {paydata.map((paymentVal, i) => (
              <tr>
                {/* <td class="align-middle"></td> */}
                <td class="align-middle" style={{ color: "#7b1fa2" }}>
                  {paymentVal.courseName}
                </td>
                <td class="align-middle opacity-50">{paymentVal.packName}</td>
                <td class="align-middle opacity-50">{paymentVal.orderNo}</td>
                <td class="align-middle opacity-50 text-nowrap">Rs. {paymentVal.orderAmt}</td>
                <td class="align-middle opacity-50 text-nowrap">{paymentVal.orderDate}</td>
                <td class="align-middle opacity-50">{paymentVal.bankRefId}</td>
                <td class="align-middle opacity-50 text-nowrap">{paymentVal.packActivatedOn}</td>
                <td class="align-middle opacity-50 text-nowrap">{paymentVal.packExpiringOn}</td>
                <td class="align-middle opacity-50 ">{paymentVal.orderStatus}</td>
                <td class="align-middle">
                  <button
                    type="button"
                    className="btn main-btn m-2"
                    data-bs-toggle="modal"
                    onClick={() => setOrderNo(paymentVal.orderNo)}
                    data-bs-target={"#ViewInvoiceModal"}
                    disabled={paymentVal.orderStatus === "Failed"}
                  >
                    <AiOutlineEye /> View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewInvoiceModal orderNo={orderNo} />
    </div>
  );
});

const ViewInvoiceModal = memo(({ orderNo = "", index }) => {
  console.log("render");
  const fetchPdfDown = async () => {
    try {
      const config = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: Cookies.get("token"),
      };
      const pdf = await axios.get(baseUrl() + "/pg/getInvoicePdf/" + orderNo, { headers: config, data: {} });
      const data = await pdf.data;
      console.log("✅ FETCH SUCCESS");
      const arrFile = new Uint8Array(JSON.parse(data.Data.invoicePdfByteArrStr));
      const file = new Blob([arrFile], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = data.Data.invoicePdfName;
      link.dispatchEvent(new MouseEvent("click"));
    } catch (errors) {
      console.log(errors.message);
      console.log("❌ FAIL TO FETCH");
    }
  };

  return (
    <>
      {/* eslint-disable-next-line */}
      <div className="modal fade" id={"ViewInvoiceModal"} role="dialog" tabIndex="-1" aria-labelledby={"ViewInvoiceModalLabel"} aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={"ViewInvoiceModalLabel"}>
                View Invoice
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body overflow-hidden">
              <PDF_DOC orderNo={orderNo} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn main-btn" onClick={fetchPdfDown}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default PaymentOrder;

// <tr>
//               <td class="align-middle"></td>
//               <td class="align-middle" style={{ color: "#7b1fa2" }}>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, perferendis.
//               </td>
//               <td class="align-middle opacity-50">Sept 5, 2022</td>
//               <td class="align-middle opacity-50">Rs. 0</td>
//               <td class="align-middle opacity-50">Free Coupon</td>
//               <td>
//                 <button className="btn main-btn m-2">Receipt</button>
//               </td>
//             </tr>
//             <tr>
//               <td class="align-middle">{/* <AiOutlineShoppingCart size={20} /> */}</td>
//               <td class="align-middle" style={{ color: "#7b1fa2" }}>
//                 Lorem ipsum dolor s elit. Aperiam, architecto? Commodi sapiente error nihil ducimus.
//               </td>
//               <td class="align-middle opacity-50">Dec 23, 2022</td>
//               <td class="align-middle opacity-50">Rs. 0</td>
//               <td class="align-middle opacity-50">Free Coupon</td>
//               <td class="align-middle">
//                 <button className="btn main-btn m-2">Receipt</button>
//               </td>
//             </tr>
