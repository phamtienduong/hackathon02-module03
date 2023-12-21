var express = require("express");
const route = express.Router();
const data = require("./user.mysql");
route.post("/apis/todo", (req, res) => {
  data.addTodo(req.body);
  res.status(200).json({
    message: "Them thanh cong",
  });
});
route.get("/apis/todo", async (req, res) => {
  const todos = await data.getTodo();
  res.status(200).json({
    todo: todos,
    message: "lay thanh cog",
  });
});
route.delete("/apis/todo/:id",(req,res)=>{
    data.deleteTodo(req.params.id);
    res.status(200).json({
        message: "xoa thanh cong",
      });
})
route.put("/apis/todo/:id",(req,res)=>{
    data.updateTodo(req.params.id,req.body);
    res.status(200).json({
        message: "sua thanh cong",
      });
})

module.exports = route;
