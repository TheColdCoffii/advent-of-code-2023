import fs from "fs/promises"

async function solve() {
	let sum = 0
	const file = await fs.readFile("3/input.txt", { encoding: "utf-8" })
	const lines = file.split("\n")

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex]

		const numbers = getAllNumbers(line)
		if (!numbers) continue

		for (let numberIndex = 0; numberIndex < numbers.length; numberIndex++) {
			const number = numbers[numberIndex]
			const stringRange = {
				start: 0,
				end: 0,
			}
			if (number.start === 0) {
				stringRange.start = 0
			} else {
				stringRange.start = number.start - 1
			}

			if (number.end === line.length - 1) {
				stringRange.end = line.length - 1
			} else {
				stringRange.end = number.end + 1
			}

			if (lineIndex === 0) {
				const lowerLine = lines[lineIndex + 1]
				if (
					hasSpecialCharacter(
						lowerLine.slice(stringRange.start, stringRange.end + 1)
					)
				) {
					sum += number.value
				} else if (
					hasSpecialCharacter(
						line.slice(stringRange.start, stringRange.end + 1)
					)
				) {
					sum += number.value
				} else {
					console.log(
						"lower: ",
						lowerLine.slice(stringRange.start, stringRange.end + 1)
					)
					console.log(
						"current: ",
						line.slice(stringRange.start, stringRange.end + 1)
					)
					console.log()
				}
			} else if (lineIndex === lines.length - 1) {
				const upperLine = lines[lineIndex - 1]

				if (
					hasSpecialCharacter(
						upperLine.slice(stringRange.start, stringRange.end + 1)
					)
				) {
					sum += number.value
				} else if (
					hasSpecialCharacter(line.slice(stringRange.start, stringRange.end))
				) {
					sum += number.value
				} else {
					console.log(
						"upper: ",
						upperLine.slice(stringRange.start, stringRange.end + 1)
					)

					console.log(
						"current: ",
						line.slice(stringRange.start, stringRange.end + 1)
					)
					console.log()
				}
			} else {
				const lowerLine = lines[lineIndex + 1]

				const upperLine = lines[lineIndex - 1]

				if (
					hasSpecialCharacter(
						upperLine.slice(stringRange.start, stringRange.end + 1)
					)
				) {
					sum += number.value
				} else if (
					hasSpecialCharacter(
						line.slice(stringRange.start, stringRange.end + 1)
					)
				) {
					sum += number.value
				} else if (
					hasSpecialCharacter(
						lowerLine.slice(stringRange.start, stringRange.end + 1)
					)
				) {
					sum += number.value
				} else {
					console.log(
						"upper: ",
						upperLine.slice(stringRange.start, stringRange.end + 1)
					)
					console.log(
						"current: ",
						line.slice(stringRange.start, stringRange.end + 1)
					)
					console.log(
						"lower: ",
						lowerLine.slice(stringRange.start, stringRange.end + 1)
					)
					console.log()
				}
			}
		}
	}
	console.log(sum)
}

function hasSpecialCharacter(string: string) {
	const regex = /[^.\d]/g
	return regex.test(string)
}

function getAllNumbers(string: string): Array<{
	start: number
	end: number
	value: number
}> | null {
	const regex = /\d+/g
	let match: RegExpExecArray | null
	let matches: Array<{ value: number; start: number; end: number }> = []
	while ((match = regex.exec(string)) !== null) {
		matches.push({
			value: parseInt(match[0]),
			start: match.index,
			end: match.index + match[0].length - 1,
		})
	}
	if (matches.length === 0) return null
	return matches
}

solve()
