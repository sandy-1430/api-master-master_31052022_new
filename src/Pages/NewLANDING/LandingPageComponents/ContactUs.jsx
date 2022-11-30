import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import baseUrl from "../../../Components/baseUrl";
import { Link } from "react-router-dom";
import besstQR from "../../../Assets/images/besst_qr.jpg";

const ContactUs = () => {
  const [ContactUs, setContactUs] = useState("");

  useEffect(() => {
    fetch(`${baseUrl()}/df/getContactSupport`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        {
          console.log("day", result);
        }
        if (result.ResultCode === "200") {
          {
            console.log("day", result.Data);
          }
          setContactUs(result.Data[0]);
          // setFaqQuestions(result.Data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ paddingTop: "6.25rem", paddingBottom: "6.25rem" }}
    >
      <section id="contact">
        <div className="row">
          <div className="col-md-5 ps-5 text-md-start">
            <h1 className="my-2">Contact Us</h1>
            <div className="d-flex my-4">
              <BsWhatsapp color="green" size={28} />
              <div className="ms-3 w-100">
                <span>WhatsApp</span>
                <br />
                <div className="fs-5">{ContactUs.whatsapp}</div>
              </div>
            </div>
            <div className="d-flex my-4">
              <AiOutlineMail size={28} />
              <div className="ms-3 w-100">
                <span>Write to us for queries</span>
                <br />
                <div className="fs-5">{ContactUs.email}</div>
              </div>
            </div>
            <div className="d-flex my-4">
              <GoLocation size={28} />
              <div className="ms-3 w-100">
                <span>Location</span>
                <br />
                <div className="fs-5">{ContactUs.address}</div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 img-bg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.832618781456!2d91.82181131495342!3d26.13699998346788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x55c6a8e4bda24a24!2zMjbCsDA4JzEzLjIiTiA5McKwNDknMjYuNCJF!5e0!3m2!1sen!2sin!4v1656154630597!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ minHeight: "22rem" }}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
