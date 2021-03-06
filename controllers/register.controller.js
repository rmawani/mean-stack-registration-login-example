﻿var express = require('express');
var router = express.Router();
var request = require('request');
//var config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        //url: config.apiUrl + '/users/register',
        url: process.env.API_URL + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        //console.log(req.body);
        if (error) {
            console.log(error);
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            //console.log(body);
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                cellPhoneNumber: req.body.cellPhoneNumber,
                username: req.body.username
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});

module.exports = router;