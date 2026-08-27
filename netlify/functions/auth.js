// netlify/functions/auth.js
exports.handler = async (event) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const host = event.headers['x-forwarded-host'] || event.headers.host;
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;

  const authorizeUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&scope=repo,user` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return {
    statusCode: 302,
    headers: { Location: authorizeUrl },
  };
};