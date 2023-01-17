const btn = document.getElementById("btn-click")
const pointsSpan = document.getElementById("points-span")
const offset = 5
let points = 0
const parentBtn = btn.parentElement
btn.style.position = 'absolute'
let isAlive = true
let timer
let timerDisplay
let count = 100

function randomNum(parentWidth, parentHeight, btnWidth, btnHeight) {
    return {
        x: Math.floor(Math.random() * (parentWidth - offset * 2 - btnWidth)) + offset,
        y: Math.floor(Math.random() * (parentHeight - offset * 2 - btnHeight)) + offset
    }
}

btn.addEventListener("click", () => {

    if (isAlive) {

        // clear previous timers
        clearTimeout(timer)
        clearInterval(timerDisplay)
        count = 100

        // add points
        points += 1
        pointsSpan.innerHTML = `${points}`

        // change position
        const { x, y } = randomNum(parentBtn.offsetWidth, parentBtn.offsetHeight, btn.offsetWidth, btn.offsetHeight)
        btn.style.right = `${x}px`
        btn.style.bottom = `${y}px`

        // set new timeout
        timer = setTimeout(()=> {
            isAlive = false
        }, 1000)

        // display time left
        timerDisplay = setInterval(()=> {
            btn.innerHTML = count
            count--
            if (count < 0) {
                clearInterval(timerDisplay)
            }
        }, 10)

    } else {
        btn.disabled = true
        btn.innerText = "END"
    }
})