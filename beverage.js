const performOperation = require("./src/operation.js").performOperation;
const dataProvided = require("./src/dataAndFunctionRefProvider.js")
	.dataProvided;

const main = function(userArg) {
	const userArgs = process.argv.slice(2);
	const displayedOutput = performOperation(userArgs, dataProvided());
	console.log(displayedOutput);
};

main();
