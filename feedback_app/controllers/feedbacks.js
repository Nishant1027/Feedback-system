const feedbacks = require('../db_apis/feedbacks.js');

async function get(req, res, next) {
  try {
    const context = {};

    // we should really reallly REALLY sanatize the params we're passing
    context.id = req.params.id;

    const rows = await feedbacks.find(context);

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

function getfeedbackFromRec(req) {
  const feedback = {
    Course_Title: req.body.Course_Title,
    Enrollment_Number: req.body.Enrollment_Number,
    Teacher_Code: req.body.Teacher_Code,
    Rate_the_quality: req.body.Rate_the_quality,
    Rate_the_assigment: req.body.Rate_the_assigment,
    Rate_The_Punctuality: req.body.Rate_The_Punctuality,
    Comment: req.body.Comment,
    Remarks: req.body.Remarks
  };

  return feedback;
}

async function post(req, res, next) {
    try {
      let feedback = getfeedbackFromRec(req);
    feedback = await feedbacks.create(feedback);

    res.status(201).json(feedback);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;



// function getupdatefeedbackFromRec(req) {
//     const feedback = {
//         field_name: req.body.field_name,
//         field_value: req.body.field_value,
//         m: req.body.m
//     };

//     return feedback;
// }


// async function put(req, res, next) {
//     try {
//         let feedback = getupdatefeedbackFromRec(req);

//       //  feedback.feedback_ID = req.params.id;
      
//         feedback = await feedbacks.update(feedback);
//        // console.log(feedback.field_name);
//             res.status(200).json(feedback);
       
//     } catch (err) {
//         next(err);
//     }
// }

// module.exports.put = put;

