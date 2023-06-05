import config from "../dbconfig.js";
import sql from "mssql";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  let pool = await sql.connect(config);
  let query = req.query.cat
    ? `SELECT * FROM blogs WHERE cat=@cat`
    : `SELECT * FROM blogs`;
  let result = await pool
    .request()
    .input("cat", sql.NVarChar(1000), req.query.cat)
    .query(query);
  return res.json({ success: true, response: result.recordset });
};
export const getPost = async (req, res) => {
  let pool = await sql.connect(config);
  let query =
    "SELECT u.username , b.title , b.description , b.img ,u.img as userImage, b.cat , b.created_date FROM users u JOIN blogs b ON u.id = b.uid" +
    " WHERE b.id=@id";
  let result = await pool
    .request()
    .input("id", sql.NVarChar(1000), req.params.id)
    .query(query);
  return res.json({ success: true, response: result.recordset[0] });
};
export const addPost = (req, res) => {
  console.log("Abc");
};
export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.json({ success: false, response: "Not Authenticated" });
  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const postId = req.params.id;
    let pool = await sql.connect(config);
    let query = "DELETE FROM blogs WHERE id=@id"
    let result = await pool
      .request()
      .input("id", sql.NVarChar(1000), req.params.id)
      .query(query);
    return res.json({ success: true, response: "DELETED" });
  });
};
export const updatePost = (req, res) => {
  console.log("Abc");
};
