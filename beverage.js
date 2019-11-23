const saveData = require("./src/saveData.js").saveData;

const main = function(userArg) {
	userArg = process.argv.slice(2);
	saveData(userArg);
	return;
};

main();
