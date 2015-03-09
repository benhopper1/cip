var path = require('path');
var basePath = path.dirname(require.main.filename);
var mySql = require(basePath + '/node_modules/mysql');
/*
*	instanceName
*	host
*	user
*	password
*	database
*
*/
var Connection = function(inData){
	console.log("instance created:"+inData.instanceName);
	var instance = this;
	var instanceName = inData.instanceName;
	var host = inData.host;
	var user = inData.user;
	var password = inData.password;
	var database = inData.database;

	//static----
	Connection.instanceHash[instanceName] = instance;

	//--connect this instance
	var mySqlConnection = mySql.createConnection({
  		host     : host,
  		user     : user,
  		password : password,
 		database : database
	});
	mySqlConnection.connect();

	this.getConnection = function(){
		if(mySqlConnection){
			return mySqlConnection;
		}
	}

	this.getInstanceName = function(){
		return instanceName;
	}
}


//-----static creation area ------------
if(!(Connection.instanceHash)){
	Connection.instanceHash = {};
}

Connection.getMaybeCreate = function(inData){
	var instance = Connection.instanceHash[inData.instanceName];
	if(instance){
		return instance;
	}else{
		instance = new Connection(inData);
		return instance;
	}
}

Connection.getInstance = function(inInstanceName){
	var instance = Connection.instanceHash[inInstanceName];
	if(instance){
		return instance;
	}else{		
		return false;
	}
}

module.exports = Connection;




