const reset = document.querySelector('.reset')
const roll = document.querySelector('.roll')
const hold = document.querySelector('.hold')
const diceImage = document.querySelector('.dice__image')
const totalScore = document.querySelectorAll('h2')
const section = document.querySelectorAll('section')
const currentScore = document.querySelectorAll('.current__score')
const winner = document.querySelector('.winner')
const close = document.querySelector('.winner button')

let totals, holdScore, currentDice

function init(arr) {
	diceImage.src = ``
	totals = arr ? arr : [0, 0]
	holdScore = 0
	winner.style.display = 'none'
	if (!arr) {
		section[0].classList.add('active')
		section[1].classList.remove('active')
	}
	totals.forEach((total, i) => {
		currentScore[i].textContent = holdScore
		totalScore[i].textContent = total
	})
}

function rollDice() {
	currentDice = Math.trunc(Math.random() * 6) + 1
	diceImage.src = `./resources/${currentDice}.png`
	if (currentDice !== 1) {
		holdScore += currentDice

		section.forEach((sec, i) => {
			if (sec.classList.contains('active'))
				currentScore[i].textContent = holdScore
		})
	} else {
		holdScore = 0
		section.forEach((sec, i) => {
			sec.classList.toggle('active')
			currentScore[i].textContent = holdScore
		})
	}
}

function accumulate() {
	section.forEach((sec, i) => {
		if (sec.classList.contains('active') && totals[i] < 50) {
			totals[i] += holdScore
			init(totals)
		} else {
			null
		}
		if (totals[i] >= 50) {
			winner.style.display = 'flex'
			document.querySelector('.winner h1 span').textContent = `${i + 1}`
			return
		}
		sec.classList.toggle('active')
	})
}

init()

reset.addEventListener('click', function () {
	init()
})

roll.addEventListener('click', rollDice)

hold.addEventListener('click', accumulate)

close.addEventListener('click', function (e) {
	e.stopPropagation()
	init()
})
