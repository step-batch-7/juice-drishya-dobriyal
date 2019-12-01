const readTransaction = function(dataProvided) {
	const filePath = dataProvided.filePath;
	const encodingMethoed = dataProvided.encoder;
	const reader = dataProvided.reader;
	const doesfileExist = dataProvided.doesfileExist;
	if (!doesfileExist(filePath)) {
		return [];
	}
	return JSON.parse(reader(filePath, encodingMethoed));
};

const writeTransaction = function(updatedTransaction, dataProvided) {
	const stringedTransaction = JSON.stringify(updatedTransaction);
	return dataProvided.writer(
		dataProvided.filePath,
		stringedTransaction,
		dataProvided.encoder
	);
};

const organizeInput = function(userArg, date) {
	const empId = userArg[4];
	const beverage = userArg[2];
	const quantity = userArg[6];
	const organizedInput = { empId, beverage, quantity, date };
	return organizedInput;
};

const employeeFinder = function(searchKey, searchFor) {
	return function(record) {
		search = record[searchKey.slice(2)];
		if (searchKey.slice(2) == "date") {
			search = record[searchKey.slice(2)].slice(0, 10);
		}
		return search === searchFor;
	};
};

const objectValuesToStrings = function(objects) {
	string = `${objects.empId},${objects.beverage},${
		objects.quantity
	},${objects.date.toJSON()}`;
	return string;
};

exports.writeTransaction = writeTransaction;
exports.readTransaction = readTransaction;
exports.organizeInput = organizeInput;
exports.employeeFinder = employeeFinder;
exports.objectValuesToStrings = objectValuesToStrings;
