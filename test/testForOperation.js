const assert = require("assert");
const operation = require("../src/operation.js");
const performOperation = operation.performOperation;
const saveData = operation.saveData;
const query = operation.query;
const findOperation = operation.findOperation;

describe("query", function() {
	it("should give the record of employeeId given ", function() {
		allTransaction = [
			{
				employeeId: "11",
				beverage: "orange",
				quantity: "1",
				date: "2019-11-24T03:27:09.382Z"
			},
			{
				employeeId: "1",
				beverage: "orange",
				quantity: "1",
				date: "2019-11-24T03:27:09.382Z"
			}
		];
		userArgs = ["--query", "employeeId", "11"];
		actualValue = query(allTransaction, userArgs);
		expectedValue = [
			{
				employeeId: "11",
				beverage: "orange",
				quantity: "1",
				date: "2019-11-24T03:27:09.382Z"
			}
		];
		assert.deepStrictEqual(actualValue, expectedValue);
	});
	it("should give the empty record if  employeeId given is not present", function() {
		allTransaction = [
			{
				employeeId: "1",
				beverage: "orange",
				quantity: "1",
				date: "2019-11-24T03:27:09.382Z"
			}
		];
		userArgs = ["emploeeId", "--query", "11"];
		actualValue = query(allTransaction, userArgs);
		expectedValue = [];
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});

describe("saveTransaction", function() {
	it("should save the new data ", function() {
		const allTransaction = [];
		const time = new Date();
		const userArg = [
			"--save",
			"employeeId",
			"1",
			"beverage",
			"orange",
			"quantity",
			"1"
		];
		const writer = function(path, content, encoder) {
			assert.strictEqual(path, "filePath");
			assert.deepStrictEqual(
				content,
				'[{"employeeId":"1","beverage":"orange","quantity":"1","date":"' +
					time.toJSON() +
					'"}]'
			);
			assert.strictEqual(encoder, "utf8");
			return "";
		};

		actualValue = saveData(
			allTransaction,
			userArg,
			time,
			"filePath",
			"utf8",
			writer
		);
		expectedValue = {
			employeeId: "1",
			beverage: "orange",
			quantity: "1",
			date: time
		};
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});

describe("performOperation", function() {
	it("should give the query of given employee", function() {
		actualValue = performOperation([
			"--query",
			"employeeId",
			path,
			encoder,
			reader,
			doesFileExist
		]);
		expectedValue = "";
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});
