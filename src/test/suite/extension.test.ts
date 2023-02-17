import { strictEqual } from "assert";
import { window } from "vscode";

import { checkList, checkTask } from "../../checkRegex";

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
		strictEqual(typeof successRegex, typeof checkList(list));
	});

	test("Regex Test2: Not List", () => {
		const failTexts = [uncheckedTask, checkedTask, jhonDoe];
		failTexts.forEach((v) => {
			strictEqual(typeof failureRegex, typeof checkList(v));
		});
	});

	test("Regex Test3: Task", () => {
		strictEqual(typeof successRegex, typeof checkTask(uncheckedTask));
		strictEqual(typeof successRegex, typeof checkTask(checkedTask));
	});

	test("Regex Test4: Not Task", () => {
		const failTexts = [list, jhonDoe];
		failTexts.forEach((v) => {
			strictEqual(typeof failureRegex, typeof checkTask(v));
		});
	});
});
