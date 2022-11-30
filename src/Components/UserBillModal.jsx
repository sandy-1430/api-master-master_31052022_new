import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "./baseUrl";
import Cookies from "js-cookie";

export default function UserBillModal({ profileData }) {
  const [billingDetails, setBillingDetails] = useState({
    stateName: null,
    stateCode: undefined,
    address: "",
    city: "",
    pincode: "",
    gstNo: "",
  });

  const [stateList, setStateList] = useState([]);
  const navigate = useNavigate();

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
            console.log(response.data.Data);
            let val = response.data.Data?.stateList.filter((e) => e.stateName === response.data.Data.state);
            console.log(val);
            setBillingDetails((prev) => ({
              ...prev,
              stateName: response.data.Data.state,
              stateCode: val[0]?.stateCode || undefined,
            }));
            setStateList((prev) => [...prev].concat(response.data.Data.stateList));
          }
        })
        .catch((e) => {
          navigate("/");
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`${baseUrl()}/pg/getUserBillingAddr`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Data);
        if (result.Data.state) {
          setBillingDetails((prev) => ({
            ...prev,
            stateName: result.Data.stateName,
            stateCode: result.Data.state,
            pincode: result.Data.pincode,
            city: result.Data.city,
            address: result.Data.address,
            gstNo: result.Data.gstNo,
          }));
        }
        //   const clickEvent = document.querySelector(".btn-validate");
        //   clickEvent.click();
      })
      .catch((err) => {
        console.log(err);
        //   const clickEvent = document.querySelector(".btn-validate");
        //   clickEvent.click();
      });
  }, []);

  const handleSaveBillingAddr = () => {
    const data = {
      email: "sankeshsinha10@gmail.com",
      address: "abcd, xyz",
      city: "Sonepat",
      state: "3",
      pincode: "131001",
    };

    axios
      .post(
        `${baseUrl()}/pg/saveUserBillingAddr`,
        {
          email: profileData.email,
          address: billingDetails.address,
          city: billingDetails.city,
          state: billingDetails.stateCode,
          pincode: billingDetails.pincode,
          gstNo: billingDetails.gstNo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        if (result.data.status === 200) navigate("/subscription");
        setBillingDetails((prev) => ({
          ...prev,
          stateName: null,
          stateCode: undefined,
          pincode: null,
          city: null,
          address: null,
          gstNo: null,
        }));
      })
      .catch((err) => console.log(err));
  };

  const onHandleChange = (e) => {
    setBillingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const isDisabled = () => (billingDetails.address === "" || billingDetails.pincode === "" || billingDetails.city === "" || billingDetails.gstNo === "" ? true : false);
  return (
    <div>
      {/* Modal */}
      <div className="modal fade" id="StateCheckModal" tabindex="-1" role="dialog" aria-labelledby="StateCheckModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="StateCheckModalLabel">
                Location Update
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                {profileData.state !== "" && profileData.state !== null ? (
                  <p>
                    Your Location at <br />
                    <strong>
                      Address: {profileData.address || ""}
                      <br /> City: {profileData.city || ""}
                      <br /> State: {profileData.state || ""}
                      <br /> Pincode: {profileData.pincode || ""}
                      <br />
                    </strong>
                  </p>
                ) : (
                  <strong>You haven't set your state yet</strong>
                )}

                {profileData.state !== "" && profileData.state !== null ? (
                  <>
                    <div className="d-flex flex-column gap-2 align-items-start justify-content-between mt-3">
                      <div>
                        <input
                          type="checkbox"
                          name=""
                          style={{ width: "25px" }}
                          onChange={(e) => {
                            if (e.target.checked) {
                              console.log(true);
                              setBillingDetails((prev) => ({
                                ...prev,
                                address: profileData.address,
                                city: profileData.city,
                                pincode: profileData.pincode,
                              }));
                            }
                          }}
                        />
                        <label htmlFor="same-address">Same as Current Address</label>
                      </div>

                      <h5>Billing Address</h5>
                      <input type="text" placeholder="address" value={billingDetails?.address || ""} onChange={onHandleChange} name="address" />
                      {/* // onChange={(e) => setBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, address: e.target.value }))} */}
                      <input type="text" placeholder="gst Number" value={billingDetails?.gstNo || ""} onChange={onHandleChange} name="gstNo" />
                      {/* // onChange={(e) => setBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, gstNo: e.target.value }))} */}
                      <input type="text" placeholder="city" value={billingDetails?.city || ""} onChange={onHandleChange} name="city" />
                      {/* // onChange={(e) => setBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, city: e.target.value }))} */}
                      <input type="text" placeholder="pincode" value={billingDetails?.pincode || ""} onChange={onHandleChange} name="pincode" />
                      {/* // onChange={(e) => setBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, pincode: e.target.value }))} */}
                      {/* <label>State:</label> */}
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={billingDetails.stateName}
                        style={{ width: "100%", padding: 10 }}
                        onChange={(event) => {
                          let val = stateList.filter((e) => e.stateName === event.target.value);
                          setBillingDetails((prev) => ({
                            ...prev,
                            stateName: event.target.value,
                            stateCode: val[0].stateCode,
                          }));
                        }}
                      >
                        <option style={billingDetails.stateName === null || billingDetails.stateName === "" ? { display: "inline-block" } : { display: "none" }} value="null">
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
                      {/* <textarea type="text" name="billing-Address" placeholder="Billing Address" style={{ width: "100%", height: "150px" }} /> */}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>

              {profileData.state !== "" && profileData.state !== null ? (
                <button type="button" class="btn main-btn" data-dismiss="modal" onClick={handleSaveBillingAddr} disabled={isDisabled()}>
                  Add Address and Proceed
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/studentProfile");
                    const modal = document.querySelector(".modal-backdrop");
                    modal.remove();
                  }}
                  class="btn main-btn"
                >
                  UPDATE
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
