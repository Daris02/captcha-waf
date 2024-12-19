// Loads the AWS WAF JS API Script dynamically
export function loadScript () {
  if (document.getElementById('AwsWAFScript')) return

  const AwsWafScript = document.createElement('script')
  AwsWafScript.id = 'AwsWAFScript';
  AwsWafScript.async = false;
  AwsWafScript.src = import.meta.env.VITE_JSAPI_URL;
  AwsWafScript.onload = () => {
    console.log('AWS WAF script loaded');
  };
  AwsWafScript.onerror = () => {
    console.error('Failed to load AWS WAF script');
  };
  document.head.appendChild(AwsWafScript)
}
