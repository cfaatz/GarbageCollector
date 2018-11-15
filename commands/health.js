"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Health command - GarbageCollector
 * Author: Tudedude
 **
 * Prints statistics on the health
 * of the bot, such as memory and
 * CPU utilization.
 */
class HealthCommand extends CommandBase{
  constructor(){
    super();
    this.name = "health";
    this.aliases = ["status", "bothealth", "botstatus", "h", "stat", "stats"];
    this.permission = "admin";
    this.os = require("os");
    this.update = "0%";
    this.last = [0, 0];

    // update last cpu information every 10 seconds to take good average load
    setInterval(() => {
      var info = this.getInfo();
      this.last[0] = info.idle;
      this.last[1] = info.total;
    }, 10000);
  }

  execute(msg, args){

    // get total process memory usage, free memory, and total memory available
    var processmem = process.memoryUsage().heapUsed / (1024*1024);
    var freemem = this.os.freemem() / (1024*1024);
    var totalmem = this.os.totalmem() / (1024*1024);

    // retrieve cpu information and take percentage utilization
    var info = this.getInfo();
    var cpu = 1 - ((info.idle - this.last[0]) / (info.total - this.last[1]));

    // get bot API latency
    var ping = this.bot.ping;

    // craft embed with formatted output and send
    var ebd = this.bot.embed("Bot Health Statistics", "green", "Running for " + process.uptime().toFixed(2) + " seconds.");
    ebd.fields = [{
      name: "Average API Latency",
      value: Math.round(ping) + " ms"
    },{
      name: "Process Memory",
      value: Math.round(processmem) + " MB"
    },{
      name: "System Memory",
      value: Math.round(totalmem - freemem) + " MB/" + Math.round(totalmem) + " MB"
    },{
      name: "System CPU Utilization",
      value: (cpu*100).toFixed(2) + "%"
    }];
    msg.channel.send({embed: ebd});
  }

  /**
   * Use os package to retrieve relevant CPU status info
   */
  getInfo(){
    /**
     * Procedure adapted from
     * Oscar Mejia's os-utils package
     * <https://github.com/oscmejia/os-utils>
     */
    var cpus = this.os.cpus();
    var user = 0;
    var nice = 0;
    var sys = 0;
    var irq = 0;
    var idle = 0;
    for(var cpu in cpus){
      if (!cpus.hasOwnProperty(cpu)) continue;  
      user += cpus[cpu].times.user;
      nice += cpus[cpu].times.nice;
      sys += cpus[cpu].times.sys;
      irq += cpus[cpu].times.irq;
      idle += cpus[cpu].times.idle;
    }

    var total = user + nice + sys + idle + irq;
    return {"idle": idle, "total": total};
  }
}
module.exports = HealthCommand;