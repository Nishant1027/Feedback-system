// JavaScript source code
const database = require('../services/database.js');

const baseQuery =
    `select Enroll_ID "Enroll_ID",
         First_Name "First_Name",
         Last_Name "Last_Name",
         Degree "Degree",
         Joining_Year "Joining_Year"
  from Student_Table`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.id) {
        binds.Enroll_ID = context.id;

        query += `\nwhere Enroll_ID = :Enroll_ID`;
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
  table_name varchar(15);
  begin 
  `;

const procedureEnd =
    `
  mypack.Tab_Student(a,b,c,d,e);
  end;
  `;

async function create(Stude) {
    const Student = Object.assign({}, Stude);

    let query = procedureStart;

    const binds = {};

    query += `\na:='` + Student.Enroll_ID + `';`;
    query += `\nb:='` + Student.First_Name + `';`;
    query += `\nc:='` + Student.Last_Name + `';`;
    query += `\nd:='` + Student.Degree + `';`;
    query += `\ne:='` + Student.Joining_Year + `';`;


    query += procedureEnd;

    const result = await database.simpleExecute(query, binds);

    return Student;
}


module.exports.create = create;




const updateSql =
    `declare 
    field_name varchar2(20);
    field_value varchar2(30);
    m number;
    begin
    `;



const updatesqlEnd =
    `
updateStudent(field_name, field_value, TO_NUMBER(m));
  end;
  `;
async function update(teach) {
    const Student = Object.assign({}, teach);

    let query = updateSql;


    const binds = {};

    query += `\nfield_name:='` + Student.field_name + `';`;
    query += `\nfield_value:='` + Student.field_value + `';`;
    query += `\nm:='` + Student.m + `';`;


    query += updatesqlEnd;
    const result = await database.simpleExecute(query, binds);

    return Student;

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
mypackage1.procedure2(col_name,compvalue,TO_NUMBER(numvalue));
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

