const btn = document.getElementById("btn-click")
const clicksSpan = document.getElementById("clicks-span")
const pointsSpan = document.getElementById("points-span")
const pointsMultiplierSpan = document.getElementById("points-multiplier")
const click = document.getElementById("click")
let clicks = 0
let points = 0
let pointsMultiplier = 1
const offset = 5
const parentBtn = btn.parentElement
btn.style.position = 'absolute'
let isAlive = true
let timer
let timerDisplay
let timeDecrease = 1000
let count = timeDecrease/10
const cssVariables = document.querySelector(':root')
const cssPHeaderContainer = document.querySelector('.header__p_container')
const colors = {
    font: "--FONT-COLOR",
    fontAdditional: "--FONT-COLOR-ADDITIONAL",
    bgDark: "--BG-COLOR-DARK",
    bgLight: "--BG-COLOR-LIGHT"
}
const themeMap = {
    themeRed: {
        font: "#F7D6D0",
        fontAdditional: "#F2C5E0",
        bgDark: "#610b0b",
        bgLight: "#FB6090"},
    themeBlue: {
        font: "#B4F5F0",
        fontAdditional: "#2CEEF0",
        bgDark: "#041F60",
        bgLight: "#0476D0"},
    themeYellow: {
        font: "#fdff9d",
        fontAdditional: "#eeff00",
        bgDark: "#423800",
        bgLight: "#bbb817"},
    themePurple: {
        font: "#ad8eeb",
        fontAdditional: "#a72aeb",
        bgDark: "#161329",
        bgLight: "#5a008a"},
    themeBlack: {
        font: "whitesmoke",
        fontAdditional: "white",
        bgDark: "black",
        bgLight: "#333"},
    themeOrange: {
        font: "#ffd8c5",
        fontAdditional: "#FEEBA0",
        bgDark: "#7c200c",
        bgLight: "#FF8D80"},
    themeGreen: {
        font: "#12eb98",
        fontAdditional: "#14E114",
        bgDark: "#09323B",
        bgLight: "#117660"}
}

function getRandomTheme() {
    const themeKeys = Object.keys(themeMap)
    const randomIndex = Math.floor(Math.random() * themeKeys.length)
    const randomKey = themeKeys[randomIndex]
    return themeMap[randomKey]
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

// random theme onload
document.addEventListener("DOMContentLoaded", changeTheme(getRandomTheme()))

btn.addEventListener("click", () => {

    //display stats
    cssPHeaderContainer.style.setProperty("visibility", "visible")

    // decrease time for click
    timeDecrease -= 10
    count = timeDecrease/10

    // remove previous animations
    pointsMultiplierSpan.classList.remove("animate__flash")
    clicksSpan.classList.remove("animate__flash")

    if (isAlive) {

        // clear previous timers
        clearTimeout(timer)
        clearInterval(timerDisplay)

        // add clicks
        clicks++
        clicksSpan.innerHTML = `${clicks}`

        //add points
        points = 1 * pointsMultiplier + points
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

        if (clicks % 5 === 0) {
            changeTheme(getRandomTheme())
            pointsMultiplier++
            pointsMultiplierSpan.classList.add("animate__flash")
        }
        if (clicks % 10 === 0){
            clicksSpan.classList.add("animate__flash")
        }
        pointsMultiplierSpan.innerHTML = ` x${pointsMultiplier}`
        return;
    }

    // game over
    btn.disabled = true
    btn.innerText = "END"
    pointsMultiplierSpan.innerHTML = ``
    setTimeout(()=> {
        btn.innerHTML = "RESET"
        btn.classList.add("animate__heartBeat")
        btn.disabled = false
        btn.addEventListener("click",()=> {
            location.reload()
        })
    }, 2000)
})