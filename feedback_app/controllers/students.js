// JavaScript source code
const students = require('../db_apis/students.js');

async function get(req, res, next) {
    try {
        const context = {};

        // we should really reallly REALLY sanatize the params we're passing
        context.id = req.params.id;

        const rows = await students.find(context);

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

function getStudentFromRec(req) {
    const student = {
        Enroll_ID: req.body.Enroll_ID,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Degree: req.body.Degree,
        Joining_Year: req.body.Joining_Year
    };

    return student;
}

async function post(req, res, next) {
    try {
        let student = getStudentFromRec(req);
        student = await students.create(student);

        res.status(201).json(student);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;




function getupdateStudentFromRec(req) {
    const Student = {
        field_name: req.body.field_name,
        field_value: req.body.field_value,
        m: req.body.m
    };

    return Student;
}

async function put(req, res, next) {
    try {
        let Student = getupdateStudentFromRec(req);

        //  teacher.Teacher_ID = req.params.id;

        Student = await students.update(Student);
        // console.log(teacher.field_name);
        res.status(200).json(Student);

    } catch (err) {
        next(err);
    }
}

module.exports.put = put;


function getdeleteStudentFromRec(req) {
    const student = {
        col_name: req.body.col_name,
        compvalue: req.body.compvalue,
        numvalue: req.body.numvalue
    };

    return student;
}

async function del(req, res, next) {
    try {
        let student = getdeleteStudentFromRec(req);

        student = await students.delete(student);
        res.status(200).json(student);
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

