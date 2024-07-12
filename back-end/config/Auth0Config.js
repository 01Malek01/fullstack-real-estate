import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({//you have to add an api in the api tab in auth0 dashboard and add the api endpoint.
  audience: "http://localhost:5000",
  issuerBaseURL: "https://dev-cexu7h8s3dde5fb4.us.auth0.com/", //domain ID
  tokenSigningAlgorithm: "RS256",
});

export default jwtCheck;
