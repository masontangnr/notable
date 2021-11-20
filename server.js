const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // for req.body to be able to use json
app.use(cors());

app.use("/todo", require("./routes/todo"));
app.use("/physician", require("./routes/physician"));
app.use("/appointment", require("./routes/appointment"));

app.get("/", (req, res) => {
	res.send("Ux Research Repository Test127s");
});

app.listen(PORT, () => {
	console.log("server is running on port 5000");
});
