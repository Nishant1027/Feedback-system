const teachers = require('../db_apis/teachers.js');
const courses = require('../db_apis/courses.js');

async function get(req, res, next) {
    try {
        res.status(200);
        const context = {};

        // we should really reallly REALLY sanatize the params we're passing
        context.id = req.params.id;

        const rows = await teachers.find(context);
        var teacherData = [];
        JSON.stringify(rows, function (key, value) {
            teacherData.push(value);
        });
        res.render('pages/dashboard', {
            teachers: teacherData[0]
        });
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;

async function teachGet(req, res, next) {
    try {
        res.status(200);
        const context = {};

        // we should really reallly REALLY sanatize the params we're passing
        context.id = req.params.id;

        const rows = await teachers.find(context);
        var teacherData = [];
        JSON.stringify(rows, function (key, value) {
            teacherData.push(value);
        });
        res.render('pages/dashboard', {
            teachers: teacherData[0]
        });
    } catch (err) {
        next(err);
    }
}

module.exports.teachGet = teachGet;
module.exports.get = get;

async function studentGet(req, res, next) {
    try {
        res.status(200);
        const context = {};

        // we should really reallly REALLY sanatize the params we're passing
        context.id = req.params.id;

        const rows = await teachers.find(context);
        var teacherData = [];
        JSON.stringify(rows, function (key, value) {
            teacherData.push(value);
        });
        res.render('pages/dashboard', {
            teachers: teacherData[0]
        });
    } catch (err) {
        next(err);
    }
}

module.exports.studentGet = studentGet;

async function fac_get(req, res, next) {
    try {
        res.status(200);
        res.render('pages/fac_dashboard');
    } catch (err) {
        next(err);
    }
}

module.exports.fac_get = fac_get;

async function loginGet(req, res, next) {
    try {
        res.status(200);
        res.render('pages/login');
    } catch (err) {
        next(err);
    }
}



module.exports.loginGet = loginGet;

async function registerGet(req, res, next) {
    try {
        res.status(200);
        res.render('pages/register');
    } catch (err) {
        next(err);
    }
}

module.exports.registerGet = registerGet;

async function profileGet(req, res, next) {
    try {
        res.status(200);
        res.render('pages/profile');
    } catch (err) {
        next(err);
    }
}

module.exports.profileGet = profileGet;

async function facultyGet(req, res, next) {
    try {
        res.status(200);
        const context = {};

        // we should really reallly REALLY sanatize the params we're passing
        context.id = req.params.id;

        const rows = await teachers.find(context);
        var teacherData = [];
        JSON.stringify(rows, function (key, value) {
            teacherData.push(value);
        });
        console.log(teacherData[0]);
        res.render('pages/faculty', {
            teachers: teacherData[0]
        });
    } catch (err) {
        next(err);
    }
}

module.exports.facultyGet = facultyGet;

async function faculty_profileGet(req, res, next) {
    try {
        res.status(200);
        res.render('pages/faculty_profile');
    } catch (err) {
        next(err);
    }
}

module.exports.faculty_profileGet = faculty_profileGet;

async function coursesGet(req, res, next) {
    try {
        const context = {};

        // we should really reallly REALLY sanatize the params we're passing
        context.id = req.params.id;

        const rows = await courses.find(context);
        console.log(rows);
        var courseData = [];
        JSON.stringify(rows, function (key, value) {
            courseData.push(value);
        });
        res.status(200);
        res.render('pages/courses',{
            courses: courseData[0]
        });
    } catch (err) {
        next(err);
    }
}

module.exports.coursesGet = coursesGet;

async function feedbackGet(req, res, next) {
    try {
        res.status(200);
        res.render('pages/feedback');
    } catch (err) {
        next(err);
    }
}

module.exports.feedbackGet = feedbackGet;
