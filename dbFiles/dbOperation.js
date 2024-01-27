const config = require("./dbConfig"),
  sqlConnectiontoServer = require("mysql");

async function getStudents() {
  try {
    let pool = await sqlConnectiontoServer.createConnection(config);
    let students = pool.query("SELECT * FROM AdvanceStudent");
    console.log(students);
    return students;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getStudents,
};
