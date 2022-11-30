import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import baseUrl from "../../Components/baseUrl";

export default function Address({
  profileData,
  billingDetails,
  updateBillingDetails,
  setUpdateBillingDetails,
  handleSaveBillingAddr,
  setAddNewGst,
  addNewGst,
  addNewAddress,
  setAddNewAddress,
  stateList,
  navigate,
}) {
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    console.log("Successfully 🚀");

    if (updateBillingDetails?.stateCode) {
      axios
        .get(
          baseUrl() +
          "/df/getDistrictsForState/" +
          updateBillingDetails?.stateCode,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
              Authorization: `${Cookies.get("token")}`,
            },
            data: {},
          }
        )
        .then((res) => res.data)
        .then((data) => {
          setCityList(data.Data);
        });
    }
  }, [updateBillingDetails?.stateCode]);

  const onHandle = (e) => {
    console.log(e.target.id);
    if (e.target.id === "profile-addr") {
      setUpdateBillingDetails((prev) => ({
        ...prev,
        stateName: profileData.state,
        stateCode: profileData?.stateCode || "",
        address: profileData.address,
        city: profileData.city,
        pincode: profileData.pincode,
      }));
      setAddNewAddress(false);
    } else if (e.target.id === "bill-addr") {
      setUpdateBillingDetails((prev) => ({
        ...prev,
        stateName: billingDetails.stateName,
        stateCode: billingDetails.stateCode,
        address: billingDetails.address,
        city: billingDetails.city,
        pincode: billingDetails.pincode,
      }));
      setAddNewAddress(false);
    } else {
      setUpdateBillingDetails((prev) => ({
        ...prev,
        stateName: "",
        stateCode: "",
        address: "",
        city: "",
        pincode: "",
      }));
      setAddNewAddress(true);
    }
  };

  const onHandleGst = () => {
    addNewGst ? setAddNewGst(false) : setAddNewGst(true);
  };


  const [selectEvent, setSelectEvent] = useState(false);
  const onHandleChange = (e) => {
    setUpdateBillingDetails((prevBillingDetails) => ({
      ...prevBillingDetails,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "city") setSelectEvent(true);
    else setSelectEvent(false);
  };
  return (
    <>
      <div className="d-flex gap-3">
        <input
          type="radio"
          id="profile-addr"
          style={{ width: "25px" }}
          name="update"
          onClick={onHandle}
          defaultChecked={true}
        />
        <label htmlFor="profile-addr">
          Profile Address Location at <br />
          <strong>
            Address: {profileData?.address || ""}
            <br /> City: {profileData?.city || ""}
            <br /> State: {profileData?.state || ""}
            <br /> Pincode: {profileData?.pincode || ""}
            <br />
          </strong>
        </label>
      </div>
      <hr />
      <div>
        <input
          type="radio"
          id="newAddress"
          name="update"
          style={{ width: "25px" }}
          onClick={onHandle}
        />
        <label htmlFor="newAddress" className="mt-2">
          Add a New Address
        </label>

        {addNewAddress && (
          <>
            <div className="d-flex flex-column gap-2 align-items-start justify-content-between mt-3">
              <h5>Billing Address</h5>
              <label htmlFor="address" className="bold">
                Address
              </label>
              <input
                type="text"
                placeholder="address"
                value={updateBillingDetails?.address}
                onChange={onHandleChange}
                name="address"
                id="address"
              />
              {/* <input type="text" placeholder="city" value={updateBillingDetails?.city} onChange={onHandleChange} name="city" /> */}

              {/* </div> */}
              <label htmlFor="state" className="bold">
                State
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                // billingDetails.stateName
                value={updateBillingDetails.stateName}
                style={{ width: "100%", padding: 10 }}
                onChange={(event) => {
                  let val = stateList.filter(
                    (e) => e.stateName === event.target.value
                  );
                  setUpdateBillingDetails((prev) => ({
                    ...prev,
                    stateName: event.target.value,
                    stateCode: val[0].stateCode,
                  }));
                }}
              >
                <option
                  style={
                    updateBillingDetails.stateName === null ||
                      updateBillingDetails.stateName === ""
                      ? { display: "inline-block" }
                      : { display: "none" }
                  }
                  value="null"
                >
                  SELECT THE STATE
                </option>
                {stateList.length > 0
                  ? stateList.map((item, index) => (
                    <option key={index} value={item.stateName}>
                      {item.stateName}
                    </option>
                  ))
                  : ""}
              </select>
              <label
                htmlFor="dist"
                className="bold position-relative"
                style={{ width: "100%" }}
              >
                City
                {/* <div> */}
                <input
                  type="text"
                  autoComplete="off"
                  id="dist"
                  value={updateBillingDetails?.city || ""}
                  name="city"
                  onChange={onHandleChange}
                  placeholder="City"
                />
                <br />
                <div
                  className="position-absolute bg-light"
                  style={
                    selectEvent && updateBillingDetails.city
                      ? {
                        maxHeight: "300px",
                        width: "100%",
                        overflow: "scroll",
                        zIndex: "234",
                      }
                      : { display: "none" }
                  }
                >
                  {cityList
                    .filter(
                      ({ districtName }) =>
                        districtName.indexOf(
                          updateBillingDetails.city.toUpperCase()
                        ) > -1
                    )
                    .map((city, index) => (
                      <option
                        key={index}
                        value={city.districtName}
                        onClick={(e) => {
                          console.log("value 🚀", e.target.value);
                          setUpdateBillingDetails((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }));
                          setSelectEvent(false);
                        }}
                        className="border p-3 bg-light"
                      >
                        {city.districtName}
                      </option>
                    ))}
                </div>
              </label>
              <label htmlFor="pincode" className="bold">
                Pincode
              </label>
              <input
                type="text"
                placeholder="pincode"
                value={updateBillingDetails?.pincode || ""}
                onChange={onHandleChange}
                name="pincode"
              />
            </div>
          </>
        )}
      </div>
      {/* <input
        type="checkbox"
        id="GstNum"
        name="update"
        style={{ width: "25px" }}
        onClick={onHandleGst}
      />
      <label htmlFor="GstNum" className="mt-2">
        Gst number:
      </label>
      {addNewGst ? (
        <input
          type="text"
          placeholder="gst Number"
          value={updateBillingDetails?.gstNo || ""}
          onChange={(e) =>
            setUpdateBillingDetails((prevBillingDetails) => ({
              ...prevBillingDetails,
              gstNo: e.target.value,
            }))
          }
          name="gstNo"
        />
      ) : (
        ""
      )} */}
    </>
  );
}
