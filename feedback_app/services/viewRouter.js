const express = require('express');
const router = new express.Router();
const view = require('../controllers/view.js');
const users = require('../db_apis/users.js');
const middleware = require("../middleware/index.js");

router.route('/')
    .get(middleware.isLoggedIn, view.studentGet);


router.route('/fac_dashboard')
    .get(view.fac_get);

router.route('/login')
    .get(view.loginGet);

router.route('/register')
    .get(view.registerGet)
    .post(users.post);
    // .post(users.post2);

router.route('/profile')
    .get(middleware.isLoggedIn, middleware.isLoggedIn, view.profileGet);

router.route('/faculty')
    .get(middleware.isLoggedIn, view.facultyGet);

router.route('/faculty_profile')
    .get(view.faculty_profileGet);

router.route('/courses')
    .get(middleware.isLoggedIn, view.coursesGet);

router.route('/feedback')
    .get(middleware.isLoggedIn, view.feedbackGet);

module.exports = router;
