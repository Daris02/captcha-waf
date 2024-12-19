import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
});

let token = null;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 405) {
      console.warn('Captcha requis par AWS WAF.');
      
      // Afficher un CAPTCHA (par exemple, reCAPTCHA v2/v3)
      // ou rediriger l'utilisateur vers une page dédiée
      // Exemple : afficher un message ou appeler une fonction pour le CAPTCHA
      handleCaptchaChallenge();
      console.log('AWS WAF demande un CAPTCHA. Veuillez résoudre le défi !');
    }

    // Propager les autres erreurs
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (request) => {
    // Ajouter les headers nécessaires pour l'API AWS WAF
    request.headers["x-aws-waf-token"] = window.AwsWafCaptcha?.getToken;
    return request;
  }
)

function handleCaptchaChallenge() {
  renderCaptcha().then((resToken) => {
    return axiosInstance.request();
  })
  // alert('AWS WAF demande un CAPTCHA. Veuillez résoudre le défi !');
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
        },
        onLoad: () => {
          document.body.style.cursor = "default";
          onCaptchaEvent("onLoad");
          
        },
        onError: () => onCaptchaEvent("onError"),
        onPuzzleTimeout: () => onCaptchaEvent("onPuzzleTimeout"),
        onPuzzleIncorrect: () => onCaptchaEvent("onPuzzleIncorrect"),
        onPuzzleCorrect: () => onCaptchaEvent("onPuzzleCorrect"),

        apiKey: import.meta.env.VITE_CAPTCHA_API_KEY,
      }
    );
  });
}

export default axiosInstance;
