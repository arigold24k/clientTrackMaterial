const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const func = require( '../functions/functions');

const orm = require('../config/orm');
//middleware to protect routes
function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;
        next();

    }else{
        //forbidden
        res.sendStatus(403);
    }
}

router.get("/", function(req, res) {
    console.log("Route was hit.");
   res.json({
       message: "this is the router being hit"
   });
});

router.get("/data", function(req, res) {
    orm.findone("jDoe",((error, data)=>{
        if(error) {
            return res.status(501).json({
               message:'Unable to query database'
            });
        }
        console.log('this is the data', data)
    }))
});

router.post('/register', function(req, res) {
    console.log('Register API is being hit');
    orm.addone(req.body.usrname, req.body.password, (err, data) => {
        console.log('---data is coming back from query---', data);
        if(data && data !==0){
            console.log('this is the data that came back from the call ', data);
            res.json({message:'Data has been inserted', data: data})
        }else if(data === 0) {
            res.json({message: 'user already exists', data: 0});
        }else {
            res.json({message: 'Error in getting data', error: err});
        }
    })
});

router.post('/login', (req, res) => {
   console.log('Login API is being Hit ', req.body);
   if(req.body.password) {
       orm.findone(req.body.usrname, (err, data) => {
           console.log('handle.js page, login is receiving this data, ', data);
           // console.log('Data 0 ', data[0].password);
           // console.log(`These are the pw that are being sent, encrypted ${data[0].password}, and the non encrypted ${req.body.password}.`);
           if (data[0]) {
               const check = func.checkPW(req.body.password, data[0].password) || (req.body.password === data[0].password);

                   console.log('the value of the check of the pw', check);
                   if (check === true) {
                       //navigate to the mainpage
                       console.log('user would of been logged in, value of check: ', check);
                       jwt.sign({user: {id: data[0].ID, username: data[0].username, email: data[0].Email}}, process.env.SECRETE_KEY_OR_SO, {expiresIn: 60*3}, (err, token) => {
                           console.log('data for the token', token);
                           console.log('data for the error', err);
                           if(err){
                               res.status(502).json({message: 'error creating token'});
                           }else{
                               res.json({token: token, data: check})
                           }
                       });
                   }
                   else if (check !== true) {
                       console.log('password is incorrect');
                       res.json({data: check});
                   }
           }
           else {
               console.log('no user was found');
               res.status(200).json({message: 'there was an error in finding the user make sure username is correct', data: 0});
           }
       })
   }else{
       res.status(502).json({message:'No Data sent to Login API'});
   }
});

router.get("/data/:usrdata", function(req, res) {
    orm.findone(req.param('usrdata'),((error, data)=>{
        if(error) {
            return res.status(501).json({
                message:'Unable to query database'
            });
        }
        console.log('this is the data', data);
        return data;
    }))
});

router.post('/api/verify', function(req, res) {
    console.log('this is the toekn in the verify route ', req.body);
    try {
        let decoded = jwt.verify(req.body.token, process.env.SECRETE_KEY_OR_SO);
        console.log('decoded value in the new api route, ', decoded);
        if (typeof decoded !== 'undefined'){
            res.json({message:'Token Verified', data: true})
        }
    } catch(err) {
        console.log('err value in the new api route, ', err);
        res.json({message: 'There was an error', error: err})
    }
});

router.post('/139.64.200.80/', function(req, res) {
    console.log('this is the toekn in the verify route ', req.body);
    try {
        let decoded = jwt.verify(req.body.token, process.env.SECRETE_KEY_OR_SO);
        console.log('decoded value in the new api route, ', decoded);
        if (typeof decoded !== 'undefined'){
            res.json({message:'Token Verified', data: true})
        }
    } catch(err) {
        console.log('err value in the new api route, ', err);
        res.json({message: 'There was an error', error: err})
    }
});


module.exports = router;