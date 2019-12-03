const performOperation = require("./src/operation.js").performOperation;
const config = require("./src/dataAndFunctionRefProvider.js").config;

const main = function(userArg) {
	const userArgs = process.argv.slice(2);
	const displayedOutput = performOperation(userArgs, config());
	console.log(displayedOutput);
};

main();
