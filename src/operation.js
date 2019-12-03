const lib = require("./lib.js");
const employeeFinder = lib.employeeFinder;
const objectValuesToStrings = lib.objectValuesToStrings;

const saveData = function(allTransaction, userArg, config) {
	const newTransaction = config.organizeInputRef(userArg, config.time);
	allTransaction.push(newTransaction);
	config.writeTransactionsRef(allTransaction, config);
	const stringedOutput = `Employee ID, Beverage, Quantity, Date \n${objectValuesToStrings(
		newTransaction
	)}`;
	return stringedOutput;
};

const sum = function(Totalsum, record) {
	return +record.quantity + Totalsum;
};

const queryString = function(string, objects) {
	value = `${objects.empId},${objects.beverage},${objects.quantity},${objects.date}`;
	string = string + "\n" + value;
	return string;
};

const query = function(allTransaction, userArgs) {
	let recordOfEmployee = allTransaction;
	for (let i = 1; i < userArgs.length; i += 2) {
		const employeeTransactions = employeeFinder(userArgs[i], userArgs[i + 1]);
		recordOfEmployee = recordOfEmployee.filter(employeeTransactions);
	}
	const TotalJuices = recordOfEmployee.reduce(sum, 0);
	const header = "Employee ID, Beverage, Quantity, Date ";
	const stringedOutput = `${header}${recordOfEmployee.reduce(
		queryString,
		""
	)}\nTotal: ${TotalJuices} Juices`;
	return stringedOutput;
};

const findOperation = function(operation) {
	const listOfOperation = { "--save": saveData, "--query": query };
	if (!listOfOperation.hasOwnProperty(operation)) {
		listOfOperation[operation] = () => "wrong Input";
	}
	return listOfOperation[operation];
};

const performOperation = function(userArgs, config) {
	const allTransaction = config.readTransactionsRef(config);
	const operation = config.findOperationsRef(userArgs[0]);
	const resultedOperation = operation(allTransaction, userArgs, config);
	return resultedOperation;
};

exports.performOperation = performOperation;
exports.saveData = saveData;
exports.query = query;
exports.findOperation = findOperation;
