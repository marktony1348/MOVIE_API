// jwt strategy key which aligns with passport.js file
const jwtSecret = 'your_jwt_secret'; 

const jwt = require('jsonwebtoken'),
  passport = require('passport');
// Your local passport file for 1st stage auth
require('./passport'); 


let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    // username whic is encoded in json web token
    subject: user.Username, 
    // expiry time frame of the token
    expiresIn: '7d', 
    // used to encode Json web token values 
    algorithm: 'HS256'
  });
}


/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}