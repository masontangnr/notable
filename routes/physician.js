const router = require("express").Router();
const pool = require("../db");

//get all physicians
router.get("/", async (req, res) => {
	try {
		//get all physicianss
		const physician = await pool.query("SELECT * FROM physician");
		res.json(physician.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
});




module.exports = router;
