const writeTransaction = require("./lib.js").writeTransaction;
const readTransaction = require("./lib.js").readTransaction;
const findOperation = require("./operation.js").findOperation;
const employeeFinder = require("./lib.js").employeeFinder;
const organizeInput = require("./lib.js").organizeInput;

const dataProvided = function() {
	const fs = require("fs");
	const filePath = "./juiceTransactionDetails.json";
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
exports.dataProvided = dataProvided;
