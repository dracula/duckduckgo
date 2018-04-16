var fs = require("fs");

var settings = {
	config: "config.js",
	readme: "README.md",
	readmeLine: {
		bookmarklet: 9,
		script: 16,
	}
}

// ----------------------------------------------------------------

var readme = fs.readFileSync(__dirname+"/"+settings.readme, "utf8").split("\n");
config = require(__dirname+"/"+settings.config);

// Make bookmarklet
var bookmarklet = "https://duckduckgo.com/?"
for (var i=0; i<Object.keys(config).length; i++) {
	let key = Object.keys(config)[i];
	let value = config[key];
	bookmarklet += "k"+key+"="+value+"&";
}
bookmarklet = bookmarklet.substring(0, bookmarklet.length-1);

readme[settings.readmeLine.bookmarklet-1] = "Try it by visiting this link: [DuckDuckGo - Dracula Theme]("+bookmarklet+")";
console.log(settings.readme+" (line "+
	settings.readmeLine.bookmarklet+"): "+bookmarklet)

// Make javascipt: script
cookies = [];
for (var i = 0; i < Object.keys(config).length; i++) {
	let key = Object.keys(config)[i];
	let value = config[key];
	cookies[i] = key+"="+value;
}
script = "var dracula="+
	JSON.stringify(cookies)+";"+
	"for(var i=0;i<dracula.length;i++)document.cookie=dracula[i];"+
	"alert('Appearance settings have successfully been updated!');"+
	"location.reload();"

readme[settings.readmeLine.script-1] = script
console.log(settings.readme+" (line "+
	settings.readmeLine.script+"): "+script)

// Write file
fs.writeFileSync(__dirname+"/"+settings.readme, readme.join("\n"));
