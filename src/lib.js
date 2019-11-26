const fs = require("fs");

const readTransaction = function(path, encoder, reader, doesfileExist) {
	if (!doesfileExist(path)) {
		return {};
	}
	return reader(path, encoder);
};

const stringedObjects = function(objects) {
	return JSON.stringify(objects);
};

const writeTransaction = function(
	filePath,
	updatedTransaction,
	encoder,
	writer
) {
	const stringedTRansaction = stringedObjects(updatedTransaction);
	return writer(filePath, stringedTRansaction, encoder);
};

const organizeInput = function(userArg, date) {
	const employeeId = userArg[2];
	const beverage = userArg[4];
	const quantity = userArg[6];
	const organizedInput = { employeeId, beverage, quantity, date };
	return organizedInput;
};

const makeFilterEmployee = function(employeeId) {
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
exports.makeFilterEmployee = makeFilterEmployee;
exports.convertToString = convertToString;
exports.stringedObjects = stringedObjects;
