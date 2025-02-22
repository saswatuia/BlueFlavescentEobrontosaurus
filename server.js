const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
server.set("PORT", PORT);

// middleware ---------------------------
server.use(express.static("public"));
server.use(express.json());

//Error handler
server.use(function (err, req, res, next){
	res.status(500).json({
		error: 'Something went wrong on the server!',
		descr: err
	}).end();
});

// start server ------------------------
server.listen(server.get("PORT"), function () {
	console.log("server running", server.get("PORT"));
});