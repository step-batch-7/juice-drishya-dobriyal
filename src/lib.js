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
	const employeeId = userArg[2];
	const beverage = userArg[4];
	const quantity = userArg[6];
	const organizedInput = { employeeId, beverage, quantity, date };
	return organizedInput;
};

const employeeFinder = function(employeeId) {
	return function(record) {
		return record["employeeId"] === employeeId;
	};
};

const objectValuesToStrings = function(objects) {
	return Object.values(objects).join(",");
};

const convertToString = function(arrayOfObjects) {
	const dataInString = arrayOfObjects.map(objectValuesToStrings).join("\n");
	const stringedOutput =
		"employeeId, beverage, quantity, date \n" + dataInString;
	return stringedOutput;
};

exports.writeTransaction = writeTransaction;
exports.readTransaction = readTransaction;
exports.organizeInput = organizeInput;
exports.employeeFinder = employeeFinder;
exports.convertToString = convertToString;
exports.stringedObjects = stringedObjects;
