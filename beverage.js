const performOperation = require("./src/operation.js").performOperation;

const main = function(userArg) {
	const filePath = "./juiceTransactionDetails.json";
	const userArgs = process.argv.slice(2);
	const displayedOutput = performOperation(userArgs, filePath);
	console.log(displayedOutput);
};

main();
