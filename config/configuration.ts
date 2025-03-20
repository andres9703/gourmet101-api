export default () => ({
   client_id: process.env.CLIENT_ID,
   client_secret: process.env.CLIENT_SECRET,
   redirect_uri: process.env.REDIRECT_URI,
   grant_type: process.env.GRANT_TYPE,
   auth0_domain: process.env.AUTH0_DOMAIN
  });