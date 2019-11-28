const assert = require("assert");
const lib = require("../src/lib.js");
const writeTransaction = lib.writeTransaction;
const readTransaction = lib.readTransaction;
const organizeInput = lib.organizeInput;
const employeeFinder = lib.employeeFinder;
const stringedObjects = lib.stringedObjects;

describe("filterEmployee", function() {
	it("it return true if the record send has employeeID as given", function() {
		const actualValue = employeeFinder("111")({
			employeeId: "111",
			beverage: "orange",
			quantity: "1",
			date: "2019-11-24T03:27:09.382Z"
		});
		assert.strictEqual(actualValue, true);
	});
	it("should return false if record send doesn't have the employeeId", function() {
		const actualValue = employeeFinder("2")({
			employeeId: "11",
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
			["--save", "beverage", "orange", "employeeId", "1", "quantity", "1"],
			"25-11-2019"
		);
		const expectedValue = {
			employeeId: "1",
			beverage: "orange",
			quantity: "1",
			date: "25-11-2019"
		};
		assert.deepStrictEqual(actualValue, expectedValue);
	});
});

describe("stringedObjetcs", function() {
	it("should give an strings when an object is given", function() {
		const object = { a: 1 };
		const actualValue = stringedObjects(object);
		assert.strictEqual(actualValue, '{"a":1}');
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
		const dataProvided = {
			filePath: "correctPath",
			encoder: "utf8",
			reader: reader,
			doesfileExist: doesfileExist,
			writer: writer
		};
		assert.deepStrictEqual(readTransaction(dataProvided), []);
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
		const dataProvided = {
			filePath: "correctPath",
			encoder: "utf8",
			reader: reader,
			doesfileExist: doesfileExist,
			writer: writer
		};
		assert.deepStrictEqual(readTransaction(dataProvided), {
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
		const dataProvided = {
			filePath: "filePath",
			encoder: "utf8",
			writer
		};
		assert.strictEqual(writeTransaction([], dataProvided), '{"a":1}');
	});
});
