var http = require('http');
var url = require('url');
var fs = require('fs');

// Go to localhost:8008/search

var props = ['name', 'id', 'image', 'url'];

//Routing handlers
var handle = [];
handle["search"] = function(response, requesturl){
	var options = {
		host: 'api.seatgeek.com', 
		path: '/2/events?geoip=true&range=5mi'
	};
	http.get(options, function(res){
		var data = '';
		res.on('data', function(chunk){
			data += chunk;
		});
		res.on('end', function(){
			//console.log(data);
			var results = JSON.parse(data);			
			var events = results.events; 
			var resultArray = [];
			for(var i = 0; i < events.length; i++){
				var event = events[i];
				if(event.type==='concert'){
					console.log(event.title);
					var performers = event.performers; 
					for(var j = 0; j < performers.length; j++){
						var performer = performers[j];
						resultArray.push(performer);
						console.log('performer: ');
						for(var k = 0; k < props.length; k++){
							console.log('  prop: ' + props[k] + ' ' + performer[props[k]]);
						}
					}
				}
			}
			response.write(JSON.stringify(resultArray));
			response.end();
		});

	}).on('error', function(e){
		console.log('Got error: ' + e);
	});
}

//Server 
http.createServer(function (request, response) {
	var parsedurl = url.parse(request.url, true);
	console.log('Request for ' + parsedurl.pathname + " received");
	handle["search"](response, parsedurl);
}).listen(8008);


//Router
function route(requesturl, response){
	var pathname = requesturl.pathname.indexOf('/') == 0 ? requesturl.pathname.substring(1) : requesturl.pathname;
	console.log(pathname);
	if(typeof handle[pathname] === 'function'){
		handle[pathname](response, requesturl);
	} else {
		console.log('Fail, no request handler for ' + pathname);
	}
}
