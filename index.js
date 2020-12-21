const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

//creat a todo

app.post("/todos", async (req, res) => {
    try{
        const { firstname, lastname, username, email, password, country } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (firstname, lastname, username, email, password, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [firstname, lastname, username, email, password, country]
        );
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a todo
  
  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { firstname, lastname, username, email, password, country} = req.body;
      
      
      const updateTodo = await pool.query(
        "UPDATE todo SET firstname = $1, lastname = $2, username = $3, email = $4, password = $5, country =$6 WHERE todo_id = $7",
        [firstname, lastname, username, email, password, country ,id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  //delete data

  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(5000, () => {
    console.log("server has started on port 5000")
});
