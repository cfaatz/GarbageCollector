"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Load command - GarbageCollector
 * Author: Tudedude
 **
 * Loads a command module
 */
class LoadCommand extends CommandBase{
  constructor(){
    super();
    this.name = "load";
    this.aliases = ["l", "enable", "loadcommand", "lc"];
    this.permission = "admin";
  }
  async execute(msg, args, callback, ebdMsg){
    // send beginning status message to inform user command was received
    var newMsg = undefined;
    const initEmbed = () => new Promise((resolve, reject) =>{
      var initEbd = this.bot.embed("Searching for commands.");
      msg.channel.send({embed: initEbd}).then((newMsg) => {resolve(newMsg);});
    });
    if(ebdMsg == undefined){
      newMsg = await initEmbed();
    }else{
      newMsg = ebdMsg;
    }

    // must have args to load a command
    if(args.length > 0){

      // search command directory for terms defined in arguments
      this.bot.fs.readdir('./commands', (err, files) => {
        var loaded = [];
        files.forEach((file) => {
          // do not load command base
          if(file == "commandBase.js")return;

          // initialize command to access aliases
          var CommandClass = require(this.bot.root + "/commands/" + file);
          var command = new CommandClass();

          args.forEach(arg => {

            // check if argument matches the command's name
            if(command.name.toLowerCase() == arg.toLowerCase()){
              // initialize command, load, and add to array tracking loaded commands
              command.file = file;
              loaded.push({"name": command.name, "file": file});
              if(file.endsWith(".debug.js")){
                command.debug = true;
              }
              command.init();
              this.bot.commands.push(command);
            }
            // check if argument matches any command aliases
            command.aliases.forEach(alias => {
              if(alias.toLowerCase() == arg.toLowerCase()){
                // initialize command, load, and add to array tracking loaded commands
                command.file = file;
                loaded.push({"name": command.name, "file": file});
                if(file.endsWith(".debug.js")){
                  command.debug = true;
                }
                command.init();
                this.bot.commands.push(command);
              }
            });
          });
        });

        // no command were loaded, tell the user
        if(loaded.length === 0){
          var ebd = this.bot.embed("No commands loaded", "red", "No commands were found with your search terms.");
          newMsg.edit({embed: ebd});
          return;
        }

        // concatenate information about laoded commands
        var out = "";
        loaded.forEach(obj => {
          out += (out.length == 0 ? "" : ", ") + obj.name + " (" + obj.file + ")";
        });

        // allow for callback method, to be accessed by reload command
        if(callback != undefined){
          callback(out, newMsg);
        }else{
          // no callback is used, load command being accessed directly - post information
          var ebd = this.bot.embed("Successfully loaded commands", "green", out);
          newMsg.edit({embed: ebd});
        }
      });
    }else return;
  }
}
module.exports = LoadCommand;