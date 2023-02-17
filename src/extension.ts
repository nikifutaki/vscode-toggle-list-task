import { commands, ExtensionContext, Range, window } from "vscode";

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand("toggle-list-task.toggle", toggle),
	);
}

function toggle(): Thenable<unknown> | void {
	const editor = window.activeTextEditor!;
	const listRegex = /^(\s*)([-+*]|[0-9]+[.)])(?! +\[[x ]\]) +/;
	const tasklistRegex = /^(\s*)([-+*]|[0-9]+[.)]) +\[[x ]\] */;
	let replaceRanges: Range[] = [];
	let newState: boolean | undefined = undefined;

	for (const selection of editor.selections) {
		for (let i = selection.start.line; i <= selection.end.line; i++) {
			const line = editor.document.lineAt(i);
			const lineStart = line.range.start;

			if (
				!selection.isSingleLine &&
				(selection.start.isEqual(line.range.end) ||
					selection.end.isEqual(line.range.start))
			) {
				continue;
			}

			let matches: RegExpExecArray | null;
			if ((matches = listRegex.exec(line.text))) {
				if (newState === undefined) newState = true;
			} else if ((matches = tasklistRegex.exec(line.text))) {
				if (newState === undefined) newState = false;
			}

			if (matches) {
				replaceRanges.push(
					new Range(
						lineStart.with({ character: matches[1].length }),
						lineStart.with({ character: matches[0].length }),
					),
				);
			}
		}
	}

	if (newState !== undefined) {
		const newChar = newState ? "- [ ] " : "- ";
		return editor.edit((editBuilder) => {
			for (const range of replaceRanges) {
				editBuilder.replace(range, newChar);
			}
		});
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
