// Load WAF environment at start
export async function loadWAFEnv () {
  const envFile = {
    "JSAPI_URL": import.meta.env.VITE_JSAPI_URL,
    "cAPTCHA_API_KEY": import.meta.env.VITE_CAPTCHA_API_KEY
  }
  window.AWS_WAF_ENV = envFile;
}

export function getWAFEnv () {
  return window.AWS_WAF_ENV
}

// Loads the AWS WAF JS API Script dynamically
export function loadScript () {
  if (document.getElementById('AwsWAFScript')) return

  const AwsWafScript = document.createElement('script')
  AwsWafScript.id = 'AwsWAFScript'
  AwsWafScript.async = false
  AwsWafScript.src = getWAFEnv().JSAPI_URL
  document.head.appendChild(AwsWafScript)
}
