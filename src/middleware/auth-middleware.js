import jwt from "jsonwebtoken";
import config from "../config/index.js";
import ErrorHandler from "../error-handler/index.js";
import User from "../models/user.model.js";

async function protect(req, res, next) {
  if (!req.headers["authorization"]) {
    return next(new ErrorHandler(401, "Unauthorized"));
  }
  let token = req.headers["authorization"].split(" ")[1];

  try {
    let payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(payload.id);
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler(401, "Malformed Token"));
  }
}

export default protect;
