// import { useEffect } from "react";
// import { useState } from "react";
// import { useAWSWAFCaptchaAxios } from "./aws-waf-captcha/useAWSWAFCaptchaAxios";
// import axiosInstance from "./aws-waf-captcha/axiosInstances";

import { useEffect, useState } from "react";
import Captcha from "./Captcha"; // Import du composant CAPTCHA
import axiosInstance from "./aws-waf-captcha/axiosInstances";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showCaptcha, setShowCaptcha] = useState(false); // État pour gérer l'affichage du CAPTCHA
  const [captchaToken, setCaptchaToken] = useState(""); // État pour stocker le token CAPTCHA

  useEffect(() => {
    fetchUsers();
  }, [captchaToken]); // Réessayer la requête si le CAPTCHA est résolu

  function fetchUsers() {
    axiosInstance
      .get(`/api/users`, {
        withCredentials: true,
        headers: captchaToken ? { "x-captcha-token": captchaToken } : {},
      })
      .then((res) => {
        setUsers(res.data);
        setShowCaptcha(false); // Masquer le CAPTCHA si tout va bien
      })
      .catch((err) => {
        if (err.response && err.response.status === 405) {
          setShowCaptcha(true); // Afficher le CAPTCHA en cas d'erreur 405
        } else {
          console.error("Erreur lors de la récupération des utilisateurs:", err);
        }
      });
  }

  function handleCaptchaSolved(token) {
    setCaptchaToken(token); // Stocker le token CAPTCHA et relancer la requête
    setShowCaptcha(false); // Masquer le CAPTCHA
  }

  return (
    <div>
      <h1>Users</h1>
      {showCaptcha ? (
        <Captcha onCaptchaSolved={handleCaptchaSolved} /> // Afficher le CAPTCHA
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}





// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [captchaEvents, setCaptchaEvents] = useState([]);

//   // Utilisation du hook personnalisé pour Axios avec gestion CAPTCHA
//   const captchaAxios = useAWSWAFCaptchaAxios((event) => {
//     setCaptchaEvents((prev) => [...prev, event]);
//     console.log("CAPTCHA event:", event);
//   });

//   useEffect(() => {
//     // fetchUsers();
//     axiosInstance.get(`/api/users`)
//       .then((res) => {
//         setUsers(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
        
//         if (err.response && err.response.status === 405) {
//           setErrorMessage("CAPTCHA verification required.");
//         }
//       });
//   });
  
//   // useEffect(() => {
//   //   axios.get(`${BASE_URL}/api/users`)
//   //     .then((res) => {
//   //       setUsers(res.data);
//   //     })
//   // });

//   return (
//     <div>
//       <h1>Users</h1>
//       {errorMessage && <div className="error">{errorMessage}</div>}
//       <ul>
//         {users.map(user => <li key={user.id}>{user.username}</li>)}
//       </ul>
//     </div>
//   )
// }
