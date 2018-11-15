"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Load command - GarbageCollector
 * Author: Tudedude
 **
 * Loads a command module
 */
class ReloadCommand extends CommandBase{
  constructor(){
    super();
    this.name = "reload";
    this.aliases = ["r"];
    this.permission = "admin";
  }
  execute(msg, args){
    // search for load and unload commands in bot command array
    var unload = undefined;
    var load = undefined;
    this.bot.commands.forEach((command) => {
      if(command.name == "unload"){
        unload = command;
      }else if(command.name == "load"){
        load = command;
      }
    });

    // leverage unload execute function with provided message and args, specify callback
    unload.execute(msg, args, (unloaded, ebdMsg) => {
      // leverage load execute function with provided message and args, specify callback
      load.execute(msg, args, (loaded, _ebdMsg) => {
        // unload and load finished executing, output information to embed and update
        let ebd = this.bot.embed("Successfully reloaded commands", "green");
        ebd.fields = [{
          name: "Unloaded",
          value: unloaded
        }, {
          name: "Loaded",
          value: loaded
        }];
        _ebdMsg.edit({embed: ebd});
      }, ebdMsg);
    });
  }
}
module.exports = ReloadCommand;