import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "../reactScrollComponents/ScrollButton";
import Card from "../reactScrollComponents/ScrollCard";
import baseUrl from "../../../Components/baseUrl";

const Reviews = () => {
  const [studentSpeak, setStudentSpeak] = useState([]);

  useEffect(() => {
    const fetchStudentSpeak = async () => {
      try {
        const config = {
          "Access-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: Cookies.get("token"),
        };

        const { data, status } = await axios.post(`${baseUrl()}/df/studentSpeak`, {}, { headers: config });
        if (status === 200) setStudentSpeak(data.Data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentSpeak();
  }, []);

  return (
    <section className="container-fluid" id="student">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-6">
          <h4 className="my-5 underline" style={{ whiteSpace: "nowrap" }}>
            R E V I E W S
          </h4>
        </div>
      </div>
      <div className="row container-xl mx-auto">
        <div className="col-md-12">
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {studentSpeak.map((item, i) => (
              <Card key={i} title={item.name} textContent={item.textContent} videoUrl={item.videoUrl} />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </section>
  );
};

export default memo(Reviews);
