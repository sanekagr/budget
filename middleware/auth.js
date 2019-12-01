
/*  
JWT token-based authentication middleware
https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
3 days
*/
const jwt = require('jsonwebtoken');
const config = require('./../config.js');

let auth = (req, res, next) => {

   // Express headers are auto converted to lowercase
   let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token && token != config.mastertoken) {

        if (token.startsWith('Bearer ')) {
            //Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                success: false,
                message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    //master token for some functions - login, register, forget password
    } else if(token == config.mastertoken) {

        return next();

    } else {

        return res.status(400).json({
            success: false,
            message: 'Auth token is not supplied'
        });
        
    }

  
}; // let auth = (req, res, next) => {

if(config.authentication == false) {

    auth = (res, req, next) => { return next(); };

}

module.exports = auth;

