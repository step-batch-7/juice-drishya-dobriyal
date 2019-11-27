const assert = require("assert");
const lib = require("../src/lib.js");
const writeTransaction = lib.writeTransaction;
const readTransaction = lib.readTransaction;
const organizeInput = lib.organizeInput;
const employeeFinder = lib.employeeFinder;
const convertToString = lib.convertToString;
const stringedObjects = lib.stringedObjects;

describe("convertToString", function() {
	it("it will give only titles if an empty array is send to it ", function() {
		assert.strictEqual(
			convertToString([]),
			"employeeId, beverage, quantity, date \n"
		);
	});

	it("it will convert array of objects to string with title", function() {
		const arrayOfObjects = [
			{
				employeeId: "11",
				beverage: "orange",
				quantity: "1",
				date: "2019-11-24T03:27:09.382Z"
			}
		];
		const expectedValue =
			"employeeId, beverage, quantity, date \n" +
			"11,orange,1,2019-11-24T03:27:09.382Z";
		assert.strictEqual(convertToString(arrayOfObjects), expectedValue);
	});
});

describe("filterEmployee", function() {
	it("it return true if the record send has employeeID as given", function() {
		const actualValue = employeeFinder("11")({
			employeeId: "11",
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
			["--save", "employeeId", "1", "beverage", "orange", "quantity", "1"],
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
		const doesfileExist = function(path) {
			assert.strictEqual(path, "correctPath");
			return false;
		};
		const reader = function() {
			return "file";
		};
		assert.deepStrictEqual(
			readTransaction("correctPath", "utf8", reader, doesfileExist),
			[]
		);
	});
	it("when path exist,it should return content of file ", function() {
		const doesfileExist = function(path) {
			return true;
		};
		const reader = function(path, encoder) {
			assert.strictEqual(path, "correctPath");
			assert.strictEqual(encoder, "utf8");
			return "ckecked the reader";
		};
		assert.deepStrictEqual(
			readTransaction("correctPath", "utf8", reader, doesfileExist),
			"ckecked the reader"
		);
	});
});

describe("writeTransaction", function() {
	it("should check for the correct path, encoder and should return content of the file", function() {
		const writer = function(path, content, encoder) {
			assert.strictEqual(path, "correctPath");
			assert.strictEqual(content, '{"a":1}');
			assert.strictEqual(encoder, "utf8");
			return '{"a":1}';
		};
		assert.strictEqual(
			writeTransaction("correctPath", { a: 1 }, "utf8", writer),
			'{"a":1}'
		);
	});
});
