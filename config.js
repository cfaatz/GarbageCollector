var fs = require('fs');
class Config{
	constructor(){
		let files = fs.readdirSync('./config', {encoding: 'utf-8'});
		files.forEach((file) => {
			if(file.indexOf("default.") == -1){
				let data = fs.readFileSync('./config/' + file, {encoding: 'utf-8'});
    			var obj = JSON.parse(data);
				this[file.split(".")[0]] = obj;
			}
		});
	}
}
module.exports = Config;