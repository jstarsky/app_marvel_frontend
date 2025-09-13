import axios from "axios";

// Client axios: communicate with your Next.js API routes (server signs requests)
const client = axios.create({
  timeout: 10000,
});

export default client;
