const express = require('express');
const router = new express.Router();
const teachers = require('../controllers/teachers.js');
const courses = require('../controllers/courses.js');
const students = require('../controllers/students.js');
const feedbacks = require('../controllers/feedbacks.js');
const cfeedbacks = require('../controllers/cfeedbacks.js');
router.route('/teachers/:id?')
  .get(teachers.get)
    .post(teachers.post)
    .put(teachers.put)
    .delete(teachers.delete);
router.route('/students/:id?')
    .get(students.get)
    .post(students.post)
    .put(students.put)
    .delete(students.delete);
router.route('/courses/:id?')
    .get(courses.get)
    .post(courses.post)
    .put(courses.put)
    .delete(courses.delete);
router.route('/feedbacks/:id?')
    .get(feedbacks.get)
    .post(feedbacks.post);
router.route('/cfeedbacks/:id?')
    .get(cfeedbacks.get);
module.exports = router;
