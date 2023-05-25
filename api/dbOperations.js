import config from "./dbconfig.js";
// import config from "./index.js"
import sql from "mssql";
export const checkUser = async (email,username) => {
  try {
    let pool = await sql.connect(config);
    let query = `SELECT * FROM users WHERE email = @email OR username=@username`;
    let result = await pool
      .request()
      .input("email", sql.VarChar(255), email)
      .input("username", sql.VarChar(255), username)
      .query(query);
    return result.recordset;
  } catch (error) {
    return "error" + error;
  }
}

