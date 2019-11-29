const lib = require("./lib.js");
const employeeFinder = lib.employeeFinder;
const objectValuesToStrings = lib.objectValuesToStrings;

const saveData = function(allTransaction, userArg, time, dataProvided) {
	const newTransaction = dataProvided.organizeInputRef(userArg, time);
	allTransaction.push(newTransaction);
	dataProvided.writeTransactionsRef(allTransaction, dataProvided);
	const stringedOutput = `employeeId, beverage, quantity, date \n${objectValuesToStrings(
		newTransaction
	)}`;
	return stringedOutput;
};

const sum = function(totalsum, record) {
	return +record.quantity + totalsum;
};

const queryString = function(string, objects) {
	value = `${objects.employeeId},${objects.beverage},${objects.quantity},${objects.date}`;
	string = string + "\n" + value;
	return string;
};

const query = function(allTransaction, userArgs) {
	let recordOfEmployee = allTransaction;
	for (let i = 1; i < userArgs.length; i += 2) {
		const employeeTransactions = employeeFinder(userArgs[i], userArgs[i + 1]);
		recordOfEmployee = recordOfEmployee.filter(employeeTransactions);
	}
	const totalJuices = recordOfEmployee.reduce(sum, 0);
	const header = "employeeId, beverage, quantity, date ";
	const stringedOutput = `${header}${recordOfEmployee.reduce(
		queryString,
		""
	)}\ntotalJuices :${totalJuices}`;
	return stringedOutput;
};

const findOperation = function(operation) {
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
	return resultedOperation;
};

exports.performOperation = performOperation;
exports.saveData = saveData;
exports.query = query;
exports.findOperation = findOperation;
