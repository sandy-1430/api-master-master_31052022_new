import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import useRemoveModal from "../../Components/useRemoveModal";
import "./payment.css";
import "./overlay.css";
import { Link, useNavigate } from "react-router-dom";
import useCouponSelect from "./PaymentComponent/CouponSelect";
import AddressModal from "./AddressModal";
import paymentHandler from "./pay";
import { BiRupee, BiWindowOpen } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";

import { Oval } from "react-loader-spinner";
import PackInclusions from "./PackInclusions";

function Payment() {
  const [profileData, setProfileData] = useState([]);
  const [pack, setPack] = useState([]);
  useRemoveModal();
  const [couponDetails, setCouponDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const [billingDetails, setBillingDetails] = useState({
    stateName: null,
    stateCode: "",
    address: "",
    city: "",
    pincode: "",
    gstNo: "",
  });
  const [updateBillingDetails, setUpdateBillingDetails] = useState({
    stateName: null,
    stateCode: "",
    address: "",
    city: "",
    pincode: "",
    gstNo: "",
  });
  // const [paymentData, setPaymentData] = useState();
  // const [loading, setLoading] = useState(false);
  const [stateList, setStateList] = useState({});

  const [checkout, setCheckout] = useState({});

  const {
    render,
    amount,
    totalPrice,
    couponCode,
    discount,
    afterDiscount,
    tax,
    validCoupon,
    couponDiscount,
    taxes,
  } = useCouponSelect(couponDetails, profileData, setShow, checkout);

  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  const FormTitles = [
    "Change Billing Address",
    "Payment Summary",
    "Review Your Payment",
  ];
  const [page, setPage] = useState(0);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [addNewGst, setAddNewGst] = useState(false);
  const [isPrimium, setIsPrimium] = useState({ msg: "", status: 400 });

  const onModalClose = () => {
    // window.location.reload();
  };

  const PageDisplay = () => {
    if (page === 0) {
      const obj = {
        profileData,
        billingDetails,
        updateBillingDetails,
        setUpdateBillingDetails,
        handleSaveBillingAddr,
        addNewGst,
        setAddNewGst,
        addNewAddress,
        setAddNewAddress,
        stateList,
        navigate,
      };
      return <AddressModal {...obj} />;
    } else if (page === 1) {
      return show && <>{render}</>;
    } else {
      return <ReviewForm {...{ profileData }} />;
    }
  };

  // useEffect(() => {
  //   fetch(`${baseUrl()}/pg/getSubsPackCouponsTaxes/`, {
  //     method: "GET",
  //     headers: {
  //       "Acces-Control-Allow-Origin": "*",
  //       Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
  //       Authorization: `${Cookies.get("token")}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCheckout(data.Data);
  //       setCouponDetails(data.Data.avlCouponsList)
  //       // console.log(couponDetails);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
            let val = response.data.Data?.stateList.filter(
              (e) => e.stateName === response.data.Data.state
            );
            console.log(val);

            setProfileData((prev) => ({
              ...prev,
              ...response.data.Data,
              stateCode: val[0]?.stateCode,
            }));
            setStateList(response?.data?.Data.stateList);

            setUpdateBillingDetails((prev) => ({
              ...prev,
              stateName: val[0]?.stateName || "",
              stateCode: val[0]?.stateCode || "",
              pincode: response.data?.Data?.pincode,
              city: response.data?.Data?.city,
              address: response.data?.Data?.address,
            }));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleSaveBillingAddr = (e) => {
    // /|| !updateBillingDetails.stateCode || !updateBillingDetails.stateName
    if (
      !updateBillingDetails.address ||
      !updateBillingDetails.city ||
      !updateBillingDetails.stateCode
    ) {
      console.log("enter new state", updateBillingDetails);
      alert(
        "All field must be completed\n" + JSON.stringify(updateBillingDetails)
      );
      return;
    }
    console.log("enter new state EXIT");
    // return;
    axios
      .post(
        `${baseUrl()}/pg/saveUserBillingAddr`,
        {
          email: profileData.email,
          address: updateBillingDetails.address,
          city: updateBillingDetails.city,
          state: updateBillingDetails.stateCode,
          pincode: updateBillingDetails.pincode,
          // gstNo: updateBillingDetails.gstNo,
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
        setBillingDetails((prev) => ({ ...prev, ...updateBillingDetails }));
        setUpdateBillingDetails((prev) => ({ ...prev, gstNo: "" }));
        setPage((currPage) => currPage + 1);
      })
      .catch((err) => console.log(err));
  };

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
        if (result.Data?.state) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (profileData?.courseBeans?.length) {
      fetch(
        // `${baseUrl()}/df/findSubscriptionPlan/${profileData?.courseBeans[0].courseId}`,
        `${baseUrl()}/df/getAllSubscriptionPacks/${profileData?.courseBeans[0].courseId}`,
        {
          method: "GET",
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPack(data.Data);
          setIsPrimium((prev) => ({
            ...prev,
            msg: data.message,
            status: data.status,
          }));
          const payBtn = document.querySelector(".payBtn");
          console.log(payBtn);
          payBtn.style.pointerEvents = "none";
          payBtn.innerText = "Free";
        })
        .catch((e) => console.log(e));
    }
  }, [profileData.courseBeans]);

  const handleNextClick = () => {
    if (page === FormTitles.length - 1) {
      // alert("FORM SUBMITTED");
      // console.log(formData);
      setLoader(true);
      console.log(checkout);
      paymentHandler({ couponCode, profileData, totalPrice, setLoader, checkout });
    } else if (page === 0) {
      handleSaveBillingAddr();
      // setPage((currPage) => currPage + 1);
    } else {
      setPage((currPage) => currPage + 1);
    }
  };

  const [packInc, setPackInc] = useState([]);
  const [packTemp, setPackTemp] = useState([]);
  const [boolaen, setBoolaen] = useState({
    alertTxt: false,
    modalValid: false,
    disDomain: false,
    showDomain: false,
    showLang: false,
    packAlrt: false,
  });
  const [title, setTitle] = useState("");

  const disableCount = (subject) => {
    let countSelection = packTemp[0].avlDomainSubjects.filter((sub) => (sub.selection === true)).length;
    if (subject.selection) {
      subject.selection = false
      setBoolaen((prev) => ({ ...prev, disDomain: false }));
    } else {
      if (countSelection < packTemp[0].domainSubjMaxSelectCount) {
        subject.selection = true
        setBoolaen((prev) => ({ ...prev, disDomain: false }));
      } else {
        subject.selection = false
        setBoolaen((prev) => ({ ...prev, disDomain: true }));
      }
    }
  }

  const showModal = (id, label, showPopup) => {
    closeModal();
    setTitle(label);
    let temPack = pack.filter((x) => x.subscriptionId === id);
    setPackTemp(temPack);
    submitModal("avlDomainSubjects", "defaultDomainSubjCount", temPack);
    setBoolaen((prev) => ({ ...prev, disDomain: false, alertTxt: false }));
    setBoolaen((prev) => ({ ...prev, [showPopup]: true }));
  }

  const updatePack = (updateSub, obj) => {
    let updateArr = packTemp.map((pack) => {
      pack[obj] = updateSub
      return pack
    })
    setPackTemp(updateArr);
  }

  const handleDomainsub = (key) => {
    let currentSel = packTemp[0].avlDomainSubjects.map((sub, index) => {
      if (index === key) {
        disableCount(sub);
      }
      return sub
    });
    updatePack(currentSel, "avlDomainSubjects")
    submitModal("avlDomainSubjects", "defaultDomainSubjCount");
  }

  const handleLang = (key) => {
    let currentSel = packTemp[0].avlLangSubjects.map((sub, index) => {
      if (index === key) {
        sub.selection = true;
      } else {
        sub.selection = false;
      }
      return sub
    });
    updatePack(currentSel, "avlLangSubjects")
    disableCount(packTemp);
    submitModal("avlLangSubjects", "defaultLangSubjCount");
  }

  const clearDomain = () => {
    let currentSel = packTemp[0].avlDomainSubjects.map((sub) => {
      sub.selection = false
      return sub
    });
    updatePack(currentSel, "avlDomainSubjects")
    setBoolaen((prev) => ({ ...prev, disDomain: false }));
  }

  const closeModal = () => {
    setPackInc([]);
    setBoolaen((prev) => ({ ...prev, showDomain: false, showLang: false, modalValid: false }));
  }

  const submitModal = (obj, checkVal, tempArr) => {
    tempArr = tempArr ? tempArr : packTemp;
    let countSelection = tempArr[0][obj].filter((sub) => (sub.selection === true)).length;
    if (countSelection >= tempArr[0][checkVal]) {
      setBoolaen((prev) => ({
        ...prev,
        alertTxt: false,
        modalValid: true
      }))
    } else {
      setBoolaen((prev) => ({
        ...prev,
        alertTxt: true,
        modalValid: false
      }))
    }
  }

  const handlePayment = async (subPack) => {
    let selectDomain = subPack.avlDomainSubjects?.filter((x) => x.selection === true);
    let selectLang = subPack.avlLangSubjects?.filter((x) => x.selection === true);
    if (subPack.avlDomainSubjectsLbl && subPack.avlLangSubjectsLbl) {
      if (selectDomain.length >= subPack.defaultDomainSubjCount && selectLang.length >= subPack.defaultLangSubjCount) {
        subCouponpack(subPack, selectDomain, selectLang);
      } else {
        alert(`please select ${subPack.defaultDomainSubjCount} domain subject and ${subPack.defaultLangSubjCount} language subject`)
      }
    } else {
      if (subPack.avlDomainSubjectsLbl) {
        if (selectDomain.length >= subPack.defaultDomainSubjCount) {
          subCouponpack(subPack, selectDomain);
        } else {
          alert(`please select ${subPack.defaultDomainSubjCount} domain subject`);
        }
      } else {
        subCouponpack(subPack)
      }
    }
  }

  const subCouponpack = async (packs, domain, lang) => {
    let obj;
    if (domain && lang) {
      obj = {
        chosenDomainSubjects: domain,
        chosenLangSubjects: lang
      }
    } else if (domain) {
      obj = {
        chosenDomainSubjects: domain
      }
    } else {
      obj = {}
    }
    const { data } = await axios.post(baseUrl() + `/pg/getSubsPackCouponsTaxes/${packs.subscriptionId}`, obj,
      {
        headers: {
          "Acces-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: `${Cookies.get("token")}`,
        },
      }
    )
    setCheckout(data.Data);
    setCouponDetails(data.Data.avlCouponsList);
    setShow(true);
  }


  return (
    <>
      <Header profileData={profileData} />

      <div id="generic_price_table" style={{ marginTop: "100px" }}>
        <section className="gate">
          <div className="container">
            <div
              className="row"
              style={{
                display: "flex",
                position: "relative",
                gap: "10px",
              }}
            >
              <div className="col-md-12">
                <h3 className="text-center subscription_head">Subscription Packs</h3>
                <p className="text-center subscription_txt">View our range of Packs available with different features</p>
              </div>
              {pack?.map((item, index) => {
                let domainCount = item.avlDomainSubjects?.filter((x) => x.selection === true).length
                let langSel = item.avlLangSubjects?.filter((x) => x.selection === true).length
                return (
                  <div key={index} className="col-md-3 card_pack">
                    <div className="card_body pt-5">
                      {item.tagLine && <div class="ribbon-pop">{item.tagLine}</div>}
                      <div className="card_title">
                        <p>{item.subscriptionName}</p>
                      </div>
                      <p>Lorem ipsum dolor sit amet,con sectetur adipiscing elit.</p>
                      <div className="price_chart">
                        <p>
                          <span>{item.actualPriceLbl}</span>
                          <span><strike>Rs. {item.actualPrice}</strike></span>
                          <br />
                          <span className="discount_col"> {item.discount}% off </span>
                          <span>{item.discountedPriceLbl + item.discountedPrice}</span><br />
                          ({item.packValidityLbl + " " + item.packValidity})
                        </p>
                      </div>
                      <div className="pack_inclusion">
                        {/* <p>{item.packInclusionLbl}</p> */}
                        <ul>
                          {item.packInclusions.map((pack, index) => {
                            if (index < 2) {
                              return (
                                <li>
                                  <div className='pack_img'>
                                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45868 0.514199C4.29978 0.627727 3.22869 1.05491 2.28957 1.77812C1.83224 2.1303 1.23834 2.79217 0.895123 3.33209C0.746898 3.56527 0.45836 4.15615 0.354997 4.43814C0.239427 4.75346 0.116251 5.23532 0.0556371 5.60922C-0.0185457 6.06685 -0.0185457 6.93573 0.0556371 7.39336C0.160526 8.0403 0.326451 8.56329 0.610458 9.14229C0.920758 9.77484 1.24341 10.2232 1.76008 10.7399C2.27678 11.2566 2.72516 11.5792 3.35771 11.8895C3.93671 12.1735 4.4597 12.3395 5.10664 12.4444C5.56427 12.5185 6.43315 12.5185 6.89078 12.4444C7.53772 12.3395 8.06071 12.1735 8.63971 11.8895C9.27226 11.5792 9.72064 11.2566 10.2373 10.7399C10.754 10.2232 11.0767 9.77484 11.387 9.14229C11.5931 8.72213 11.6967 8.44676 11.8078 8.0245C11.9556 7.46217 11.9931 7.15391 11.9931 6.50129C11.9931 5.84867 11.9556 5.54041 11.8078 4.97808C11.6967 4.55582 11.5931 4.28045 11.387 3.86029C11.0767 3.22774 10.754 2.77936 10.2373 2.26266C9.72064 1.74599 9.27226 1.42334 8.63971 1.11304C8.06127 0.829288 7.52793 0.660006 6.90252 0.56162C6.55745 0.507345 5.78694 0.482038 5.45868 0.514199ZM9.14312 3.92428C9.26054 3.96034 9.43969 4.13793 9.48922 4.26743C9.54662 4.41746 9.54087 4.61235 9.47504 4.74832C9.40116 4.90094 5.53685 8.73663 5.36168 8.83124C5.19397 8.92181 4.9959 8.92181 4.82794 8.83124C4.72849 8.77762 2.94851 7.1834 2.64588 6.8769C2.52773 6.75724 2.46895 6.61111 2.47113 6.4426C2.47578 6.0873 2.73486 5.84766 3.08704 5.87285C3.17155 5.87891 3.27454 5.90135 3.31588 5.92271C3.37839 5.95504 4.56513 7.02188 4.94851 7.3904L5.06037 7.4979L6.81481 5.74601C7.77978 4.78248 8.60328 3.97713 8.64483 3.95635C8.80749 3.87496 8.95217 3.86564 9.14312 3.92428Z" fill="#008B38" />
                                    </svg>
                                  </div>
                                  {pack}
                                </li>
                              )
                            } else if (index === 2) {
                              return (
                                <li className="features">
                                  <Link
                                    to=""
                                    onClick={() => setPackInc(item.packInclusions) + setTitle(item.packInclusionLbl)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#subModal"
                                  >
                                    View More
                                  </Link>
                                </li>
                              )
                            }
                          })}
                        </ul>
                      </div>

                      {item.avlDomainSubjectsLbl &&
                        <button
                          className="outline-btn mt-4"
                          onClick={() => showModal(item.subscriptionId, item.avlDomainSubjectsLbl, "showDomain")}
                          data-bs-toggle="modal"
                          data-bs-target="#subModal">
                          Domain Subjects
                        </button>}
                      {item.avlLangSubjects?.length &&
                        <button
                          className="outline-btn mt-3"
                          onClick={() => showModal(item.subscriptionId, item.avlLangSubjectsLbl, "showLang")}
                          data-bs-toggle="modal"
                          data-bs-target="#subModal">
                          Select Languages
                        </button>}

                      {
                        domainCount ?
                          <>
                            <p className="mt-3 mb-1"><strong>Subjects Opted:</strong></p>
                            <p>
                              {item.avlDomainSubjects.map((domain) => {
                                if (domain.selection) {
                                  return (
                                    domain.topicName + "," + " "
                                  )
                                }
                              })}
                            </p>
                          </>
                          : ""
                      }

                      {
                        langSel ?
                          <>
                            <p className="mt-3 mb-1"><strong>Languages Opted:</strong></p>
                            <p>
                              {item.avlLangSubjects.map((domain) => {
                                if (domain.selection) {
                                  return (
                                    domain.topicName
                                  )
                                }
                              })}
                            </p>
                          </>
                          : ""
                      }


                      {/* <div className="pack_inclusion">
                        {item.packInclusions.map((inclusion) => (
                          <p className="m-0">{inclusion}</p>
                        ))}
                      </div> */}
                    </div>
                    {/* {setSelCount(item.avlDomainSubjects.map((sub) => (sub.selection === true)))} */}
                    {
                      item.subscriptionName === "Free Pack"
                        ? <div className="card_footer justify-content-center">
                          <p className="m-0">ENJOY FREE CLASSES!</p>
                        </div>
                        : <div className="card_footer justify-content-between">
                          <div className="text-start">
                            <span>
                              <BiRupee />
                              <strike>
                                {domainCount && item.defaultDomainSubjCount === 1 ? parseFloat(item.actualPrice) * parseFloat(domainCount) : item.actualPrice}
                                {/* {item.actualPrice} */}
                              </strike>
                              <span className="discount_col"> {item.discount}% off</span>
                            </span>

                            {domainCount && item.defaultDomainSubjCount === 1 ?
                              <p className="mb-0">
                                <span>
                                  <BiRupee />{Math.trunc(item.discountedPrice)} x {domainCount} =
                                  <BiRupee />{Math.trunc(item.discountedPrice) * parseFloat(domainCount)}
                                </span>
                              </p>
                              : <p className="mb-0"><BiRupee /> {item.discountedPrice}</p>}
                          </div>
                          <button
                            className="btn main-btn"
                            data-bs-toggle="modal"
                            data-bs-target={
                              item.avlDomainSubjectsLbl && item.avlLangSubjectsLbl
                                ? domainCount >= item.defaultDomainSubjCount && langSel >= item.defaultLangSubjCount ? "#PaymentModal" : ""
                                : item.avlDomainSubjectsLbl
                                  ? domainCount >= item.defaultDomainSubjCount ? "#PaymentModal" : ""
                                  : "#PaymentModal"
                            }
                            onClick={() => handlePayment(item)}
                          >
                            {item.btnText}
                          </button>
                        </div>
                    }
                  </div>
                )
              })}

              {/* <div className="col-md-3 card_pack">
                <div className="card_body">
                  <div className="card_title">
                    <p>STARTER PACK</p>
                  </div>
                  <p>Lorem ipsum dolor sit amet,con sectetur adipiscing elit.</p>
                  <div className="pack_inclusion">
                    <p className="pack_inHead">Pack Inclusions</p>
                    <p>3 Practice Test Limited Video Classes</p>
                  </div>
                </div>
                <div className="card_footer d-flex justify-content-between">
                  <div className="text-start">
                    <span><BiRupee /><strike>3000.00</strike></span>
                    <p className="mb-0"><BiRupee />1500.00</p>
                  </div>
                  <button className="btn main-btn">GET THIS</button>
                </div>
              </div>
              <div className="col-md-3 card_pack">
                <div className="card_body">
                  <div className="card_title">
                    <p>STARTER PACK</p>
                  </div>
                  <p>Lorem ipsum dolor sit amet,con sectetur adipiscing elit.</p>
                  <div className="pack_inclusion">
                    <p className="pack_inHead">Pack Inclusions</p>
                    <p>3 Practice Test Limited Video Classes</p>
                  </div>
                </div>
                <div className="card_footer d-flex justify-content-between">
                  <div className="text-start">
                    <span><BiRupee /><strike>3000.00</strike></span>
                    <p className="mb-0"><BiRupee />1500.00</p>
                  </div>
                  <button className="btn main-btn">GET THIS</button>
                </div>
              </div>
              <div className="col-md-3 card_pack">
                <div className="card_body">
                  <div className="card_title">
                    <p>STARTER PACK</p>
                  </div>
                  <p>Lorem ipsum dolor sit amet,con sectetur adipiscing elit.</p>
                  <div className="pack_inclusion">
                    <p className="pack_inHead">Pack Inclusions</p>
                    <p>3 Practice Test Limited Video Classes</p>
                  </div>
                </div>
                <div className="card_footer d-flex justify-content-between">
                  <div className="text-start">
                    <span><BiRupee /><strike>3000.00</strike></span>
                    <p className="mb-0"><BiRupee />1500.00</p>
                  </div>
                  <button className="btn main-btn">GET THIS</button>
                </div>
              </div> */}
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  maxWidth: "max-content",
                  flexWrap: "wrap",
                  gap: 0,
                }}
              >
                {pack?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="col-lg-6 col-md"
                        key={index}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "350px",
                          padding: "10px",
                          minWidth: "350px",
                          width: "300px",
                          position: "relative",
                          margin: "10px",
                        }}
                      >
                        <div
                          className="overlay"
                          style={
                            isPrimium.status === 423
                              ? { display: "flex" }
                              : { display: "none" }
                          }
                        >
                          <h1 className="fs-2">
                            <AiFillLock style={{ marginRight: 10 }} />
                            {isPrimium.msg}
                          </h1>
                        </div>
                        <div
                          className="generic_content clearfix"
                          style={{ height: "100%" }}
                        >
                          <div className="generic_head_price clearfix">
                            <div className="generic_head_content clearfix">
                              <div className="head_bg"></div>
                              <div className="head" dangerouslySetInnerHTML={{ __html: item.subscriptionName }}>
                              </div>
                            </div>

                            <div
                              className="generic_price_tag clearfix"
                              style={{ minHeight: "220px" }}
                            >
                              <span
                                className="price"
                                dangerouslySetInnerHTML={{ __html: item.price }}
                              ></span>
                              <span
                                className="price"
                                style={{ color: "#7b1fa2", fontSize: "11px" }}
                                dangerouslySetInnerHTML={{ __html: item.title }}
                              >
                              </span>
                            </div>
                          </div>

                          <div
                            className="generic_feature_list"
                            style={{
                              minHeight: "230px",
                              marginBottom: "100px",
                            }}
                          >
                            <ul>
                              {item?.list?.map((list, index) => {
                                return (
                                  <div key={index}>
                                    <p className="pack-p">{list.subCatName}</p>

                                    {list?.list?.map((e, i) => {
                                      return (
                                        <li
                                          key={i}
                                          style={{ fontSize: "15px" }}
                                        >
                                          {e.packName}
                                        </li>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </ul>
                          </div>

                          <div
                            className="generic_price_btn clearfix"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              width: "100%",
                            }}
                          >
                            <button
                              type="button"
                              className="btn main-btn payBtn"
                              data-bs-toggle="modal"
                              data-bs-target="#PaymentModal"
                              onClick={() => {
                                setShow(true);
                                // if (billingDetails.address !== null && billingDetails.address !== "")
                                // else {
                                //   alert("Please enter a billing address");
                                // }
                              }}
                              disabled={isPrimium.status === 423}
                              style={{ width: "50%" }}
                            >
                              <AiFillLock
                                style={
                                  isPrimium.status === 423
                                    ? { marginRight: 10 }
                                    : { display: "none" }
                                }
                              />
                              {item.subscriptionName === "Starter Pack"
                                ? "Free"
                                : "Proceed"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div> */}
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      <div
        class="modal fade"
        id="PaymentModal"
        data-bs-backdrop="static"
        tabindex="-1"
        role="dialog"
        aria-labelledby="PaymentModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-lg modal-dialog-scrollable"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="PaymentModalLabel">
                {FormTitles[page]}
                {/* <div className="position-absolute" style={{}}> */}
                <Oval
                  height={80}
                  width={80}
                  color="#4fa94d"
                  wrapperStyle={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  wrapperClass=""
                  visible={loader}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
                {/* </div> */}
              </h5>
              <button
                type="button"
                class="close"
                onClick={() => onModalClose()}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body overflow-x-hidden">{PageDisplay()}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                disabled={page === 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Back
              </button>
              <button
                type="button"
                class="btn main-btn"
                // data-dismiss="modal"
                onClick={handleNextClick}
              >
                {page === FormTitles.length - 1 ? "Confirm" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="subModal" data-bs-backdrop="static" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {title}
              </h5>
              <button
                type="button"
                class="close"
                onClick={() => closeModal()}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {packInc.length ? <PackInclusions packInc={packInc} /> : ""}
              {boolaen.showDomain ?
                <>
                  <div className={boolaen.disDomain ? "d-flex flex-wrap flex_gap disable" : "d-flex flex-wrap flex_gap"}>
                    {packTemp[0].avlDomainSubjects.sort(function (a, b) {
                      if (a.topicName < b.topicName) { return -1; }
                      if (a.topicName > b.topicName) { return 1; }
                      return 0;
                    })
                      .map((sub, index) => {
                        return (
                          <button onClick={() => handleDomainsub(index)} className={sub.selection ? "domain_sub active" : "domain_sub"}>{sub.topicName}</button>
                        )
                      })}
                  </div>
                  <p className="warning_txt alertTxt mt-3 mb-0">You can select at most 4 subject. please unselect and reselect the subject of your choice.</p>
                  {boolaen.alertTxt && <p className="alertTxt mt-3 mb-0">You can select atleast {packTemp[0].defaultDomainSubjCount} subject.</p>}
                </>
                : ""}
              {boolaen.showLang ?
                <div className="d-flex flex-wrap flex_gap">
                  {packTemp[0].avlLangSubjects.map((lang, index) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="langSub"
                          id={lang.topicId}
                          value={lang.topicName}
                          checked={lang.selection ? true : false}
                          onClick={() => handleLang(index)}
                        />
                        <label className="form-check-label" htmlFor={lang.topicId}>{lang.topicName}</label>
                      </div>
                    )
                  })}
                </div>
                : ""}
            </div>
            <div class="modal-footer">
              {packInc.length
                ?
                <button type="button" onClick={closeModal} data-bs-dismiss="modal" class="btn main-btn">OKAY, GOT IT!</button>
                :
                <>
                  {boolaen.showDomain &&
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick={clearDomain}
                    >
                      CLEAR ALL
                    </button>
                  }
                  <button
                    type="button"
                    class="btn main-btn"
                    data-bs-dismiss={boolaen.modalValid ? "modal" : ""}
                    onClick={
                      boolaen.showDomain
                        ? () => submitModal("avlDomainSubjects", "defaultDomainSubjCount")
                        : () => submitModal("avlLangSubjects", "defaultLangSubjCount")
                    }
                  >
                    SUBMIT
                  </button>
                </>
              }
            </div>
          </div>
        </div>
      </div>


      <footer
        style={{ position: "relative" }}
        className="footer mt-auto py-3 main-color-bg border-top fixed-footer"
      >
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );

  // DONE:REVIEW FORM
  function ReviewForm({ profileData }) {
    return (
      <div>
        <div className="d-flex px-3">
          <p style={{ minWidth: "80px", width: "50%", marginRight: "6px" }}>
            Billing Address{" "}
          </p>
          <strong>
            {/* Address: */}
            {billingDetails.address || ""}, &nbsp;{/* <br /> */}
            {/* City: */}
            {billingDetails.city || ""}
            <br /> {/* State: */}
            {billingDetails.stateName || ""}
            <br />
            {/* Pincode: */}
            {billingDetails.pincode || ""}
            <br />
          </strong>
        </div>
        <div className="d-flex  px-3">
          <div style={{ flexGrow: 2, position: "relative" }}>
            <div className="border " style={{ height: "100%" }}>
              <div className="p-2 ">
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "#7b1fa2",
                      fontWeight: "bold",
                    }}
                  >
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

                <div
                  style={
                    validCoupon ? { display: "block" } : { display: "none" }
                  }
                >
                  <div className="d-flex justify-content-between ">
                    <p>Coupon Applied</p>
                    <p>{couponCode}</p>
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

                <div>
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
        </div>
      </div>
    );
  }
}
export default Payment;

// DONE: ADDRESS FIELD
// function Address({ profileData, billingDetails, updateBillingDetails, setUpdateBillingDetails, handleSaveBillingAddr, addNewAddress, setAddNewAddress, stateList, navigate }) {
//   const onHandle = (e) => {
//     console.log(e.target.id);
//     if (e.target.id === "profile-addr") {
//       setUpdateBillingDetails((prev) => ({
//         ...prev,
//         stateName: profileData.state,
//         stateCode: profileData?.stateCode || "",
//         address: profileData.address,
//         city: profileData.city,
//         pincode: profileData.pincode,
//       }));
//       setAddNewAddress(false);
//     } else if (e.target.id === "bill-addr") {
//       setUpdateBillingDetails((prev) => ({
//         ...prev,
//         stateName: billingDetails.stateName,
//         stateCode: billingDetails.stateCode,
//         address: billingDetails.address,
//         city: billingDetails.city,
//         pincode: billingDetails.pincode,
//       }));
//       setAddNewAddress(false);
//     } else {
//       setUpdateBillingDetails((prev) => ({
//         ...prev,
//         stateName: "",
//         stateCode: "",
//         address: "",
//         city: "",
//         pincode: "",
//       }));
//       setAddNewAddress(true);
//     }
//   };
//   return (
//     <>
//       <div className="d-flex gap-3">
//         <input type="radio" id="profile-addr" style={{ width: "25px" }} name="update" onClick={onHandle} defaultChecked={true} />
//         <label htmlFor="profile-addr">
//           Profile Address Location at <br />
//           <strong>
//             Address: {profileData?.address || ""}
//             <br /> City: {profileData?.city || ""}
//             <br /> State: {profileData?.state || ""}
//             <br /> Pincode: {profileData?.pincode || ""}
//             <br />
//           </strong>
//         </label>
//       </div>
//       {/* <hr /> */}
//       {/* <div className="d-flex gap-3">
//         <input type="radio" id="bill-addr" style={{ width: "25px" }} name="update" onClick={onHandle} defaultChecked={true} />
//         <label htmlFor="bill-addr">
//           Billing Address Location at <br />
//           <strong>
//             Address: {billingDetails?.address || ""}
//             <br /> City: {billingDetails?.city || ""}
//             <br /> State: {billingDetails?.stateName || ""}
//             <br /> Pincode: {billingDetails?.pincode || ""}
//             <br />
//           </strong>
//         </label>
//       </div> */}
//       <hr />
//       <div>
//         <input
//           type="radio"
//           id="newAddress"
//           name="update"
//           style={{ width: "25px" }}
//           // checked={addNewAddress}
//           onClick={onHandle}
//         />
//         <label htmlFor="newAddress" className="mt-2">
//           Add a New Address
//         </label>

//         {addNewAddress ? (
//           <>
//             <div className="d-flex flex-column gap-2 align-items-start justify-content-between mt-3">
//               <h5>Billing Address</h5>
//               <label htmlFor="address" className="bold">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 placeholder="address"
//                 value={updateBillingDetails?.address}
//                 onChange={(e) => setUpdateBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, address: e.target.value }))}
//                 name="address"
//                 id="address"
//               />
//               <label htmlFor="city" className="bold">
//                 City
//               </label>
//               <input
//                 type="text"
//                 placeholder="city"
//                 value={updateBillingDetails?.city}
//                 onChange={(e) => setUpdateBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, city: e.target.value }))}
//                 name="city"
//               />
//               <label htmlFor="pincode" className="bold">
//                 Pincode
//               </label>
//               <input
//                 type="text"
//                 placeholder="pincode"
//                 value={updateBillingDetails?.pincode || ""}
//                 onChange={(e) => setUpdateBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, pincode: e.target.value }))}
//                 name="pincode"
//               />
//               <label htmlFor="state" className="bold">
//                 State
//               </label>
//               <select
//                 className="form-select"
//                 aria-label="Default select example"
//                 // billingDetails.stateName
//                 value={updateBillingDetails.stateName}
//                 style={{ width: "100%", padding: 10 }}
//                 onChange={(event) => {
//                   let val = stateList.filter((e) => e.stateName === event.target.value);
//                   setUpdateBillingDetails((prev) => ({
//                     ...prev,
//                     stateName: event.target.value,
//                     stateCode: val[0].stateCode,
//                   }));
//                 }}
//               >
//                 <option style={updateBillingDetails.stateName === null || updateBillingDetails.stateName === "" ? { display: "inline-block" } : { display: "none" }} value="null">
//                   SELECT THE STATE
//                 </option>
//                 {stateList.length > 0
//                   ? stateList.map((item, index) => (
//                       <option key={index} value={item.stateName}>
//                         {item.stateName}
//                       </option>
//                     ))
//                   : ""}
//               </select>
//             </div>
//           </>
//         ) : (
//           <></>
//         )}

//         <br />
//         <label htmlFor="gstno">Gst number:</label>
//         <input
//           type="text"
//           placeholder="gst Number"
//           value={updateBillingDetails?.gstNo || ""}
//           onChange={(e) => setUpdateBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, gstNo: e.target.value }))}
//           name="gstNo"
//         />
//       </div>
//       {/* <div style={{ marginTop: "20px" }}>
//         {profileData.state !== "" && profileData.state !== null && addNewAddress ? (
//           <button
//             type="button"
//             class="btn main-btn"
//             onClick={() => {
//               // handleSaveBillingAddr();
//             }}
//             disabled={updateBillingDetails.address === "" || updateBillingDetails.pincode === "" || updateBillingDetails.city === "" ? true : false}
//           >
//             Update Address and Proceed
//           </button>
//         ) : (
//           addNewAddress && (
//             <button
//               onClick={() => {
//                 navigate("/studentProfile");
//                 const modal = document.querySelector(".modal-backdrop");
//                 modal.remove();
//               }}
//               class="btn main-btn"
//             >
//               UPDATE
//             </button>
//           )
//         )}
//       </div> */}
//     </>
//   );
// }

// {

/* {profileData.state !== "" && profileData.state !== null ? (
                <button
                  type="button"
                  class="btn main-btn"
                  data-dismiss="modal"
                  onClick={() => {
                    // setShow(true);
                    handleSaveBillingAddr();
                  }}
                  disabled={billingDetails.address === "" || billingDetails.pincode === "" || billingDetails.city === "" ? true : false}
                >
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
              )} */
// }

// ["Payment", "Address", "Review Form"]

// MODAL

// {
/* <div style={{ minWidth: "350px", width: "300px", padding: "10px" }}>
                <div className="modal-body" style={{ backgroundColor: "white" }}>
                  {profileData.state !== "" && profileData.state !== null ? (
                    <p>
                      Billing Address Location at <br />
                      <strong>
                        Address: {billingDetails.address || ""}
                        <br /> City: {billingDetails.city || ""}
                        <br /> State: {billingDetails.stateName || ""}
                        <br /> Pincode: {billingDetails.pincode || ""}
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
                                setUpdateBillingDetails((prev) => ({
                                  ...prev,
                                  address: billingDetails.address,
                                  city: billingDetails.city,
                                  pincode: billingDetails.pincode,
                                }));
                              }
                            }}
                          />
                          <label htmlFor="same-address">Same as Current Address</label>
                        </div>

                        <h5>Billing Address</h5>
                        <input
                          type="text"
                          placeholder="address"
                          value={updateBillingDetails?.address || ""}
                          onChange={(e) => setUpdateBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, address: e.target.value }))}
                          name="address"
                        />
                        <input
                          type="text"
                          placeholder="city"
                          value={updateBillingDetails?.city || ""}
                          onChange={(e) => setUpdateBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, city: e.target.value }))}
                          name="city"
                        />

                        <input
                          type="text"
                          placeholder="pincode"
                          value={updateBillingDetails?.pincode || ""}
                          onChange={(e) => setUpdateBillingDetails((prevBillingDetails) => ({ ...prevBillingDetails, pincode: e.target.value }))}
                          name="pincode"
                        />
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          // billingDetails.stateName
                          value={updateBillingDetails.stateName}
                          style={{ width: "100%", padding: 10 }}
                          onChange={(event) => {
                            let val = stateList.filter((e) => e.stateName === event.target.value);
                            setUpdateBillingDetails((prev) => ({
                              ...prev,
                              stateName: event.target.value,
                              stateCode: val[0].stateCode,
                            }));
                          }}
                        >
                          <option
                            style={updateBillingDetails.stateName === null || updateBillingDetails.stateName === "" ? { display: "inline-block" } : { display: "none" }}
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
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div style={{ marginTop: "20px" }}>
                    {profileData.state !== "" && profileData.state !== null ? (
                      <button
                        type="button"
                        class="btn main-btn"
                        data-dismiss="modal"
                        onClick={() => {
                          // setShow(true);
                          handleSaveBillingAddr();
                        }}
                        disabled={updateBillingDetails.address === "" || updateBillingDetails.pincode === "" || updateBillingDetails.city === "" ? true : false}
                      >
                        Update Address and Proceed
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
              </div> */
// }

// TODO:Address UPDATE

// onChange={(e) => {
//   if (e.target.checked) {
//     //  onChange={(e) => setAddNewAddress(e)}
//     console.log(true);
//     setUpdateBillingDetails((prev) => ({
//       ...prev,
//       address: billingDetails.address,
//       city: billingDetails.city,
//       pincode: billingDetails.pincode,
//     }));
//   }
// }}

/* <p style={{ minWidth: "80px", width: "50%", marginRight: "6px" }}>Order Details</p>
          <strong>
            Amount: Rs. {amount} <br />
            tax: Rs. {tax} <br />
            <>Discount: Rs. {discount}</> <br />
            <>CouponCode: {couponCode || "NO CODE"}</> <br />
            <>totalPrice: Rs. {totalPrice}</> <br />
          </strong> */
