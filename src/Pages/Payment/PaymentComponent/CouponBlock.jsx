import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function CouponBlock(props) {
  const { item, selectedCoupon, setValidCoupon, setSelectedCoupon, setAfterDiscount, amount, setCouponDiscount, isActiveCoupon } = props;
  // console.log(isActiveCoupon);
  let couponValid = selectedCoupon.couponCode;
  if (!selectedCoupon.couponCode) {
    couponValid = "__NO_COUPON__";
  }
  console.log(item.couponCode, selectedCoupon.couponCode);
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <input type="radio" className="btn-check" name="btnradio" id={item.couponCode} autoComplete="off" defaultChecked={item.couponCode === selectedCoupon.couponCode} />
        <label
          style={{
            width: "fit-content",
            textAlign: "left",
            borderRadius: "5px",
            height: "40px",
            backgroundColor: "white",
            color: "rgb(123 31 162)",
          }}
          className="btn btn-outline-secondary"
          htmlFor={item.couponCode}
          onClick={() => {
            setSelectedCoupon((prev) => ({ ...prev, ...item }));
            isActiveCoupon(item.couponCode);
            // setCouponDiscount(item?.couponDiscount);
            // setAfterDiscount(amount - item.couponValue);
            // setValidCoupon(true);
          }}
        >
          {item.couponCode}
        </label>
        <div>
          <span style={{ fontSize: "14px", color: "#7b1fa2" }} className="">
            {item.couponLabel}
          </span>
          <p style={{ fontSize: "12px", color: "grey" }}>
            {" "}
            <BiDotsHorizontalRounded /> Use this coupon and get instant discount on your purchase.{" "}
          </p>
        </div>
      </div>

      <br />
    </>
  );
}
