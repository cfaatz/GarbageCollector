/**
 * Botty McBotface Command Module Base
 **
 * The base class that all command
 * modules should extend.
 */
class CommandBase{
  constructor(){
    this.bot = require("../bot.js");
  };
  execute(msg, args){};
  init(){};
  onMessage(msg){};
  deinit(){
    return new Promise(function(resolve, reject){
      resolve(true);
    });
  };
}
module.exports = CommandBase;