import { strictEqual } from "assert";
import { window } from "vscode";

import { searchList, searchTask } from "../../searchRegex";

suite("Extension Test Suite", () => {
	window.showInformationMessage("Start all tests.");

	const testRegex = /test/;
	const successRegex = testRegex.exec("test");
	const failureRegex = testRegex.exec("Hello");
	const list = "- Item";
	const uncheckedTask = "- [ ] Unchecked";
	const checkedTask = "- [x] Checked";
	const jhonDoe = "-abc123";

	test("Regex Test1: List", () => {
		strictEqual(typeof successRegex, typeof searchList(list));
	});

	test("Regex Test2: Not List", () => {
		const failTexts = [uncheckedTask, checkedTask, jhonDoe];
		failTexts.forEach((v) => {
			strictEqual(typeof failureRegex, typeof searchList(v));
		});
	});

	test("Regex Test3: Task", () => {
		strictEqual(typeof successRegex, typeof searchTask(uncheckedTask));
		strictEqual(typeof successRegex, typeof searchTask(checkedTask));
	});

	test("Regex Test4: Not Task", () => {
		const failTexts = [list, jhonDoe];
		failTexts.forEach((v) => {
			strictEqual(typeof failureRegex, typeof searchTask(v));
		});
	});
});
