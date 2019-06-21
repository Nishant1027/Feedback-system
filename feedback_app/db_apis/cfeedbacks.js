// JavaScript source code
const database = require('../services/database.js');

const baseQuery =
    `select Feedback_ID "Feedback_ID",
         Teacher_ID "Teacher_ID",
         Course_ID "Course_ID",
         Enroll_ID "Enroll_ID"
  from CFeedback_Table`;

const baseQuery2 =
    `select Feedback_ID "Feedback_ID",
         Field1 "Field1",
         Field2 "Field2",
         Field3 "Field3",
         Comment1 "Comment1",
         Comment2 "Comment2"
  from Feedback_Table`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.id) {
        binds.Feedback_ID = context.id;

        query += `\nwhere Feedback_ID = :Feedback_ID`;
    }

    const result = await database.simpleExecute(query, binds);

    // let query2 = baseQuery2;
    // feedbacks.rows.forEach(row => {
    //   const binds2 = {};

    //   if (row.id) {
    //     binds2.Feedback_ID = context.id;

    //     query += `\nwhere Feedback_ID = :Feedback_ID`;
    //   }
    //   let result = await database.simpleExecute(query2, binds2);
    // });
    // const courses = await database.simpleExecute(query, binds);

    return result.rows;
}

module.exports.find = find;