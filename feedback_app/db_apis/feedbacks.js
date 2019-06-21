const database = require('../services/database.js');

const baseQuery =
  `select Feedback_ID "Feedback_ID",
         Field1 "Field1",
         Field2 "Field2",
         Field3 "Field3",
         Comment1 "Comment1",
         Comment2 "Comment2"
  from Feedback_Table`;

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

const procedureStart =
  `
  Declare
 	Course varchar(5);
 	Roll varchar(15);
 	Teacher varchar(15);
	fieldone number;
	fieldtwo number;
	fieldthree number;
	commentone varchar(100);
	commenttwo varchar(100);
  begin 
  `;

const procedureEnd =
  `
	Register_Feedback(Course,Roll,Teacher,TO_NUMBER(fieldone),TO_NUMBER(fieldtwo),TO_NUMBER(fieldthree),commentone,commenttwo);
  end;
  `;

async function create(Feedback) {
  const feedba = Object.assign({}, Feedback);

  let query = procedureStart;

  const binds = {};

  query += `\nCourse:='` + feedba.Course_Title + `';`;
  query += `\nRoll:='` + feedba.Enrollment_Number + `';`;
  query += `\nTeacher:='` + feedba.Teacher_Code + `';`;
  query += `\nfieldone:='` + feedba.Rate_the_quality + `';`;
  query += `\nfieldtwo:='` + feedba.Rate_the_assigment + `';`;
  query += `\nfieldthree:='` + feedba.Rate_The_Punctuality + `';`;
  query += `\ncommentone:='` + feedba.Comment + `';`;
  query += `\ncommenttwo:='` + feedba.Remarks + `';`;

  query += procedureEnd;
  console.log(query);
  const result = await database.simpleExecute(query, binds);

  return feedba;
}

module.exports.create = create;



// const updateSql =
//   `declare 
//     field_name varchar2(20);
//     field_value varchar2(20);
//     m number;
//     begin
//     `;



// const updatesqlEnd =
//   `
// updateTeacher(field_name, field_value, TO_NUMBER(m));
//   end;
//   `;
// async function update(teach) {
//   const teacher = Object.assign({}, teach);

//   let query = updateSql;


//   const binds = {};

//   query += `\nfield_name:='` + teacher.field_name + `';`;
//   query += `\nfield_value:='` + teacher.field_value + `';`;
//   query += `\nm:='` + teacher.m + `';`;


//   query += updatesqlEnd;
//   const result = await database.simpleExecute(query, binds);

//   return teacher;

// }

// module.exports.update = update;

