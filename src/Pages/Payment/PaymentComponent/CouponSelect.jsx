/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GrFormClose } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";
import Cookies from "js-cookie";

// Payment Component
import CouponBlock from "./CouponBlock";
import baseUrl from "../../../Components/baseUrl";

import axios from "axios";
import { DecryptJSON, DecryptText } from "../../../Components/Encrypt/CryptoEncryption";

const useCouponSelect = (couponDetails, profileData, setShow, checkout) => {
  //  couponDiscount, setCouponDiscount, amount, setAmount,
  // const { couponDetails, setShow, profileData, checkout } = props;

  const defaultCouponValue = {
    couponValue: 0,
    couponCode: "",
    couponLabel: "",
  };

  // FIXME:
  // const price = Number(checkout[1].totalPrice.split(" ")[1]);
  // const gst = Number(checkout[1].afterDiscountGst.split(" ")[1]);
  // const valDiscount = Number(checkout[1].afterDiscountTotalPrice.split(" ")[1]);

  const [selectCoupon, setSelectedCoupon] = useState(defaultCouponValue);
  const [amount, setAmount] = useState(3001);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [discount, setDiscount] = useState(1500);
  const [afterDiscount, setAfterDiscount] = useState(amount);
  const [totalPrice, setTotalPrice] = useState(1500);

  const [validCoupon, setValidCoupon] = useState(false);
  const [inputCoupon, setInputCoupon] = useState(true);
  // Condition Need To add
  const [tax, setTax] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);

  const [apply, setApply] = useState(false);

  let navigate = useNavigate();

  // console.log(couponDetails);
  if (!couponDetails.length) {
    couponDetails = [
      { couponValue: 300, couponCode: "BESST10", couponLabel: "GET 10% OFF" },
      { couponValue: 450, couponCode: "BESST15", couponLabel: "GET 15% OFF" },
      { couponValue: 600, couponCode: "BESST20", couponLabel: "GET 20% OFF" },
    ];
  }

  useEffect(() => {
    console.log("checkout", checkout);
    try {
      if (checkout) {
        const gst = Number(checkout.taxes);
        const price = Number(checkout.actualBasePrice);
        const Discount = Number(checkout.discountAmt);
        const total = Number(checkout.totalPayableAmt);
        // setAfterDiscount(valDiscount, price);
        setAmount(price);
        setTax(gst);
        setDiscount(Discount)
        setTotalPrice(total);
        // if (gst) {
        //   setTax(gst);
        //   setSgst(0);
        // } else {
        //   setSgst(Number(checkout[1].sgst.split(" ")[1]));
        //   setCgst(Number(checkout[1].cgst.split(" ")[1]));
        // }
      }
    } catch (e) {
      console.warn(e);
      setTax(0);
      setSgst(0);
      setCgst(0);
    }
  }, [checkout]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     document.querySelector("#payment-block").scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, []);

  // DONE: CouponCode Validation
  const isActiveCoupon = async (couponCode) => {
    console.log("ACTIVE", couponCode);
    let obj;
    if (checkout.chosenDomainSubjects?.length && checkout.chosenLangSubjects?.length) {
      obj = {
        subscriptionId: checkout.subscriptionId,
        appliedCoupon: couponCode,
        chosenDomainSubjects: checkout.chosenDomainSubjects,
        chosenLangSubjects: checkout.chosenLangSubjects
      }
    } else if (checkout.chosenDomainSubjects?.length) {
      obj = {
        subscriptionId: checkout.subscriptionId,
        appliedCoupon: couponCode,
        chosenDomainSubjects: checkout.chosenDomainSubjects
      }
    } else {
      obj = {
        subscriptionId: checkout.subscriptionId,
        appliedCoupon: couponCode,
      }
    }


    if (couponCode !== "") {
      // console.log(selectCoupon, "\n", profileData);
      const res = await axios.post(
        `${baseUrl()}/pg/validateCoupon`, obj,
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      );

      setAmount(res.data.Data.actualBasePrice);
      setAfterDiscount(res.data.Data.totalPayableAmt);
      setCouponDiscount(res.data.Data.couponDiscountAmt);
      setTax(res.data.Data.taxes);
      // setTaxes(res.data.Data.totalGstAmt);
      setTotalPrice(res.data.Data.totalPayableAmt);
      setDiscount(res.data.Data.discountAmt);
      // setSgst(res.data.Data.sgst);
      // setCgst(res.data.Data.cgst);

      // setAfterDiscount(discount - res.data.Data.couponDiscount);

      // setApply(res.data.ResultDescription == "FAILURE");
      if (res.data.ResultDescription != "FAILURE") {
        // setApply(true);
        setValidCoupon(true);
        setInputCoupon(true);
      } else {
        // setApply(false);
        // setTotalPrice(res.data.Data.actualPrice * 0.5);
        // setTax(0);
        // setSgst(0);
        // setCgst(0);
        // setSelectedCoupon((prev) => ({ ...prev, couponCode: "" }));
        setValidCoupon(false);
        setInputCoupon(false);
        setAfterDiscount(amount);
      }
    }
  };

  // useMemo(() => , []);

  // useEffect(() => {
  //   console.log("Dis ==> ", discount);
  //   setTotalPrice(discount + tax);
  // }, [afterDiscount, amount, validCoupon, tax]);
  // const paymentCall = () => {};

  return {
    amount: amount,
    discount: discount,
    tax: tax,
    totalPrice: totalPrice,
    couponCode: selectCoupon.couponCode,
    couponDiscount: couponDiscount,
    sgst: sgst,
    cgst: cgst,
    taxes: taxes,
    validCoupon: validCoupon,
    afterDiscount: afterDiscount,
    render: (
      <>
        <section
          className="container py-3"
          style={{
            display: "flex",
            overflowX: "hidden",
            gap: 10,
            flexWrap: "wrap",
          }}
          id="payment-block"
        >
          <div style={{ flexGrow: 2 }}>
            <h5 style={{ color: "rgb(123, 31, 162)" }}>
              {" "}
              <RiCoupon3Fill /> Coupon Code
            </h5>
            <hr style={{ width: "40%" }} />
            {/* couponCode */}
            <div
              style={{ width: "100%", padding: "0px 15px", position: "relative" }}
              className="btn-group-vertical"
              role="group"
              aria-label="Basic radio toggle button group"
            ></div>

            {couponDetails?.map((item, index) => (
              <CouponBlock
                item={item}
                key={index}
                setCouponDiscount={setCouponDiscount}
                setAfterDiscount={setAfterDiscount}
                setSelectedCoupon={setSelectedCoupon}
                amount={discount}
                setValidCoupon={setValidCoupon}
                selectedCoupon={selectCoupon}
                isActiveCoupon={isActiveCoupon}
              />
            ))}

            <div className="my-3" style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "50%", position: "relative" }}>
                <input
                  type="text"
                  value={selectCoupon.couponCode}
                  onChange={(e) => {
                    if (!validCoupon)
                      setSelectedCoupon({
                        ...selectCoupon,
                        couponCode: e.target.value,
                      });
                  }}
                  className="form-control mr-4"
                  id="formGroupExampleInput"
                  placeholder="Enter coupon"
                  style={{ padding: "12px", width: "100%" }}
                />
                <div style={{ position: "absolute", right: "10px", top: "8px" }}>
                  <GrFormClose
                    onClick={() => {
                      setValidCoupon(false);
                      setSelectedCoupon(defaultCouponValue);
                      setAfterDiscount(amount);
                      // Set to default value
                      setCouponDiscount(0);
                      setTax(checkout.taxes);
                      setTotalPrice(checkout.totalPayableAmt);
                    }}
                    size={20}
                    style={validCoupon ? { display: "inline" } : { display: "none" }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  isActiveCoupon(selectCoupon.couponCode);
                }}
                className="btn main-btn ml-3"
                style={{ display: validCoupon ? "none" : "flex" }}
                disabled={!validCoupon ? false : true}
              >
                APPLY
              </button>
            </div>

            {/* TODO: Success message or Fail message */}

            <div>{validCoupon ? <div className="text-success">Coupon Activate Sucessfully</div> : ""}</div>
            <div>{inputCoupon || validCoupon ? "" : <div className="text-danger">Fail to Activate Coupon</div>}</div>
          </div>

          <div style={{ flexGrow: 2, position: "relative" }}>
            <div className="border " style={{ height: "100%" }}>
              <div className="p-2 ">
                <div>
                  <p style={{ fontSize: "20px", color: "#7b1fa2", fontWeight: "bold" }}>
                    <IoIosPricetags /> Payment Summary{" "}
                  </p>
                  <hr />
                </div>
                <div className="d-flex justify-content-between ">
                  <p>Amount</p>
                  <p>
                    <BiRupee /> {amount}
                  </p>
                </div>
                <div className="d-flex justify-content-between ">
                  <p>Discount</p>
                  <p>
                    <BiRupee /> {discount}
                  </p>
                </div>

                <div style={validCoupon ? { display: "block" } : { display: "none" }}>
                  <div className="d-flex justify-content-between ">
                    <p>Coupon Applied</p>
                    <p>{selectCoupon.couponCode}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between ">
                  <p>Coupon Discount</p>
                  {couponDiscount === 0 ? (
                    <p>
                      <BiRupee /> 0
                    </p>
                  ) : (
                    <p>
                      - <BiRupee /> {couponDiscount}
                    </p>
                  )}
                </div>
                {/* TODO: Place the condition wheater it igst or cgst/sgst */}
                {taxes !== "" && taxes !== 0 && taxes !== null ? (
                  <>
                    <div className="d-flex justify-content-between ">
                      <p>Taxes</p>
                      <p>
                        <BiRupee /> {taxes}
                        {/* FIXME: SGST tax Change*/}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-between ">
                      <p>Taxes</p>
                      <p>
                        <BiRupee /> {tax}
                      </p>
                    </div>
                  </>
                )}

                <div style={validCoupon ? { display: "block" } : { display: "none" }}>
                  <hr />
                  <div className="d-flex justify-content-between text-success">
                    <p>After Discount Price</p>
                    <p>
                      <BiRupee /> {afterDiscount}
                    </p>
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-between ">
                  <p>Total Amount</p>
                  <p>
                    <BiRupee /> {totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    ),
  };
};

