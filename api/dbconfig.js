import dotenv from "dotenv";
dotenv.config();
const config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    trustedconnection: true,
    trustServerCertificate: true,
    enableArithAbort: true,
    instancename: "",
  },
  port: parseInt(process.env.port),
};



export default config;
