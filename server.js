const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
server.set("port", PORT);

const blogposts = require("./modules/blogposts.js");

//bare tull


// middleware ---------------------------
server.use(express.static("public"));
server.use(express.json());


server.use(blogposts);

// general error handling ------
server.use(function (err,req, res, next){
	
	console.error(err);
	
	res.status(500).json({
		error: 'Something went wrong on the server!',
		descr: err
	}).end();
});

// start server ------------------------
server.listen(server.get("port"), function () {
	
});

