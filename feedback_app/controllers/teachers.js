const teachers = require('../db_apis/teachers.js');

async function get(req, res, next) {
  try {
    const context = {};

    // we should really reallly REALLY sanatize the params we're passing
    context.id = req.params.id;

    const rows = await teachers.find(context);

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

function getTeacherFromRec(req) {
  const teacher = {
    Teacher_ID: req.body.Teacher_ID,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Designation: req.body.Designation,
    Dept: req.body.Dept
  };

  return teacher;
}

async function post(req, res, next) {
  try {
    let teacher = getTeacherFromRec(req);
    teacher = await teachers.create(teacher);

    res.status(201).json(teacher);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;



function getupdateTeacherFromRec(req) {
    const teacher = {
        field_name: req.body.field_name,
        field_value: req.body.field_value,
        m: req.body.m
    };

    return teacher;
}


async function put(req, res, next) {
    try {
        let teacher = getupdateTeacherFromRec(req);

      //  teacher.Teacher_ID = req.params.id;
      
        teacher = await teachers.update(teacher);
       // console.log(teacher.field_name);
            res.status(200).json(teacher);
       
    } catch (err) {
        next(err);
    }
}

module.exports.put = put;

function getdeleteTeacherFromRec(req) {
    const teacher = {
        col_name: req.body.col_name,
        compvalue: req.body.compvalue,
        numvalue: req.body.numvalue
    };

    return teacher;
}

async function del(req, res, next) {
    try {
        let teacher = getdeleteTeacherFromRec(req);

        teacher = await teachers.delete(teacher);
        res.status(200).json(teacher);
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
