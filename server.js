const express = require("express");
const router = require('./modules/router');
const userRouter = require('./modules/user_router');
const users = require('./modules/users');
const server = express();
const PORT = process.env.PORT || 8080;
server.set("PORT", PORT);

// middleware ---------------------------
server.use(express.static("public"));
server.use(express.json());
server.use(router);
server.use(userRouter);
server.use(users);

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

function test (){
	
}
