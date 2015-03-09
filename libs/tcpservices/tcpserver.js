//####################################################################################
//TCP Server for sync and scalability
//####################################################################################

var TcpServer = function(inData){
	var net = require('net');
	var _this = this;
	var theServer;
	var clientHash = {};

	var server = net.createServer(function(c){
		console.log('server connected');
		clientHash[c._handle.fd] = 
			{
				socket:c,
				createTime:new Date().getTime(),
				isConnected:false
			}

		c.send = function(inData){
			c.write(JSON.stringify(inData));
			c.pipe(c);
		}

		c.on('end', function(){
			delete clientHash[c._handle.fd];
			if(inData.onDisconnect()){inData.onDisconnect(theServer, c);}
		});
		c.on('data', function(data){
			console.log('server msg:' + data);
			//_this.send(c, {data:"yesyMan" + c._handle.fd});
			if(inData.onMessage){
				var theData = "";
				try{
					theData = JSON.parse(data);
				}catch(e){
					return;
				}
				inData.onMessage(theServer, c, theData);}
				c.destroy();
		});
		
	});

	theServer = server;
	server.listen(inData.port, inData.host, function() {
		console.log('server bound');
		if(inData.onInstall){
			inData.onInstall();
		}
	});

}

module.exports = TcpServer;