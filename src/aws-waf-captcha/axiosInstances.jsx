import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 405) {
//       console.warn('Captcha requis par AWS WAF.');
      
//       // Afficher un CAPTCHA (par exemple, reCAPTCHA v2/v3)
//       // ou rediriger l'utilisateur vers une page dédiée
//       // Exemple : afficher un message ou appeler une fonction pour le CAPTCHA
//       handleCaptchaChallenge(error.response.data);
//       console.log('AWS WAF demande un CAPTCHA. Veuillez résoudre le défi !');
//     }

//     // Propager les autres erreurs
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.request.use(
//   (request) => {
//     // Ajouter les headers nécessaires pour l'API AWS WAF
//     request.headers['X-Custom-Header'] = 'Custom Value';

//     return request;
//   }
// )

// function handleCaptchaChallenge() {
//   // alert('AWS WAF demande un CAPTCHA. Veuillez résoudre le défi !');
// }

export default axiosInstance;
