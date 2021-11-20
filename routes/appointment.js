const router = require("express").Router();
const pool = require("../db");

//get all appointment
router.get("/:physician_id", async (req, res) => {
  const { physician_id } = req.params;
	try {
		//get all appointment
		const appointment = await pool.query("SELECT * FROM appointment WHERE physician_id = $1", [physician_id]);
		res.json(appointment.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
});




module.exports = router;
