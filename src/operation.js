const lib = require("./lib.js");
const writeTransaction = lib.writeTransaction;
const readTransaction = lib.readTransaction;
const organizeInput = lib.organizeInput;
const makeFilterEmployee = lib.makeFilterEmployee;
const convertToString = lib.convertToString;

const saveData = function(previousTransaction, userArg, time) {
	const newTransaction = organizeInput(userArg, time);
	previousTransaction.push(newTransaction);
	writeTransaction(filePath,
	previousTransaction,
	encoder,
	writer
));
	return newTransaction;
};

const query = function(previousTransaction, userArg) {
	const findemployeeTransaction = makeFilterEmployee(userArg[2]);
	const recordOfEmployee = previousTransaction.filter(findemployeeTransaction);
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
	doesfileExist
) {
	if (true) {
		const time = new Date();
		const previousRecords = readTransaction(
			path,
			encoder,
			reader,
			doesfileExist
		);
		const operation = findOperation(userArgs[0]);
		const resultedOperation = operation(previousRecords, userArgs, time);
		const message = convertToString(resultedOperation);
		return message;
	}
};

exports.performOperation = performOperation;
