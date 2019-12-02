const express = require('express');
const app = express();

//middleware
//async middleware
const asyncMiddleware = require('./../middleware/asyncMiddleware');

const auth = require('./../middleware/auth');

//express-validator packages
//https://flaviocopes.com/express-validate-input/
//https://flaviocopes.com/express-sanitize-input/
//const { check, validationResult, header } = require('express-validator/check');
const { check, validationResult, header } = require('express-validator');
//const { filter } = require('express-validator/filter');

//modules
const model_login = require('./../models/login');

//Check if email exists – when creating New Customer
app.post('/CheckEmailNotExist',auth,
[
  check('Email').isEmail().normalizeEmail().withMessage('Not valid email!')
],asyncMiddleware(async (req, res, next) =>  {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

       res.status(412).json({ errors: errors.array() });

    } else {

      const email = req.body.Email;

      const result = await model_customers.checkEmailNotExist(await getConnectionFromRequest(req), email).catch( (error) => {
        res.status(430).send(error);
      });

     if(result > 0){

        res.json({"success":true});

      }  else {

        res.json({"success":false});

      } 

    } //else

})); //app.post('/CheckEmailNotExist'

//Test router
app.get('/test',
[
    //check('input_type').exists().withMessage('Input Type is undefined!').isBoolean().trim().escape(), // 1 = by email, 0 - by last name
]
,asyncMiddleware(async (req, res, next) =>  {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.status(412).json({ errors: errors.array() });

    } else {

        //const input_type = req.body.input_type;

        /*  const result = await model_customers.customerSearch(await getConnectionFromRequest(req), input_type, search_value).catch( (error) => {
            res.status(430).send(error);
        }); */

    res.send({
        success:true,
        message:"This is the test!"
    });

    //res.json(result);


    }

})); //app.post('/CustomerSearch'


module.exports = app;