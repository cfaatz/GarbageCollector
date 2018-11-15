"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Dice command - GarbageCollector
 * Author: Tudedude
 **
 * Rolls the specified number of
 * dice with the specified number
 * of sides (using PRNG).
 */
class DiceCommand extends CommandBase{
  constructor(){
    super();
    this.name = "dice";
    this.aliases = ["roll", "r", "diceroll", "dr"];
    this.permission = "default";
  }
  execute(msg, args){
    // error embed for incorrect command usage
    var errorEbd = this.bot.embed("Error", "red", "Usage: " + this.bot.config.core.cmdPrefix + "dice {dice}");
    errorEbd.fields = [{
      name: "Dice Format",
      value: "XdY - roll X Y-sided dice (e.g. 1d6)"
    },
    {
      name: "Multiple Dice",
      value: "To roll multiple dice, simply separate them with spaces."
    }];
    // error embed for too many dice
    var limitEbd = this.bot.embed("Error", "red", "Rolls exceeded the character limit.");

    // if no arguments are provided, send error embed
    if(args.length == 0){
      msg.channel.send({embed: errorEbd});
    }else{

      // strore roll arrays and total count
      var rolls = [];
      var total = 0;
      for(var index in args){

        // use regex to capture dice amount and size
        var regexp = /^([0-9]*)d([0-9]+)$/gi;
        var arg = args[index];
        var matches = regexp.exec(arg);
        if(matches == null || matches.length != 3){
          // no matches found or invalid form
          msg.channel.send({embed: errorEbd});
          return;
        }else{
          // roll all dice, add results to total, and group
          // die results in array, indexed by die size
          for(var i = 0; i < parseInt(matches[1]); i++){
            var roll = Math.floor((Math.random() * parseInt(matches[2])) + 1);
            if(rolls[matches[2]] == undefined)
              rolls[matches[2]] = [roll];
            else
              rolls[matches[2]].push(roll);
            total += roll;
          }
        }
      }
      // aggregate results into fields, create embed, and send
      var fields = [];
      for(var prop in rolls){
        if(rolls.hasOwnProperty(prop)){
          if(rolls[prop].join(", ").length >= 1024){
            // this field is too long, send error embed
            msg.channel.send({embed: limitEbd});
            return;
          }
          fields.push({
            name: "d" + prop + " rolls",
            value: rolls[prop].join(", ")
          });
        }
      }
      fields.push({
        name: "Total",
        value: total
      });
      var ebd = this.bot.embed("Rolls", "green", undefined, fields);
      msg.channel.send({embed: ebd});
    }
  }
}
module.exports = DiceCommand;