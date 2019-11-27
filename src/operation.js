const lib = require("./lib.js");
const writeTransaction = lib.writeTransaction;
const readTransaction = lib.readTransaction;
const organizeInput = lib.organizeInput;
const employeeFinder = lib.employeeFinder;
const convertToString = lib.convertToString;

const saveData = function(
	allTransaction,
	userArg,
	time,
	filePath,
	encoder,
	writer
) {
	const newTransaction = organizeInput(userArg, time);
	allTransaction.push(newTransaction);
	writeTransaction(filePath, allTransaction, encoder, writer);
	return [newTransaction];
};

const query = function(previousTransaction, userArg) {
	const employeeTransactions = employeeFinder(userArg[2]);
	const recordOfEmployee = previousTransaction.filter(employeeTransactions);
	return recordOfEmployee;
};

findOperation = function(operation) {
	const listOfOperation = { "--save": saveData, "--query": query };
	return listOfOperation[operation];
};

const performOperation = function(
	userArgs,
	path,
	encoder,
	reader,
	doesfileExist,
	writer
) {
	const time = new Date();
	const allTransaction = readTransaction(path, encoder, reader, doesfileExist);
	const operation = findOperation(userArgs[0]);
	const resultedOperation = operation(
		allTransaction,
		userArgs,
		time,
		path,
		encoder,
		writer
	);
	console.log(resultedOperation);
	const message = convertToString(resultedOperation);
	return message;
};

exports.performOperation = performOperation;
exports.saveData = saveData;
exports.query = query;
exports.findOperation = findOperation;
