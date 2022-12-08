const NODE_ENV = import.meta.env.MODE;
const SERVER_BASE =
  NODE_ENV === "production" ? window.location.origin : "http://localhost:3000";

const API_BASEURL = `${SERVER_BASE}/api`;

console.log(import.meta.env);
console.log(`API_BASEURL = ${API_BASEURL}`);

export { API_BASEURL, SERVER_BASE, NODE_ENV };
