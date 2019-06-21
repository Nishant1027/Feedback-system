const database = require('../services/database.js');

const baseQuery =
 `select Teacher_ID "Teacher_ID",
         First_Name "First_Name",
         Last_Name "Last_Name",
         Designation "Designation",
         Dept "Dept"
  from Teacher_Table`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.Teacher_ID = context.id;

    query += `\nwhere Teacher_ID = :Teacher_ID`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const procedureStart =
  `
  declare
  a varchar(10);
  b varchar(10);
  c varchar(10);
  d varchar(10);
  e varchar(10);
  begin 
  `;

const procedureEnd =
  `
  mypack.Tab_Teacher(a,b,c,d,e);
  end;
  `;

async function create(teach) {
  const Teacher = Object.assign({}, teach);

  let query = procedureStart;

  const binds = {};

  query += `\na:='` + Teacher.Teacher_ID+`';`;
  query += `\nb:='` + Teacher.First_Name+`';`;
  query += `\nc:='` + Teacher.Last_Name+`';`;
  query += `\nd:='` + Teacher.Designation+`';`;
  query += `\ne:='` + Teacher.Dept+`';`;


  query += procedureEnd;

  const result = await database.simpleExecute(query, binds);

  return Teacher;
}

module.exports.create = create;



const updateSql =
    `declare 
    field_name varchar2(20);
    field_value varchar2(20);
    m number;
    begin
    `;



const updatesqlEnd =
    `
updateTeacher(field_name, field_value, TO_NUMBER(m));
  end;
  `;
async function update(teach) {
    const teacher = Object.assign({}, teach);

    let query = updateSql;
    
    
    const binds = {};

    query += `\nfield_name:='` + teacher.field_name + `';`;
    query += `\nfield_value:='` + teacher.field_value + `';`;
    query += `\nm:='` + teacher.m + `';`;


    query += updatesqlEnd;
    const result = await database.simpleExecute(query, binds);
    
    return teacher;
   
}

module.exports.update = update;

const deleteSql =
    `declare
    col_name varchar2(15);
    compvalue varchar2(20);
    numvalue number;
    begin
    `;



const deletesqlEnd =
    `
mypackage1.procedure1(col_name,compvalue,TO_NUMBER(numvalue));
 end;
  `;


async function del(teac) {
   

    const teach = Object.assign({}, teac);
    let query = deleteSql;
    const binds = {};
    query += `\ncol_name:='` + teach.col_name + `';`;
    query += `\ncompvalue:='` + teach.compvalue + `';`;
    query += `\nnumvalue:='` + teach.numvalue + `';`;

    query += deletesqlEnd;
    console.log(query)
    const result = await database.simpleExecute(query, binds);

    return teach;
}

module.exports.delete = del;

