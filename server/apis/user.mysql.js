const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});
function addTodo(todo) {
  return new Promise((res, rej) => {
    var sql = `INSERT INTO todolists (todo,status) VALUES (?,?)`;
    const value = [todo.todo, todo.status];
    connection.query(sql, value, function (err, result) {
      console.log("them thanh cong");
    });
  });
}
function getTodo() {
  var sql = `SELECT * FROM todolists`;
  return new Promise((res, rej) => {
    connection.query(sql, function (err, result) {
      res(result);
    });
  });
}
function deleteTodo(id) {
    if(id==-1){
        var sql = `DELETE FROM todolists`;

    }else{
        var sql = `DELETE FROM todolists WHERE id = ${id}`;

    }
    return new Promise((res, rej) => {
      connection.query(sql, function (err, result) {
        res(result);
      });
    });
  }
  function updateTodo(id,todo) {
    console.log(todo);
    var sql = `UPDATE todolists SET todo = ?,status=? WHERE id = ?`;
    const value=[todo.todo,todo.status,id]
    return new Promise((res, rej) => {
      connection.query(sql, value, function (err, result) {
        res(result);
      });
    });
  }
module.exports = {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo
};
