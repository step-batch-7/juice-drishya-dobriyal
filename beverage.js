const performOperation = require("./src/operation.js").performOperation;
const dataProvided = require("./src/dataAndFunctionRefProvider.js")
	.dataProvided;

const main = function(userArg) {
	const userArgs = process.argv.slice(2);
	time = new Date();
	const displayedOutput = performOperation(userArgs, dataProvided(), time);
	console.log(displayedOutput);
};

main();
