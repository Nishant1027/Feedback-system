// JavaScript source code
const courses = require('../db_apis/courses.js');

async function get(req, res, next) {
  try {
    const context = {};

    // we should really reallly REALLY sanatize the params we're passing
    context.id = req.params.id;

    const rows = await courses.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

function getCourseFromRec(req) {
  const course = {
    Course_ID: req.body.Course_ID,
    Course_Name: req.body.Course_Name,
    Ses: req.body.Ses,
    L_T_P: req.body.L_T_P,
  
  };

  return course;
}

async function post(req, res, next) {
  try {
      let course = getCourseFromRec(req);
      course = await courses.create(course);

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;




function getupdateCourseFromRec(req) {
    const Course = {
        field_name: req.body.field_name,
        field_value: req.body.field_value,
        m: req.body.m
    };

    return Course;
}

async function put(req, res, next) {
    try {
        let Course = getupdateCourseFromRec(req);

        //  teacher.Teacher_ID = req.params.id;

        Course = await courses.update(Course);
        // console.log(teacher.field_name);
        res.status(200).json(Course);

    } catch (err) {
        next(err);
    }
}

module.exports.put = put;


function getdeleteCourseFromRec(req) {
    const course = {
        col_name: req.body.col_name,
        compvalue: req.body.compvalue,
        numvalue: req.body.numvalue
    };

    return course;
}

async function del(req, res, next) {
    try {
        let course = getdeleteCourseFromRec(req);

        course = await courses.delete(course);
        res.status(200).json(course);
        /* if (Course) {
             res.status(204).end();
         } else {
             res.status(404).end();
         }*/
    } catch (err) {
        next(err);
    }
}

module.exports.delete = del;


