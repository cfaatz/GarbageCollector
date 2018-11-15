/**
 * GarbageCollector - Main File
 * *
 * Should not need modification
 * ~~ in a perfect world ~~
 */

const Discord = require('discord.js');
const Config = require('./config.js');
const bot = new Discord.Client();
const fs = require('fs');
bot.config = new Config();
bot.request = require('request');
bot.fs = require('fs');

bot.on('ready', () => {

	var versionStr = "## Garbage Collector v" + bot.config.manifest.version + " ##";
	var spacer = versionStr.replace(/(.)/g,function (x){return "#";});
	console.log(spacer);
	console.log(versionStr);
	console.log(spacer);

	bot.commands = [];
	bot.root = __dirname;
	loadCommands(bot);

});

bot.on('message', (msg) => {
	if(msg.author.id == bot.user.id)return;
	let prefix = bot.config.core.cmdPrefix;
	if(msg.content.indexOf(prefix) == 0){
		if(msg.content.startsWith("!exec") || msg.content.startsWith("!run")){
			let name = "exec";
			bot.commands.forEach((command) => {
				if(command.name == name){
					command.execute(msg);
				}
			});
		}else{
			let args = msg.content.substring(1).split(" ");
			let name = args[0];
			args.shift();
			bot.commands.forEach((command) => {
				if(command.name == name.toLowerCase()){
					command.execute(msg, args);
				}else{
					command.aliases.forEach((alias) => {
						if(alias == name.toLowerCase()){
							command.execute(msg, args);
						}
					});
				}
			});
		}
	}
});

bot.on('messageReactionAdd', (messageReaction, user) => {
	if(messageReaction.count >= 3){
		bot.fs.readFile('./storage/starlog.json', 'utf8', (err, data) => {
			var obj = JSON.parse(data);
			if(obj[messageReaction.message.id] == null){
//				bot.channels.get('504681679487762432');
			}
		});
	}
});

bot.login(bot.config.core.token);

function loadCommands(bot){
	fs.readdir("./commands", (err, files) => {
		if(err)console.log(err);
		else{
			files.forEach(function(file){
				// do not load command base
				if(file == "commandBase.js")return;

				// do not load if command is disabled
				else if(file.endsWith(".disabled.js"))return;

				// load file with optional debug mode
				else if(file.endsWith(".js")){
					const Command = require("./commands/" + file);
					var cmd = new Command();
					cmd.file = file;
					cmd.init();
					if(file.endsWith(".debug.js")){
						cmd.debug = true;
					}
					bot.commands.push(cmd);
				}
			});
			if(bot.commands.length == 1)console.log("Loaded 1 command.");
			else console.log("Loaded " + bot.commands.length + " commands.");
		}
	});
}

bot.embed = function(_title, _color, _description, _fields){
	// initialize embed
	var ebd = {};
	if(Object.prototype.toString.call(_color) === "[object String]"){
		// if color is string, process for color defaults
		switch(_color.toLowerCase()){
			case "red":
				_color = 0xf44a41;
				break;
			case "blue":
				_color = 0x4286f4;
				break;
			case "orange":
				_color = 0xf4b241;
				break;
			case "cyan":
				_color = 0x35e8e5;
				break;
			case "magenta":
				_color = 0xdc35e8;
				break;
			case "purple":
				_color = 0x8235e8;
				break;
			case "green":
			case "":
			// if unknown, default to green
			default:
				_color = 0x2ecc71;
				break;

		}
	}else if(!(_color == undefined) && !(Number.isInteger(_color))){
		// invalid color type defined, un-set color
		_color == undefined;
	}
	// set field properties unless they are undefined
	if(_title != undefined)ebd.title = _title;
	if(_color != undefined)ebd.color = _color;
	if(_description != undefined)ebd.description = _description;
	if(_fields != undefined)ebd.fields = _fields;
	// set timestamp and footer for embed
	ebd.timestamp = new Date(),
	ebd.footer = {
		icon_url: bot.user.avatarURL,
		text: "GarbageCollector v" + bot.config.manifest.version
	}
	return ebd;
}

module.exports = bot;