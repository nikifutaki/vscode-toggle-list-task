export function searchList(text: string): RegExpExecArray | null {
	const listRegex = /^(\s*)([-+*]|[0-9]+[.)])(?! +\[[x ]\]) +/;
	return listRegex.exec(text);
}

export function searchTask(text: string): RegExpExecArray | null {
	const taskRegex = /^(\s*)([-+*]|[0-9]+[.)]) +\[[x ]\] */;
	return taskRegex.exec(text);
}
