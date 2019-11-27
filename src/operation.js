const lib = require("./lib.js");
const convertToString = lib.convertToString;
const employeeFinder = lib.employeeFinder;

const saveData = function(allTransaction, userArg, time, dataProvided) {
	const newTransaction = dataProvided.organizeInputRef(userArg, time);
	allTransaction.push(newTransaction);
	dataProvided.writeTransactionsRef(allTransaction, dataProvided);
	return [newTransaction];
};

const query = function(allTransaction, userArgs) {
	const employeeTransactions = employeeFinder(userArgs[2]);
	const recordOfEmployee = allTransaction.filter(employeeTransactions);
	return recordOfEmployee;
};

findOperation = function(operation) {
	const listOfOperation = { "--save": saveData, "--query": query };
	return listOfOperation[operation];
};

const performOperation = function(userArgs, dataProvided, time) {
	const allTransaction = dataProvided.readTransactionsRef(dataProvided);
	const operation = dataProvided.findOperationsRef(userArgs[0]);
	const resultedOperation = operation(
		allTransaction,
		userArgs,
		time,
		dataProvided
	);
	const message = convertToString(resultedOperation);
	return message;
};

exports.performOperation = performOperation;
exports.saveData = saveData;
exports.query = query;
exports.findOperation = findOperation;
