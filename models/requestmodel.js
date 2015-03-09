var path = require('path');
var fs = require('fs');


var Connection = require(__dirname + '/connection.js');
connection = Connection.getInstance('arf').getConnection();


//model----------------
var Model = function(){
	var _this = this;

	this.logData = function(inData){
		inData.referrer = "referrer:" + inData.referrer;
		connection.query("INSERT INTO tb_request (agent, ip, referrer, requestUrl) VALUES( "+ connection.escape(inData.agent) + ", " + connection.escape(inData.ip) + ", " + connection.escape(inData.referrer) + ", "+ connection.escape(inData.requestUrl) + " )", function(err, rows, fields){
		// nothing to do here
		console.dir(err);
		});
	}

}

module.exports = Model;
