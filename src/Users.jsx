import { useEffect } from "react";
import { useState } from "react";
import { useAWSWAFCaptchaAxios } from "./aws-waf-captcha/useAWSWAFCaptchaAxios";
import { useAWSWAFCaptchaFetch } from "./aws-waf-captcha/useAWSWAFCaptchaFetch";
import axios from "axios";
import { getWAFEnv } from "./util";
// import axiosInstance from "./aws-waf-captcha/axiosInstances";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function Users() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaEvents, setCaptchaEvents] = useState([]);
  const captchaFetch = useAWSWAFCaptchaFetch();

  // Utilisation du hook personnalisé pour Axios avec gestion CAPTCHA
  const captchaAxios = useAWSWAFCaptchaAxios((event) => {
    setCaptchaEvents((prev) => [...prev, event]);
    console.log("CAPTCHA event:", event);
  });

  useEffect(() => {
    // fetchUsers();
    // captchaAxios
    axios
      .get(`${BASE_URL}/api/users`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 405) {
            setErrorMessage("CAPTCHA verification required.");
            renderCaptcha();
          }
        });
  });

  // const fetchUsers = () => {
  //   captchaFetch(`${BASE_URL}/api/users`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include'
  //   }).then(response => {
  //     setUsers(response.data)
  //   }).catch(err => {
  //     if (err.response && err.response.status === 405) {
  //       setErrorMessage("CAPTCHA verification required.");
  //     }
  //   })
  // }

  return (
    <div>
      <h1>Users</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <ul>
        {users.map(user => <li key={user.id}>{user.username}</li>)}
      </ul>
    </div>
  )
}


  function renderCaptcha(
    onCaptchaEvent = (event) => console.log(event)
  ) {
    document.body.style.cursor = "wait";
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
    
    return new Promise((resolve) => {
      window.AwsWafCaptcha?.renderCaptcha(
        document.getElementById("captchaForm"),
        {
          onSuccess: (wafToken) => {
            document.getElementById("modalOverlay").style.display = "none";
            document.getElementById("modal").style.display = "none";
            console.log("On success");
            onCaptchaEvent("onSuccess");
            resolve(wafToken);
            
            resolve(wafToken);
          },
          onLoad: () => {
            document.body.style.cursor = "default";
            onCaptchaEvent("onLoad");
            // addEventListener.onLoad(this);
            console.log("On Load...");
            console.log(window.Event);
            
          },
          onError: () => onCaptchaEvent("onError"),
          onPuzzleTimeout: () => onCaptchaEvent("onPuzzleTimeout"),
          onPuzzleIncorrect: () => onCaptchaEvent("onPuzzleIncorrect"),
          onPuzzleCorrect: () => onCaptchaEvent("onPuzzleCorrect"),

          apiKey: getWAFEnv().CAPTCHA_API_KEY,
        }
      );
    });
  }