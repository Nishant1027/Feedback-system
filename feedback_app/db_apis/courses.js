const database = require('../services/database.js');

const baseQuery =
    `select Course_ID "Course_ID",
         Course_Name "Course_Name",
         Ses "Ses",
         L_T_P "L_T_P"
  from Course_Table`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.id) {
        binds.Course_ID = context.id;

        query += `\nwhere Course_ID = :Course_ID`;
    }

    const result = await database.simpleExecute(query, binds);

    return result.rows;
}

module.exports.find = find;

const procedureStart =
    `
  declare
  a varchar(10);
  b varchar(40);
  c varchar(30);
  d varchar(10);
  table_name varchar(15);
  begin 
  `;

const procedureEnd =
    `
  mypack.Tab_Course(a,b,c,d);
  end;
  `;

async function create(cours) {
    const Course = Object.assign({}, cours);

    let query = procedureStart;

    const binds = {};

    query += `\na:='` + Course.Course_ID + `';`;
    query += `\nb:='` + Course.Course_Name + `';`;
    query += `\nc:='` + Course.Ses + `';`;
    query += `\nd:='` + Course.L_T_P + `';`;


    query += procedureEnd;

    const result = await database.simpleExecute(query, binds);

    return Course;
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
updateCourse(field_name, field_value, TO_NUMBER(m));
  end;
  `;
async function update(teach) {
    const Course = Object.assign({}, teach);

    let query = updateSql;


    const binds = {};

    query += `\nfield_name:='` + Course.field_name + `';`;
    query += `\nfield_value:='` + Course.field_value + `';`;
    query += `\nm:='` + Course.m + `';`;


    query += updatesqlEnd;
    const result = await database.simpleExecute(query, binds);

    return Course;

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
mypackage1.procedure3(col_name,compvalue,TO_NUMBER(numvalue));
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

