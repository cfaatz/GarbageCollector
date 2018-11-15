"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Meat command - GarbageCollector
 * Author: Tudedude
 **
 * Retrieves the exchange rate of
 * Mr. Assistance to Meat in
 * Kingdom of Loathing
 */
class MeatCommand extends CommandBase{
  constructor(){
    super();
    this.name = "meat2usd";
    this.aliases = ["meat", "m2u", "m2usd"];
    this.permission = "verified";
  }
  execute(msg, args){

    // pull information from Nathan Cosgray's Kingdom of Loathing exchange rate graph
    this.bot.request('https://www.nathanatos.com/kol-exchange-rate/', (error, response, body) => {
      if(response && response.statusCode == 200){

        // pull exchange information and image from retrieved data
        var regexp = /\$1 US = ([0-9,]+) Meat/g;
        var valRaw = regexp.exec(body)[1];
        var meat = parseInt(valRaw.replace(/,/g, "")) * 10;

        // add usd->meat exchange to embed field
        var fields = [{
          name: "USD to Meat",
          value: "$1 USD = " + meat + " Meat"
        }];

        // add mr accessory->meat exchange to description
        var desc = "1 Mr. Accessory = " + (meat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + " Meat";

        // craft embed with pulled information, add graph image, and send
        var ebd = this.bot.embed("Mr. Accessory to Meat Exchange Rate", "green", desc)
        ebd.image = {url: "https://www.nathanatos.com/kol/rate_history_1mo.png"};
        msg.channel.send({embed: ebd});
      }
    });
  }
}
module.exports = MeatCommand;