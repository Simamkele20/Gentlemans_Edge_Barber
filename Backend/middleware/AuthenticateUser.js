import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";


function createToken(user) {
  return jwt.sign(
    {
      emailAdd: user.emailAdd,
      userPwd: user.userPwd,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );
}


// verify token
function verifyToken(req, res, next) {
  // Retrieve token from the browser
  const token = req?.headers["Authorization"];
  if (token) {
    if (verify(token, process.env.SECRET_KEY)) {
      next();
    } else {
      res?.json({
        status: res.statusCode,
        msg: "Please provide a valid token.",
      });
    }
  } else {
    res?.json({
      status: res.statusCode,
      msg: "Please Login.",
    });
  }
}



export { createToken, verifyToken}