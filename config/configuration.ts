/* eslint-disable */
export const configLoader = () => ({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  grant_type: process.env.GRANT_TYPE,
  auth0_domain: process.env.AUTH0_DOMAIN,
  node_env: process.env.NODE_ENV,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  database_url: process.env.DATABASE_URL,
});
