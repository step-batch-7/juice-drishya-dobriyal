const assert = require("assert");
const saveData = require("../src/saveData.js").saveData;
const transactionTime = require("../src/saveData.js").transactionTime;
const fs = require("fs");

describe("saveTheData", function() {
	it("should create a new file for saving the juice data when the app is started for first time and save the data", function() {
		expectedValue = {
			employeeId: "1",
			beverage: "orange",
			quantity: "2",
			date: transactionTime
		};
		assert.deepStrictEqual(
			saveData(["employeeId", "1", "-beverage", "orange", "-quantity", "2"]),
			expectedValue
		);
	});
	it("should add new contents to file whenever new user input is added ", function() {
		expectedValue = {
			employeeId: "2",
			beverage: "watermelon",
			quantity: "2",
			date: transactionTime
		};
		assert.deepStrictEqual(
			saveData(["employeeId", "2", "beverage", "watermelon", "quantity", "2"]),
			expectedValue
		);
	});
});
