// Iteration 1: Declare variables required for this game
let gameBody = document.getElementById("game-body")
let time = document.getElementById("timer").textContent
let zombieid = 0;

let zombieArr = [
    "./assets/zombie-1.png",
    "./assets/zombie-2.png",
    "./assets/zombie-3.png",
    "./assets/zombie-4.png",
    "./assets/zombie-5.png",
    "./assets/zombie-6.png"
]

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio('./assets/shotgun.wav')
gameBody.onclick = () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0
    shotgunSound.play();
}

// Iteration 1.3: Add background sound
const backgroundSound = new Audio('./assets/bgm.mp3')
backgroundSound.play();
backgroundSound.loop = true

// Iteration 1.4: Add lives
let live = 4

// Iteration 2: Write a function to make a zombie
function makeZombie() {
    let index = zombieArr[getRandomInt(0, zombieArr.length)]
    gameBody.innerHTML += `<img src="${index}" alt="" class="zombie-image" id="${zombieid}">`
    let zombie = document.getElementById(zombieid)
    zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`
    zombie.style.animationDuration = `${getRandomInt(2, 8)}s`
    zombie.onclick = () => {
        destroyZombie(zombie)
    }
}

// Iteration 3: Write a function to check if the player missed a zombie
function missedZombie(zombies) {
    if (zombies.getBoundingClientRect().top <= 0) {
        live--
        return true
    }
    return false
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombies) {
    zombies.style.display = "none"
    zombieid++
    makeZombie();
}

// Iteration 5: Creating timer
let timer = setInterval(function () {
    time--
    document.getElementById("timer").textContent = time
    let zombies = document.getElementById(zombieid)
    if (missedZombie(zombies)) {
        destroyZombie(zombies)
        if (live == 0) {
            clearInterval(timer)
            location.href = "./game-over.html"
        }
    }
    if (time == 0) {
        clearInterval(timer)
        location.href = "./win.html"
    }
}, 1000)

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie();

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    min = Math.floor(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}