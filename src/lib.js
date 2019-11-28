const fs = require("fs");

const readTransaction = function(dataProvided) {
	const filePath = dataProvided["filePath"];
	const encodingMethoed = dataProvided["encoder"];
	const reader = dataProvided["reader"];
	const doesfileExist = dataProvided["doesfileExist"];
	if (!doesfileExist(filePath)) {
		return [];
	}
	return objectsTOString(reader(filePath, encodingMethoed));
};

const objectsTOString = function(string) {
	return JSON.parse(string);
};

const stringedObjects = function(objects) {
	return JSON.stringify(objects);
};

const writeTransaction = function(updatedTransaction, dataProvided) {
	const stringedTransaction = stringedObjects(updatedTransaction);
	return dataProvided.writer(
		dataProvided.filePath,
		stringedTransaction,
		dataProvided.encoder
	);
};

const organizeInput = function(userArg, date) {
	const employeeId = userArg[4];
	const beverage = userArg[2];
	const quantity = userArg[6];
	const organizedInput = { employeeId, beverage, quantity, date };
	return organizedInput;
};

const employeeFinder = function(key) {
	return function(record) {
		return record["employeeId"] === key;
	};
};

const objectValuesToStrings = function(objects) {
	const array = Object.values(objects);
	array[3] = array[3].toJSON();
	const string = array.join(",");
	return string;
};

exports.writeTransaction = writeTransaction;
exports.readTransaction = readTransaction;
exports.organizeInput = organizeInput;
exports.employeeFinder = employeeFinder;
exports.stringedObjects = stringedObjects;
exports.objectValuesToStrings = objectValuesToStrings;
