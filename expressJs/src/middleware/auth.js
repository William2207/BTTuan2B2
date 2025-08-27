require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const whiteList = ["/v1/api/login", "/v1/api/register", "/"];
  if (whiteList.includes(req.path)) {
    return next();
  }else{
    if(req?.headers?.authorization?.split(" ")[1]){
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
      });
    }else{
      return res.status(401).json({ message: 'Unauthorized' });
    }
    }

}

module.exports = auth;