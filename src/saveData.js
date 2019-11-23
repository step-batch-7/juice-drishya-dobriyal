const fs = require("fs");

const tellTime = function() {
	const time = new Date();
	return time;
};

const organizeInput = function(userArg) {
	employeeId = userArg[1];
	beverage = userArg[3];
	quantity = userArg[5];
	date = transactionTime;
	organizedInput = { employeeId, beverage, quantity, date };
	return organizedInput;
};

const transactionTime = tellTime;

const saveData = function(userArg) {
	if (!fs.existsSync("./juiceTakenDetails.json")) {
		fs.writeFileSync("juiceTakenDetails.json", "[]", "utf8");
	}
	newTransaction = organizeInput(userArg);
	previousTransactions = JSON.parse(
		fs.readFileSync("./juiceTakenDetails.json")
	);
	previousTransactions.push(newTransaction);
	newLIst = JSON.stringify(previousTransactions);
	fs.writeFileSync("juiceTakenDetails.json", newLIst, "utf8");
	return newTransaction;
};

exports.saveData = saveData;
exports.transactionTime = transactionTime;
