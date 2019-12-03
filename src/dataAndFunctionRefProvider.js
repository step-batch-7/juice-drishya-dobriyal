const writeTransaction = require("./lib.js").writeTransaction;
const readTransaction = require("./lib.js").readTransaction;
const findOperation = require("./operation.js").findOperation;
const employeeFinder = require("./lib.js").employeeFinder;
const organizeInput = require("./lib.js").organizeInput;

const pathFinder = function(env) {
	if (env.dummyPath === undefined) {
		return "./juiceTransactionDetails.json";
	}
	return env.dummyPath;
};

const timeFinder = function(env) {
	dummyDate = env.dummyTime || new Date();
	return new Date(dummyDate);
};

const config = function() {
	const fs = require("fs");
	const time = timeFinder(process.env);
	const filePath = pathFinder(process.env);
	const encoder = "utf8";
	const reader = fs.readFileSync;
	const doesfileExist = fs.existsSync;
	const writer = fs.writeFileSync;
	const readTransactionsRef = readTransaction;
	const findOperationsRef = findOperation;
	const writeTransactionsRef = writeTransaction;
	const employeeFinderRef = employeeFinder;
	const organizeInputRef = organizeInput;
	return {
		filePath,
		time,
		encoder,
		reader,
		doesfileExist,
		writer,
		readTransactionsRef,
		writeTransactionsRef,
		findOperationsRef,
		employeeFinderRef,
		organizeInputRef
	};
};
exports.config = config;
