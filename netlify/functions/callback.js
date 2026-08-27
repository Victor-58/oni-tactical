// netlify/functions/callback.js
exports.handler = async (event) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const code = event.queryStringParameters.code;

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return {
      statusCode: 401,
      body: `Erro de autenticação: ${tokenData.error_description || tokenData.error}`,
    };
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });

  const html = `
    <!doctype html>
    <html>
      <body>
        <script>
          (function() {
            function receiveMessage(message) {
              window.opener.postMessage(
                'authorization:github:success:${payload}',
                message.origin
              );
              window.removeEventListener('message', receiveMessage, false);
            }
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          })();
        </script>
      </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html,
  };
};