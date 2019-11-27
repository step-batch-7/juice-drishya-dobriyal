const performOperation = require("./src/operation.js").performOperation;
const fs = require("fs");

const main = function(userArg) {
	const filePath = "./juiceTransactionDetails.json";
	const userArgs = process.argv.slice(2);
	const encoder = "utf8";
	const reader = fs.readFileSync;
	const doesfileExist = fs.existsSync;
	const writer = fs.writeFileSync;
	const displayedOutput = performOperation(
		userArgs,
		filePath,
		encoder,
		reader,
		doesfileExist,
		writer
	);
	console.log(displayedOutput);
};

main();
