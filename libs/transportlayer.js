var path = require('path');
var basePath = path.dirname(require.main.filename);
var uuid = require(basePath + '/node_modules/node-uuid');
var extend = require(basePath + '/node_modules/node.extend');




var TransportLayer = function(){
	var _this = this;
	var messageString;
	var message_json = {};

	this.fromClientBuild = function(inMessageString){

		var options = 
			{
				routingLayer:{},
				dataLayer:{}
			}
		options = extend(options, JSON.parse(inMessageString));

		messageString = inMessageString;
		message_json = options;
		return message_json;
	}

	this.toClientBuild = function(inUserId, inDeviceId, inSecurityToken, inTransactionId){
		message_json = 
			{
				userId:inUserId,
				deviceId:inDeviceId,
				securityToken:inSecurityToken,
				transactionId:inTransactionId
			}

	}

	this.addDataLayer = function(inDataLayer){
		message_json.dataLayer = inDataLayer;
	}

	this.getTransportLayerOnly = function(){
		//removes routing and data layers & returns new instance 
		var resultTransportLayer = new TransportLayer();
		for(key in message_json){
			if(!(key == 'routingLayer') && !(key == 'dataLayer')){
				resultTransportLayer.addKeyValue(key, message_json[key]);
			}
		}
		return resultTransportLayer;
	}

	this.addKeyValue = function(inKey, inValue){
		message_json[inKey] = inValue;
	}

	this.addRoutingLayer = function(inRoutingLayer){
		message_json.routingLayer = inRoutingLayer;
	}

	this.toString = function(){
		return JSON.stringify(message_json);
	}

	this.toJson = function(){
		return message_json;
	}

	this.dump = function(){
		console.dir(message_json);
	}

}

module.exports = TransportLayer;