export default useCouponSelect;

//

{
  /* <div
  className="border border-2 text-center d-flex "
  style={{
    width: "100%",
    marginTop: "36px",
    justifyContent: "center",
  }}
>
  <button
    className="btn main-btn m-2"
    // to="/payment-gateway"
    style={{ width: "fit-content" }}
    onClick={() => paymentHandler()}
  >
   
    Proceed To Pay
   
  </button>

  <button onClick={() => setShow(false)} className="btn btn-outline-secondary m-2" style={{ width: "fit-content" }}>
    cancel
  </button>
</div>; */
}

// const paymentHandler = () => {
//   // TODO: payment data handle POST // appliedCoupon, userId, email, orderAmt;

//   if (Cookies.get("token") !== null) {
//     axios
//       .post(
//         baseUrl() + "/pg/initiatePayment",
//         {
//           appliedCoupon: selectCoupon.couponCode,
//           userId: profileData.userId,
//           orderAmt: totalPrice,
//           email: Cookies.get("email"),
//           subscriptionName: "Premium checkout",
//           courseId: profileData.courseBeans[0].courseId,
//         },
//         {
//           headers: {
//             "Acces-Control-Allow-Origin": "*",
//             Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
//             Authorization: `${Cookies.get("token")}`,
//           },
//         }
//       )
//       .then(async (response) => {
//         if (response.status === 200) {
//           console.log(response.data.Data);
//           const { mid, orderId, txnToken } = response.data.Data;

//           if (mid === null) {
//             console.log("MID IS NULL due to invalid Coupon Code");
//             // return;
//           }
//           // MID ENCRYPTED
//           const decryptMid = DecryptText(mid);
//           // console.log(mid, orderId, txnToken);

//           window.open(`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${decryptMid}&orderId=${orderId}&txnToken=${txnToken}&flow=checkout&mode=webview`, "_self");
//         }
//       })
//       .catch((e) => {
//         // FIXME: remove the comment after done
//         // navigate("/");
//         console.log(e);
//       });
//   }
// };
