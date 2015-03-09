var path = require('path');
var fs = require('fs');
var configData = fs.readFileSync(path.dirname(require.main.filename) + '/cip.conf', 'utf8');
configData = JSON.parse(configData);
var basePath = path.dirname(require.main.filename);
var url = require('url');


//var request = require(basePath + '/node_modules/request');
var http = require('http');





module.exports.controller = function(app){

	/*var redirectJstruct = 
		{
			protocol:'http',
			ip:'192.168.0.16',
			port:35001
		}*/

	var redirectJstruct = 
		{
			protocol:'http',
			ip:'192.168.0.16',
			port:35001
		}



	app.get('*', function(req, res){
		//req.url


		var url_parts = url.parse(req.url,true, true);
		var route = url_parts.path;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		//var port = 
		console.log('url_parts');
		console.dir(url_parts);
		res.redirect(redirectUrl + route);
	});



	app.post('*', function(req, res){

		var url_parts = url.parse(req.url,true, true);
		var route = url_parts.path;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		//console.log('url_parts');
		//console.dir(url_parts);

		var data = req.body;
		/*var data = 
			{
				no:'ssssssss'
			}*/

		var req = http.request(
			{
				host: redirectJstruct.ip,
				port: redirectJstruct.port,
				path: route,
				method: 'POST',
				headers: 
					{
						'Content-Type': 'application/json',
						'Content-Length': Buffer.byteLength(JSON.stringify(data))
					}
			},
			function(response) {
				var str = ''
				response.on('data', function (chunk) {
					str += chunk;
				});
				response.on('end', function () {
					console.log(str);
					res.setHeader('Content-Type', 'application/json');
					res.end(str);
				});
			}
		);

		//sending to server for response
		req.write(JSON.stringify(data));
		req.end();


	});








}