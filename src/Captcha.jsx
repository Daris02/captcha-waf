import { useEffect } from 'react';

function Captcha({ onCaptchaSolved }) {
  useEffect(() => {
    if (window.AwsWafCaptcha) {
      window.AwsWafCaptcha.renderCaptcha({
        elementId: "captcha-container",
        onSuccess: (token) => {
          console.log("CAPTCHA solved with token:", token);
          onCaptchaSolved(token); // Informer le parent
        },
        onFailure: (error) => {
          console.error("CAPTCHA failed:", error);
        },
      });
    }
  }, []);
  return (
    <>
      <h1>Captcha</h1>
      <div id="captcha-container"></div>
    </>
  )
}

export default Captcha;