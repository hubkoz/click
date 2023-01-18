const btn = document.getElementById("btn-click")
const pointsSpan = document.getElementById("points-span")
const offset = 5
let points = 0
const parentBtn = btn.parentElement
btn.style.position = 'absolute'
let isAlive = true
let timer
let timerDisplay
let timeDecrease = 1000
let count = timeDecrease/10
const cssVariables = document.querySelector(':root')
const colors = {
    font: "--FONT-COLOR",
    fontAdditional: "--FONT-COLOR-ADDITIONAL",
    bgDark: "--BG-COLOR-DARK",
    bgLight: "--BG-COLOR-LIGHT"
}
const themeRed = {
    font: "#F7D6D0",
    fontAdditional: "#F2C5E0",
    bgDark: "#610b0b",
    bgLight: "#FB6090"
}
const themeBlue = {
    font: "#B4F5F0",
    fontAdditional: "#2CEEF0",
    bgDark: "#041F60",
    bgLight: "#0476D0"
}

function changeTheme(theme) {
    cssVariables.style.setProperty(colors.font, theme.font)
    cssVariables.style.setProperty(colors.fontAdditional, theme.fontAdditional)
    cssVariables.style.setProperty(colors.bgDark, theme.bgDark)
    cssVariables.style.setProperty(colors.bgLight, theme.bgLight)
}

function randomNum(parentWidth, parentHeight, btnWidth, btnHeight) {
    return {
        x: Math.floor(Math.random() * (parentWidth - offset * 2 - btnWidth)) + offset,
        y: Math.floor(Math.random() * (parentHeight - offset * 2 - btnHeight)) + offset
    }
}

btn.addEventListener("click", () => {

    // decrease time for click
    timeDecrease -= 10
    count = timeDecrease/10

    if (isAlive) {

        // clear previous timers
        clearTimeout(timer)
        clearInterval(timerDisplay)

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
        }, timeDecrease)

        // display time left
        timerDisplay = setInterval(()=> {
            btn.innerHTML = count
            count--
            if (count < 0) {
                clearInterval(timerDisplay)
            }
        }, count/10)
    } else {
        btn.disabled = true
        btn.innerText = "END"
    }

    if (points % 2 === 0) {
        changeTheme(themeBlue)
    } else {
        changeTheme(themeRed)
    }
})