const fs = require("fs").promises
async function solution() {
	let sum = 0
	const limit = {
		red: 12,
		green: 13,
		blue: 14,
	}
	const file = await fs.readFile("./2/input.txt", "utf-8")
	const lines = file.split("\n")
	outer: for (const line of lines) {
		const results = line.split(":")[1].trim().split(";")
		const minimumAmount = {
			red: 0,
			blue: 0,
			green: 0,
		}
		let power
		for (let i = 0; i < results.length; i++) {
			const colorMatch = results[i].split(",").map((color) => {
				return color.trim().split(" ")
			})
			for (let j = 0; j < colorMatch.length; j++) {
				const qty = parseInt(colorMatch[j][0])
				const color = colorMatch[j][1]

				const match = {
					[color]: qty,
				}
				if (match[color] > minimumAmount[color]) {
					minimumAmount[color] = match[color]
				}
			}
			power = minimumAmount.red * minimumAmount.blue * minimumAmount.green
		}
		sum += power
	}
	console.log(sum)
}
solution()
