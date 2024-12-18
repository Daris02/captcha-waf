import './App.css'
import Home from './Home'
import Users from './Users'
import { Route, Routes } from 'react-router-dom';
import { AWSWAFCaptchaModal } from "./aws-waf-captcha/AWSWAFCaptchaModal";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <AWSWAFCaptchaModal />
    </>
  )
}

export default App;
