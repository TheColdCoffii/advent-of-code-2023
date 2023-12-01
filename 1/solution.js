const fs = require("fs").promises

async function calculate() {
	try {
		let sum = 0
		const file = await fs.open("./input.txt")
		for await (const line of file.readLines()) {
			let first = null
			let second = null
			// Create an array from the matches
			const matches = Array.from(
				line.matchAll(
					/(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g
				),
				(match) => {
					return match[1]
				}
			)
			if (matches.length == 0) {
				continue
			}
			first = convertToDigit(matches[0])
			second = convertToDigit(matches[matches.length - 1])
			const number = first * 10 + second
			sum += number
		}
		console.log(sum)
		file.close()
	} catch (error) {
		console.log(error)
	}
}

function convertToDigit(string) {
	switch (string) {
		case "one":
		case "1":
			return 1
		case "two":
		case "2":
			return 2
		case "three":
		case "3":
			return 3
		case "four":
		case "4":
			return 4
		case "five":
		case "5":
			return 5
		case "six":
		case "6":
			return 6
		case "seven":
		case "7":
			return 7
		case "eight":
		case "8":
			return 8
		case "nine":
		case "9":
			return 9
		default:
			return NaN
	}
}

calculate()
