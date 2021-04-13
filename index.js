const reset = document.querySelector('.reset')
const roll = document.querySelector('.roll')
const hold = document.querySelector('.hold')
const diceImage = document.querySelector('.dice__image')
const totalScore = document.querySelectorAll('h2')
const section = document.querySelectorAll('section')
const currentScore = document.querySelectorAll('.current__score')
const winner = document.querySelector('.winner')
const winnerHeading = document.querySelector('.winner h1')
const close = document.querySelector('.winner button')

let totals, holdScore, currentDice

// This is initialization function
function init(arr) {
	// Empty image source for initial/ resting
	diceImage.src = ``

	// Initial value of [0,0] if arr argument is not present
	totals = arr ? arr : [0, 0]
	holdScore = 0
	winner.style.display = 'none'

	// Assign 'active' class to the player 1 if no arr
	if (!arr) {
		section[0].classList.add('active')
		section[1].classList.remove('active')
	}

	// Displaying the value of holdScore and total score for player 1 & 2
	totals.forEach((total, i) => {
		currentScore[i].textContent = holdScore
		totalScore[i].textContent = total
	})
}

// Generate a random number between 1 & 6, and then displayes a dice
// with the random number value.
// If a person roles a dice of 1, person will lose the accumulated points
// that are not hold as a total. And game switches to other player
function rollDice() {
	// generate random number
	currentDice = Math.trunc(Math.random() * 6) + 1

	// display a dice with the random number
	diceImage.src = `./resources/${currentDice}.png`

	// check if the currentDice !== 1
	if (currentDice !== 1) {
		// add the currentDice value to the current points
		holdScore += currentDice

		// updating the current points on display
		section.forEach((sec, i) => {
			if (sec.classList.contains('active'))
				currentScore[i].textContent = holdScore
		})
	} else {
		// Case the currentDice === 1, the current points will be lost
		holdScore = 0

		// updating current point values on the display
		section.forEach((sec, i) => {
			sec.classList.toggle('active')
			currentScore[i].textContent = holdScore
		})
	}
}

// Runs when a person wants to add the current points to the total points
// before rolling a dice of one and loose the points.
// Switches to the other player
// player to accumulated 100 points first will win the game
// Display a firework for the winner

function accumulate() {
	section.forEach((sec, i) => {
		// Accumulate current points to the total for the current player
		if (sec.classList.contains('active') && totals[i] < 100) {
			totals[i] += holdScore
			init(totals)
		} else {
			null
		}

		// Check accumulated points are >= 100 for the current player
		if (totals[i] >= 100) {
			// current plaer wins and display firework
			winner.style.display = 'flex'
			document.querySelector('.winner h1 span').textContent = `${i + 1}`
			close.style.top = `${winnerHeading.getClientRects()[0].height - 100}px`
			close.style.left = `${winnerHeading.getClientRects()[0].right + 50}px`
			return
		}
		sec.classList.toggle('active')
	})
}

// Initialize the game
init()

// Reset the function to initial, with reset button
reset.addEventListener('click', function () {
	init()
})

// Roll a dice
roll.addEventListener('click', rollDice)

// Accumulate points
hold.addEventListener('click', accumulate)

// Close the winner modal window
close.addEventListener('click', function (e) {
	e.stopPropagation()
	init()
})
