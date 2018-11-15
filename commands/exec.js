"use strict";
var CommandBase = require("./commandBase.js");
/**
 * Unload command - Botty McBotFace
 * Author: Tudedude
 **
 * Unloads a command module
 */
class ExecCommand extends CommandBase{
  constructor(){
    super();
    this.name = "exec";
    this.aliases = ["execute", "run"];
    this.permission = "verified";
    this.Sandbox = require("sandbox");
  }
  execute(msg, args){
    // un-cache code header and minified code header, to keep the freshest copy available
    delete require.cache[require.resolve(this.bot.root + "/codeHeader.js")];
    delete require.cache[require.resolve(this.bot.root + "/codeHeaderMin.js")];

    // use crypto to take md5 hash of code header
    var crypto = require('crypto');

    // initialize JS sandbox from npm sandbox module
    let s = new this.Sandbox();

    // regex search for code blocks contained within message
    // replace newline entitites with temporary artifact \\n for processing
    var search = msg.content.replace(/\n/g, "\\n");
    var regExp = "";

    // handle error cases found in tests through improper code block spacing
    if(search.substring(search.indexOf("```")+3).indexOf("\\n") == -1){
      regExp = /```(.+)```/;
    }else{
      regExp = /```(?:[a-zA-Z0-9]*)(.+)```/;
    }
    var res = regExp.exec(search);

    // no code is found, return error
    if(res == null){
      var ebd = this.bot.embed("Execution Unsuccessful", "red", "No code was found. " +
        "Did you enclose it in a code block? (Use 3 backticks [`] to begin and end a code block)");
      msg.channel.send({embed: ebd});
    }else{
      // re-add newlines
      var code = res[1].replace(/\\n/g, "\n");


      var codeHeader = "";
      var codeHash = "";

      // open code header and take md5 hash of it to verify version
      let stream = this.bot.fs.createReadStream(this.bot.root + "/codeHeader.js");
      let hash = crypto.createHash('md5');
      let prom = new Promise((resolve, reject) => {
        hash.setEncoding('hex');
        stream.on('end', () => {
          hash.end();
          codeHash = hash.read();
          resolve(true);
        });
        stream.pipe(hash);
      });
      prom.then(() => {
        // after md5 hash is taken, check if file needs to be minified
        let uglify = require('uglify-js');
        let header = this.bot.fs.readFileSync(this.bot.root + "/codeHeader.js", {encoding: 'utf-8'});
        // if min file doesn't exist, minify
        if(!this.bot.fs.existsSync(this.bot.root + "/codeHeaderMin.js")){
          // create min file with uglified code and header specifying the hash used
          let min = "/*FHash{" + codeHash + "}*/" + uglify.minify(header, {mangle: {toplevel: true}}).code;
          codeHeader += min;
          this.bot.fs.writeFileSync(this.bot.root + "/codeHeaderMin.js", min);
        }else{
          // check if hash in the current file is the same as the hash of the version used to minify
          let hashReg = /\/\*FHash{(.+)}\*\//;
          let data = this.bot.fs.readFileSync(this.bot.root + "/codeHeaderMin.js", {encoding: 'utf-8'});
          let currHash = hashReg.exec(data)[1];
          // hashes do not match, minify and save to min file
          if(currHash != codeHash){
            let min = "/*FHash{" + codeHash + "}*/" + uglify.minify(header).code;
            codeHeader += min;
            this.bot.fs.writeFileSync(this.bot.root + "/codeHeaderMin.js", min);
          }else{
            // hashes match, use current header
            codeHeader += data;
          }
        }
        // execute code in sandbox using the code header
        s.run(codeHeader + "\n" + code, (output) => {

          // take results of sandbox and format nicely for embed
          var consoleOutput = "";
          for(var i = 0; i < output.console.length; i++){
            consoleOutput += output.console[i]
          }

          var result = output.result;
          if(result == undefined || result == "null"){
            result = "Empty"
          }

          if(consoleOutput == ""){
            consoleOutput = "Empty"
          }

          // create embed
          var ebd = this.bot.embed("Code Execution", "green");

          // add embed fields with formatted output and handle excessive length errors
          ebd.fields = [
            {
              name: "Executed By",
              value: msg.author.username
            },
            {
              name: "Result",
              value: (result.length < 1024 ? result : "Result too long (Must be less than 1024 characters)")
            },
            {
              name: "Console Output",
              value: (consoleOutput.length < 1024 ? consoleOutput : "Console output too long (Must be less than 1024 characters)")
            }
          ];

          // send final embed
          msg.channel.send({embed: ebd});
        });
      });
    }
  }
}
module.exports = ExecCommand;