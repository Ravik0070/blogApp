import config from "../dbconfig.js";
import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const img = req.body.img;
  let pool = await sql.connect(config);
  let query = `SELECT * FROM users WHERE email = @email OR username=@username`;
  let checkUser = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .input("username", sql.NVarChar(255), username)
    .query(query);

  if (checkUser.recordset.length > 0) {
    return res.json({ success: false, response: "User already exists !" });
  } else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let pool = await sql.connect(config);
    let query = `INSERT INTO users(username,email,password,img) VALUES( @username,@email,@password,@img)`;
    let result = await pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .input("username", sql.NVarChar(255), username)
      .input("password", sql.NVarChar(255), hashedPassword)
      .input("img", sql.NVarChar(255), img)
      .query(query);

    return res.json({ success: true, response: "User is registered !" });
  }
};
export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let pool = await sql.connect(config);
  let query = `SELECT * FROM users WHERE username=@username`;
  let checkUser = await pool
    .request()
    .input("username", sql.NVarChar(255), username)
    .query(query);
  if (checkUser.recordset.length > 0) {
    const hash = checkUser.recordset[0].password;
    const passwordCheck = bcrypt.compareSync(password, hash);
    if (passwordCheck) {
      const token = jwt.sign({ id: checkUser.recordset[0].id }, "jwtkey");
      const user = checkUser.recordset[0];
      const { password, ...other } = user;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .json({ success: true, response: passwordCheck, user: other });
    }
  } else {
    return res.json({
      success: false,
      response: "Username/password do not exist !",
    });
  }
};
export const logout = async (req, res) => {
  
   res
     .clearCookie("access_token", {
       sameSite: "none",
       secure: true,
     })
     .json("User has been logged out.");
};
