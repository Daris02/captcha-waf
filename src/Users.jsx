import { useEffect } from "react";
import { useState } from "react";
import { useAWSWAFCaptchaAxios } from "./aws-waf-captcha/useAWSWAFCaptchaAxios";
import axiosInstance from "./aws-waf-captcha/axiosInstances";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function Users() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // fetchUsers();
    // captchaAxios
    axiosInstance
      .get(`${BASE_URL}/api/users`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 405) {
            console.log("CAPTCHA verification required.");
          }
        });
  });

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => <li key={user.id}>{user.username}</li>)}
      </ul>
    </div>
  )
}
