"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Unload command - Botty McBotFace
 * Author: Tudedude
 **
 * Unloads a command module
 */
class UnloadCommand extends CommandBase{
  constructor(){
    super();
    this.name = "unload";
    this.aliases = ["ul", "disable", "unloadcommand", "uc"];
    this.permission = "admin";
  }
  async execute(msg, args, callback, ebdMsg){

    // keep track of unloaded information and promises for unloading commands
    var unloaded = [];
    var promised = [];

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

    // execute only if args are provided
    if(args.length > 0){
      // for each argument, iterate through commands and check for matches
      args.forEach(arg => {
        this.bot.commands.forEach((cmd, i) => {

          // if command name matches argument, unload command
          if(cmd.name.toLowerCase() == arg.toLowerCase()){

            // delete command module from cache (so load grabs the current version of the file)
            delete require.cache[require.resolve(this.bot.root + "/commands/" + cmd.file)];
            // add unloaded command info to array
            unloaded.push({"name": cmd.name, "file": cmd.file});

            // deinit command and use promise to remove command from bot list when unloaded
            var prom = cmd.deinit();
            prom.then(() => {
              this.bot.commands.splice(i, 1);
            });
            promised.push(prom);
          }
        });
      });
      // after all command unloads are done
      Promise.all(promised).then((responses) => {

        // if no commands were unloaded, tell user
        if(unloaded.length === 0){
          var ebd = this.bot.embed("No commands unloaded", "red", "No commands were found with your search terms.");
          newMsg.edit({embed: ebd});
          return;
        }
        // aggregate unloaded command information
        var out = "";
        unloaded.forEach(obj => {
          out += (out.length == 0 ? "" : ", ") + obj.name + " (" + obj.file + ")";
        });
        // if callback is defined (for use in reload command), pass info to callback
        if(callback != undefined){
          callback(out, newMsg);
        }else{
          // otherwise provide unloaded information to user
          var ebd = this.bot.embed("Successfully unloaded commands", "green", out + "");
          newMsg.edit({embed: ebd});
        }
      });
    }else return;
  }
}
module.exports = UnloadCommand;