const assert = require("assert");
const operation = require("../src/operation.js");
const performOperation = operation.performOperation;
const saveData = operation.saveData;
const query = operation.query;

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
		expectedValue =
			"employeeId, beverage, quantity, date \n11,orange,1,2019-11-24T03:27:09.382Z\ntotalJuices :1";
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
		expectedValue = "employeeId, beverage, quantity, date \ntotalJuices :0";
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});

describe("saveTransaction", function() {
	it("should save the new data ", function() {
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
			assert.deepStrictEqual(content, "[]");
			assert.strictEqual(encoder, "utf8");
			return;
		};
		const writeTransaction = function(updatedTransaction, dataProvided) {
			assert.deepStrictEqual(dataProvided, {
				encoder: "utf8",
				filePath: "filePath",
				writeTransactionsRef: writeTransaction,
				organizeInputRef: organizeInput
			});
			assert.deepStrictEqual(updatedTransaction, [
				{
					employeeId: "1",
					beverage: "orange",
					quantity: "1",
					date: time
				}
			]);
			return writer(dataProvided.filePath, "[]", dataProvided.encoder);
		};
		const organizeInput = function(userArg, time) {
			assert.deepStrictEqual(userArg, [
				"--save",
				"employeeId",
				"1",
				"beverage",
				"orange",
				"quantity",
				"1"
			]);
			return { employeeId: "1", beverage: "orange", quantity: "1", date: time };
		};

		const dataProvided = {
			encoder: "utf8",
			filePath: "filePath",
			writeTransactionsRef: writeTransaction,
			organizeInputRef: organizeInput
		};

		const actualValue = saveData([], userArg, time, dataProvided);
		const expectedValue = `employeeId, beverage, quantity, date \n1,orange,1,${time.toJSON()}`;
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});

describe("performOperation", function() {
	it("should  save the data of given employee", function() {
		const time = new Date();
		const saveData = function(allTransaction, userArg, userTime, dataProvided) {
			assert.deepStrictEqual(allTransaction, []);
			assert.deepStrictEqual(userArg, [
				"--save",
				"employeeID",
				"11",
				"beverage",
				"orange",
				"quantity",
				"1"
			]);
			assert.deepStrictEqual(userTime, time);
			assert.deepStrictEqual(dataProvided, {
				readTransactionsRef: readTransactions,
				findOperationsRef: findOperation
			});
			return "";
		};
		const findOperation = function(operationName) {
			assert.strictEqual(operationName, "--save");
			return saveData;
		};
		const readTransactions = function(dataProvided) {
			return [];
		};

		const dataProvided = {
			readTransactionsRef: readTransactions,
			findOperationsRef: findOperation
		};
		const userArg = [
			"--save",
			"employeeID",
			"11",
			"beverage",
			"orange",
			"quantity",
			"1"
		];
		const actualValue = performOperation(userArg, dataProvided, time);
		const expectedValue = "";
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});

describe("FindOperation", function() {
	it("should return the save operation reference address", function() {
		assert.strictEqual(findOperation("--save"), saveData);
	});
	it("should return the query operation reference address", function() {
		assert.strictEqual(findOperation("--query"), query);
	});
});
