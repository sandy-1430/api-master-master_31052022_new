import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import baseUrl from "../../Components/baseUrl";

export default function useProfile() {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const body = { email: Cookies.get("email") };
        const config = {
          "Acces-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: `${Cookies.get("token")}`,
        };
        const response = await axios.post(baseUrl() + "/profileData", body, { headers: config });
        if (response.status === 200) {
          setProfileData(response.data.Data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfileData();
  }, []);
  return profileData ? profileData : [];
}
