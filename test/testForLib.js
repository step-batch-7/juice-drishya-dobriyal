const assert = require("assert");
const lib = require("../src/lib.js");
const writeTransaction = lib.writeTransaction;
const readTransaction = lib.readTransaction;
const organizeInput = lib.organizeInput;
const employeeFinder = lib.employeeFinder;

describe("filterEmployee", function() {
	it("it return true if the record send has empId as given", function() {
		const actualValue = employeeFinder(
			"--empId",
			"111"
		)({
			empId: "111",
			beverage: "orange",
			quantity: "1",
			date: "2019-11-24T03:27:09.382Z"
		});
		assert.strictEqual(actualValue, true);
	});
	it("should return false if record send doesn't have the empId", function() {
		const actualValue = employeeFinder(
			"--empId",
			"2"
		)({
			empId: "11",
			beverage: "orange",
			quantity: "1",
			date: "2019-11-24T03:27:09.382Z"
		});
		assert.strictEqual(actualValue, false);
	});
});

describe("organizeInput", function() {
	it("should return data in form of objects", function() {
		const actualValue = organizeInput(
			["--save", "beverage", "orange", "empId", "1", "quantity", "1"],
			"25-11-2019"
		);
		const expectedValue = {
			empId: "1",
			beverage: "orange",
			quantity: "1",
			date: "25-11-2019"
		};
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});

describe("readTransaction", function() {
	it("should check path given to isExist is correct,if path doesn't exist return empty object", function() {
		const doesfileExist = function(filePath) {
			assert.strictEqual(filePath, "correctPath");
			return false;
		};
		const reader = function() {
			return "file";
		};
		const writer = function() {
			return;
		};
		const config = {
			filePath: "correctPath",
			encoder: "utf8",
			reader: reader,
			doesfileExist: doesfileExist,
			writer: writer
		};
		assert.deepStrictEqual(readTransaction(config), []);
	});
	it("when path exist,it should return content of file  ", function() {
		const doesfileExist = function(path) {
			return true;
		};
		const reader = function(path, encoder) {
			assert.strictEqual(path, "correctPath");
			assert.strictEqual(encoder, "utf8");
			return '{ "checked": "reader" }';
		};
		const writer = function() {
			return;
		};
		const config = {
			filePath: "correctPath",
			encoder: "utf8",
			reader: reader,
			doesfileExist: doesfileExist,
			writer: writer
		};
		assert.deepStrictEqual(readTransaction(config), {
			checked: "reader"
		});
	});
});

describe("writeTransaction", function() {
	it("should check for the correct path, encoder and should return content of the file", function() {
		const writer = function(path, content, encoder) {
			assert.strictEqual(path, "filePath");
			assert.strictEqual(content, "[]");
			assert.strictEqual(encoder, "utf8");
			return '{"a":1}';
		};
		const config = {
			filePath: "filePath",
			encoder: "utf8",
			writer
		};
		assert.strictEqual(writeTransaction([], config), '{"a":1}');
	});
});
