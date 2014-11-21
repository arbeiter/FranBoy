var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(request,response){
	console.log("I get here");
	
	//Construct path for file
	var path1 =  path.resolve(__dirname, 'index.html');
	console.log("Path is " + path1);
	var file = fs.readFile(path1,function(err, data){
		if(err!==null)
			console.log(err);
		response.write(data);
	});
	response.writeHeader(200, {"Content-Type":"text/html"});

	console.log("Print out index file");

}).listen(8088, 'localhost');
console.log("Node app");
