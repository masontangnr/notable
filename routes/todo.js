const router = require("express").Router();
const pool = require("../db");

//create a todo
router.post("/", async (req, res) => {
	try {
		console.log(req.body);
    const { todo_item, name } = req.body;
	//create todo
  const newTodo = await pool.query(
    "INSERT INTO todo(todo_item, name) VALUES ($1, $2) RETURNING *",
    [todo_item, name]
  );

  res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//get all todo
router.get("/", async (req, res) => {
	try {
		//get all todo
		const todo = await pool.query("SELECT * FROM todo");
		res.json(todo.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
});

//edit category
router.put("/", async (req, res) => {
	const { name, todo_item, id } = req.body;

	try {
		//check if todoItem exist
		const todoItemExist = await pool.query(
			"SELECT id FROM todo WHERE id = $1",
			[id]
		);
		//if category does not exist then return 400 status
		if (todoItemExist.rows.length === 0) {
			return res.status(400).json({
				message: "todo does not exist",
			});
		}
		//edit todo
		const editTodo = await pool.query(
			"UPDATE todo SET name = $1, todo_item = $2 WHERE id = $3 RETURNING *",
			[name, todo_item, id]
		);

		res.json(editTodo.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
});

//delete category
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		//check if category exist
		const todoExist = await pool.query(
			"SELECT id FROM todo WHERE id = $1",
			[id]
		);
		//return error code if todo does not exist
		if (todoExist.rows.length === 0) {
			return res.status(400).json({
				message: "todo does not exist",
			});
		}
		//delete todo
		const deletetodo = await pool.query(
			"DELETE FROM todo WHERE id = $1",
			[id]
		);
		res.json("todo post deleted");
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
});


module.exports = router;
