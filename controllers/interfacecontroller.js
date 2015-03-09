console.log('loading-->----------------------->--  T r a n s a c t i o n   C o n t r o l l e r  --<-----------------------');


var fs = require('fs');
var path = require('path');
var basePath = path.dirname(require.main.filename);
var TransportLayer = require(basePath + '/libs/transportlayer.js');
var HashArrayObject = require(basePath + '/libs/hashofarrayobject.js');



var deviceTokenId_Hash = {};
var userId_hashOfArray = new HashArrayObject();
var serverConnectionId_hashOfArray = new HashArrayObject(); 




//------------------>--COMMUNICATION--<-------------
var Controller = function(router){

	//============================================================================
	//------ >  CONNECT < --------------------------------------------------------
	//============================================================================
	router.onConnect(function(inConnection){
		console.log('CONNECT from roiter');
		//console.dir(inJstruct);
		inConnection.socket.write(startupMessage());

	});

	//============================================================================
	//------ >  DISCONNECT < -----------------------------------------------------
	//============================================================================
	router.onDisconnect(function(inConnection){
		console.log('DISCONNECT from roiter');
		console.dir(inConnection);
	});

	//============================================================================
	//------ >  OnType TEST< -----------------------------------------------------
	//============================================================================
	router.type('test', function(inConnection, inData){
		console.log('Test from roiter');
		console.dir(inData);
		inConnection.socket.write("TEST BACK TO YOU");
	});


	//============================================================================
	//------ >  toCipInformation  < ----------------------------------------------
	//============================================================================
	router.type('toCipInformation', function(inConnection, inTransportLayer_json){
		console.log('toCipInformation from roiter');
		console.dir(JSON.stringify(inTransportLayer_json));
		var cipLayer_json = inTransportLayer_json.cipLayer;

		//@@@@@@@@@@@@ USER DEVICE CONNECTED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
		if(cipLayer_json.command == 'addConnection'){
			deviceTokenId_Hash[cipLayer_json.deviceTokenId] = 
				{
					entryTime:new Date().getTime(),
					userId:cipLayer_json.userId,
					deviceId:cipLayer_json.deviceId,
					serverConnectionId:inConnection.connectionId,
					deviceTokenId:cipLayer_json.deviceTokenId,
				}
			;

			userId_hashOfArray.add(cipLayer_json.userId, 
				{
					entryTime:new Date().getTime(),
					deviceTokenId:cipLayer_json.deviceTokenId,
					serverConnectionId:inConnection.connectionId,
				}
			);

			serverConnectionId_hashOfArray.add(inConnection.connectionId, cipLayer_json.deviceTokenId);

			console.log('deviceTokenId_Hash');
			console.dir(deviceTokenId_Hash);

			console.log('userId_hashOfArray');
			console.dir(userId_hashOfArray.getArrayFromHash(cipLayer_json.userId));

			console.log('serverConnectionId_hashOfArray');
			console.dir(serverConnectionId_hashOfArray);

		}

		//cipLayer_json.deviceTokenId
		//cipLayer_json.userId
		//inConnection.connectionId
		//
		//@@@@@@@@@@@@ USER DEVICE DISCONNECTED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
		if(cipLayer_json.command == 'removeConnection'){
			delete deviceTokenId_Hash[cipLayer_json.deviceTokenId];

			var userIdArray = userId_hashOfArray.getArrayFromHash(cipLayer_json.userId);
			for(var userIdArrayIndex in userIdArray){
				if(userIdArray[userIdArrayIndex].deviceTokenId == cipLayer_json.deviceTokenId){
					userId_hashOfArray.removeItemFromSpecificHash(cipLayer_json.userId, userIdArray[userIdArrayIndex]);
				}
			}

			serverConnectionId_hashOfArray.removeItemFromSpecificHash(inConnection.connectionId, cipLayer_json.deviceTokenId);

			console.log('deviceTokenId_Hash');
			console.dir(deviceTokenId_Hash);

			console.log('userId_hashOfArray');
			console.dir(userId_hashOfArray.getArrayFromHash(cipLayer_json.userId));

			console.log('serverConnectionId_hashOfArray');
			console.dir(serverConnectionId_hashOfArray);
		}


	});














	//============================================================================
	//------ >  MESSAGE STARTUP TO NEW CONNECTED CLIENT---------------------------
	//============================================================================
	var startupMessage = function(){
		var message = 
			{
				cipLayer:
					{
						isWsPassThrough:true,
						command:'test',
						message:'this is a test message',
						ws:
							{
								mydtaaa:'lllll'
							}
					},
			}

		return JSON.stringify(message);
	}

}

module.exports = Controller;