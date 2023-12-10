import fs from "fs/promises"

async function solve() {
	let sum = 0
	const file = await fs.readFile("3/input.txt", { encoding: "utf-8" })
	const lines = file.split("\n")

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex]
		const results = getSpecialCharacters(line)
		if (!results) {
			continue
		}
		for (let specialIndex = 0; specialIndex < results.length; specialIndex++) {
			const matches: Array<{
				index: number
				value: number | null
			}> = []
			const characterIndex = results[specialIndex]
			const areaAroundCharacter = {
				start: characterIndex === 0 ? 0 : characterIndex - 1,
				end:
					characterIndex === line.length - 1
						? characterIndex
						: characterIndex + 1,
			}
			// If at start
			if (lineIndex === 0) {
			} // If at the end
			else if (lineIndex === lines.length - 1) {
			} else {
				// 1. Check the number of number that are around the symbol
				// 2. If more than or less than two, skip
				// 3. If exactly two, get the index of both number relative to the actual line
				// Formula (specialCharacterIndex +- 1 or specialCharacterIndex) depending on the location
				// 4. Complete the entire number by making two while loops that each complete the number in both left and right directions
				// ..111.. <--1--> <--111--> <--.111.--> stop here cause it has dots
				// 5. Multiply the two
				const upperSnippet = lines[lineIndex - 1].slice(
					areaAroundCharacter.start,
					areaAroundCharacter.end + 1
				)
				const lowerSnipper = lines[lineIndex + 1].slice(
					areaAroundCharacter.start,
					areaAroundCharacter.end + 1
				)
				const currentSnipper = line.slice(
					areaAroundCharacter.start,
					areaAroundCharacter.end + 1
				)
				let numbers = getNumbers(upperSnippet)
				if (numbers) {
				}
			}
		}
	}
}

function getNumbers(string: string) {
	const regex = /(\d+)/g
	return string.match(regex)
}
function getFullNumber(index: number) {}

function getSpecialCharacters(string: string): Array<number> | null {
	const regex = /[^.\d+]/g
	let match: RegExpExecArray | null
	let matches: Array<number> = []
	while ((match = regex.exec(string)) !== null) {
		matches.push(match.index)
	}
	if (matches.length === 0) return null
	return matches
}

solve()
