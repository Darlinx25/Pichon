export const environment = {
  production: true,
  wsUrl: `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`,
  apiBaseUrl: `${window.location.origin}/backend`
};