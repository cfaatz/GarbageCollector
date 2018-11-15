"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Wiki command: GarbageCollector
 * Author: Tudedude
 **
 * Uses a specified search string
 * and returns the first found
 * wiki article
 */
class WikiCommand extends CommandBase{
	constructor(){
    	super();
	    this.name = "wiki";
	    this.aliases = ["wikipedia", "wikisearch"];
	    this.permission = "verified";
	}
	execute(msg, args){
		// use wikipedia RESTful API to search with the provided terms
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&search=";

		// URI encode search terms
		url += encodeURIComponent(args.join(" "));

		// send request with npm request module to get data from API
		var request = require("request");
		request(url, (error, response, body) => {

			// catch HTTP/S error codes
			if(response.statusCode == 200){
				// extract data from API response
				let data = JSON.parse(body);
				// check if proper response was received
				if(data[3].length > 0){
					// format data into embed and send
					let url = data[3][0];
					let title = data[1][0];
					let slug = data[2][0];
					let ebd = this.bot.embed(title, "green", slug);
					ebd.url = url;
					msg.channel.send({embed: ebd});
				}else{
					// no results were found, tell them
					let ebd = this.bot.embed("No Results Found", "red", "Try another search term.");
					msg.channel.send({embed: ebd});
				}
			}else{
				// HTTP/S error code was returned, inform user
				let ebd = this.bot.embed("Error Searching", "red", "API returned error code " + response.statusCode);
				msg.channel.send({embed: ebd});
			}
		});
	}
}
module.exports = WikiCommand;