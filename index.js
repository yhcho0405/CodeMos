import { animate, clampedProgress, generateCanvas, randomBetween, seededRandomBetween, seededRandomBool, transition } from "./helpers/helpers.js";
import { makeLander } from "./lander/lander.js";
import { makeToyLander } from "./lander/toylander.js";
import { makeStarfield } from "./starfield.js";
import { makeControls } from "./lander/controls.js";
import { makeTerrain } from "./terrain.js";
import { showStatsAndResetControl } from "./stats.js";
import { manageInstructions } from "./instructions.js";
import { makeAudioManager } from "./helpers/audio.js";
import { makeStateManager } from "./helpers/state.js";
import { makeConfetti } from "./lander/confetti.js";
import { makeTallyManger } from "./tally.js";
import { makeAsteroid } from "./asteroids.js";
import { makeSpaceAsteroid } from "./spaceAsteroids.js";
import { makeChallengeManager } from "./challenge.js";
import { makeSeededRandom } from "./helpers/seededrandom.js";
import { makeBonusPointsManager } from "./bonuspoints.js";
import { makeTheme } from "./theme.js";
import { TRANSITION_TO_SPACE, VELOCITY_MULTIPLIER  } from "./helpers/constants.js";
import { landingScoreDescription, crashScoreDescription, destroyedDescription } from "./helpers/scoring.js";

var serverAddress = "http://13.114.181.168:8080"
var checkLoginID
document.addEventListener("DOMContentLoaded", () => {
    //로그인 확인
    if(sessionStorage.getItem('jwtToken') == null){
        document.querySelector('.login-btn').style.display = "block"
        document.querySelector('.logout-btn').style.display = "none"
        return
    } else {
        document.querySelector('.login-btn').style.display = "none"
        document.querySelector('.logout-btn').style.display = "block"
        checkLoginID = setInterval(()=>{
            var token = sessionStorage.getItem('jwtToken')
            fetch(serverAddress + "/auth/check", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Adjust as needed
                },
            })
            .then(response =>{
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                if(!data.valid){
                    sessionStorage.removeItem('jwtToken')
                    document.querySelector('.login-btn').style.display = "none"
                    document.querySelector('.logout-btn').style.display = "block"
                }
            })
            .catch(error => {
                console.error('Error Code:', error);
            });
        }
        , 10000);
    }   
})
function logout(){
    sessionStorage.removeItem('jwtToken')
    document.querySelector('.login-btn').style.display = "none"
    document.querySelector('.logout-btn').style.display = "block"

    var alertBox = document.createElement('div')
    alertBox.textContent = "로그아웃됨"
    alertBox.classList.add('logout-alert')
    alertBox.style.cssText = `display: none;
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    color: white;
    padding: 15px;
    border-radius: 5px;
    animation: fadeInOut 2s ease-in-out;`
    var keyframes = `@keyframes fadeInOut {
        0%, 100% {
            opacity: 0;
        }
        20%, 80% {
            opacity: 1;
        }
    }`
    var styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    styleElement.sheet.insertRule(keyframes, 0);

    alertBox.style.display = "block"
    setTimeout(() => {
        alertBox.remove()
        styleElement.remove()
    }, 2000);
}

// SETUP

const audioManager = makeAudioManager();
const [CTX, canvasWidth, canvasHeight, canvasElement, scaleFactor] = generateCanvas({
    width: window.innerWidth, // * 0.6, // 코드 에디터 사이즈 적용
    height: window.innerHeight,
    attachNode: ".game",
});

const challengeManager = makeChallengeManager();
const seededRandom = makeSeededRandom();

const appState = makeStateManager()
    .set("CTX", CTX)
    .set("canvasWidth", canvasWidth)
    .set("canvasHeight", canvasHeight)
    .set("canvasElement", canvasElement)
    .set("scaleFactor", scaleFactor)
    .set("audioManager", audioManager)
    .set("challengeManager", challengeManager)
    .set("seededRandom", seededRandom);

const theme = makeTheme(appState);
appState.set("theme", theme);

const terrain = makeTerrain(appState);
appState.set("terrain", terrain);

const bonusPointsManager = makeBonusPointsManager(appState);
appState.set("bonusPointsManager", bonusPointsManager);

const stars = makeStarfield(appState);
const instructions = manageInstructions(onCloseInstructions);
const toyLander = makeToyLander(
    appState,
    () => instructions.setEngineDone(),
    () => instructions.setLeftRotationDone(),
    () => instructions.setRightRotationDone(),
    () => instructions.setEngineAndRotationDone()
);
const toyLanderControls = makeControls(appState, toyLander, audioManager);
const lander = makeLander(appState, onGameEnd);
const landerControls = makeControls(appState, lander, audioManager);
const tally = makeTallyManger();

export function getVelocityX() {
    return lander.getVelocity().x * VELOCITY_MULTIPLIER
}

export function getVelocityY() {
    return lander.getVelocity().y * VELOCITY_MULTIPLIER
}

export function getAngle() {
    return Number(lander.getAngle());
}

export function getHeight() {
    return Number(lander.getHeight());
}

export function getRotationVelocity() {
    return lander.getRotationVelocity();
}

export function engineOn() {
    lander.engineOn();
}

export function engineOff() {
    lander.engineOff();
}

export function rotateLeft() {
    lander.rotateLeft();
}

export function stopLeftRotation() {
    lander.stopLeftRotation();
}

export function rotateRight() {
    lander.rotateRight();
}

export function stopRightRotation() {
    lander.stopRightRotation();
}

export function logging() {
    console.log("getVelocityX()        : " + getVelocityX()
    + "\ngetVelocityY()        : " + getVelocityY()
    + "\ngetAngle()            : " + getAngle()
    + "\ngetHeight()           : " + getHeight()
    + "\ngetRotationVelocity() : " + getRotationVelocity());
}
/*

lander.getVelocity().x          // 우주선 x방향 속도
lander.getVelocity().y          // 우주선 y방향 속도
lander.getAngle()               // 각도
lander.getHeight()              // 고도 ft
lander.getRotationVelocity()    // 각속도

lander.engineOn()               // 엔진 켜기
lander.engineOff()              // 엔진 끄기
lander.rotateLeft()             // 왼쪽 엔진 켜기
lander.stopLeftRotation()       // 왼쪽 엔진 끄기
lander.rotateRight()            // 오른쪽 엔진 켜기
lander.stopRightRotation()      // 오른쪽 엔진 끄기

*/
let sendAsteroid = seededRandomBool(seededRandom);
let asteroidCountdown = seededRandomBetween(2000, 15000, seededRandom);
let asteroids = [makeAsteroid(appState, lander.getPosition, onAsteroidImpact)];
let spaceAsteroids = [];
let randomConfetti = [];

let gameEnded = false;

// INSTRUCTIONS SHOW/HIDE

if (!instructions.hasClosedInstructions()) {
    instructions.show();
    toyLanderControls.attachEventListeners();
} else {
    landerControls.attachEventListeners();
    challengeManager.populateCornerInfo();
    terrain.setShowLandingSurfaces();
}

// MAIN ANIMATION LOOP

const animationObject = animate((timeSinceStart, deltaTime) => {
    CTX.fillStyle = theme.backgroundGradient;
    CTX.fillRect(0, 0, canvasWidth, canvasHeight);

    // Move stars in parallax as lander flies high
    stars.draw(lander.getVelocity());

    // Move terrain as lander flies high
    CTX.save();
    CTX.translate(0, transition(0, terrain.getLandingData().terrainHeight, clampedProgress(TRANSITION_TO_SPACE, 0, lander.getPosition().y)));
    terrain.draw();
    CTX.restore();

    if (instructions.hasClosedInstructions()) {
        landerControls.drawTouchOverlay();

        bonusPointsManager.draw(lander.getPosition().y < TRANSITION_TO_SPACE);

        // Generate and draw space asteroids
        if (lander.getPosition().y < -canvasHeight * 2) {
            // The chance that an asteroid will be sent is determined by the screen
            // width. This means that the density of asteroids will be similar across
            // phones and wider desktop screens. On a 14" MacBook the chance of an
            // asteroid being sent in any given frame is ~1 in 50; on an iPhone 14
            // it's ~1 in 200, or 1/4 the chance for a screen ~1/4 the width.
            if (!gameEnded && Math.round(randomBetween(0, 100 / (canvasWidth / 800))) === 0) {
                spaceAsteroids.push(makeSpaceAsteroid(appState, lander.getVelocity, lander.getDisplayPosition, onAsteroidImpact));
            }

            //spaceAsteroids.forEach((a) => a.draw(deltaTime));
        }

        // Move asteroids as lander flies high
        CTX.save();
        CTX.translate(0, transition(0, terrain.getLandingData().terrainHeight, clampedProgress(TRANSITION_TO_SPACE, 0, lander.getPosition().y)));
        if (sendAsteroid && timeSinceStart > asteroidCountdown) {
            //asteroids.forEach((a) => a.draw(deltaTime));
        }
        CTX.restore();

        if (randomConfetti.length > 0) {
            randomConfetti.forEach((c) => c.draw(deltaTime));
        }

        lander.draw(timeSinceStart, deltaTime);
    } else {
        toyLander.draw(deltaTime);

        toyLanderControls.drawTouchOverlay();
    }
});

// PASSED FUNCTIONS

function onCloseInstructions() {
    toyLanderControls.detachEventListeners();
    landerControls.attachEventListeners();
    challengeManager.populateCornerInfo();
    terrain.setShowLandingSurfaces();
}

let _code;

export function setSaveCode(code) {
    _code = code
}

window.setSaveCode = setSaveCode;

function onGameEnd(data) {
    gameEnded = true;
    landerControls.detachEventListeners();
    bonusPointsManager.hide();

    const finalScore = data.landerScore + bonusPointsManager.getTotalPoints();
    const scoreDescription = data.landed ? landingScoreDescription(finalScore) : data.struckByAsteroid ? destroyedDescription() : crashScoreDescription(finalScore);
    const scoreForDisplay = Intl.NumberFormat().format(finalScore.toFixed(1));

    showStatsAndResetControl(appState, lander, animationObject, { ...data, scoreDescription, scoreForDisplay }, landerControls.getHasKeyboard(), onResetGame);

    if (data.landed) {
        audioManager.playLanding();
        tally.storeLanding();
    } else {
        audioManager.playCrash();
        tally.storeCrash();
    }

    tally.updateDisplay();

    var personalBest = localStorage.getItem('personalBestScore');

    if (!data.isPressKey && !personalBest) {
        localStorage.setItem('personalBestScore', -9999999);
    }

    // 만약 로그인 된 상태라면
    setTimeout(() => {
        if (!data.isPressKey) {        
            console.log(data.landed ? finalScore : -finalScore);
            if (personalBest < data.landed ? finalScore : -finalScore) {
                var isConfirm = confirm("개인 최고기록 " + (data.landed ? finalScore : -finalScore) + "점을 리더보드에 등록할까여");
                if (isConfirm) {
                    // TODO: 서버로 요청

                    const serverAddress = "http://13.114.181.168:8080"
                    fetch(serverAddress+'/api/v1/leaderBoard/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
                        },
                        body: JSON.stringify({ 
                            score: parseInt((data.landed ? finalScore : -finalScore) * 100000), 
                            code: _code,
                            time: data.durationInSeconds.toString()
                        })
                    })
                    .then((response) => {
                        if(!response.ok){
                            throw new Error(response.status)
                        }
                        return response.json()
                    })
                    .catch((err) => {
                        console.log("err: ", err)
                    })

                    localStorage.setItem('personalBestScore', data.landed ? finalScore : -finalScore);
                    console.log(data.landed ? finalScore : -finalScore);
                }
            }
        }
    }, "1500");

}

function onResetGame() {
    gameEnded = false;
    lander.resetProps(); // added, replay시 리셋
    landerControls.attachEventListeners();
    seededRandom.setDailyChallengeSeed();
    randomConfetti = [];
    terrain.reGenerate();
    stars.reGenerate();
    sendAsteroid = seededRandomBool(seededRandom);
    asteroidCountdown = seededRandomBetween(2000, 15000, seededRandom);
    asteroids = [makeAsteroid(appState, lander.getPosition, onAsteroidImpact)];
    spaceAsteroids = [];
    bonusPointsManager.reset();
}

function onAsteroidImpact(asteroidVelocity) {
    lander.destroy(asteroidVelocity);
}

// EXTRAS

// document.addEventListener("keydown", ({ key }) => {
//     if (key === "c") {
//         randomConfetti.push(
//             makeConfetti(appState, 10, {
//                 x: randomBetween(0, canvasWidth),
//                 y: randomBetween(0, canvasHeight),
//             })
//         );
//     }
// });

// document.addEventListener("keydown", ({ key }) => {
//     if (key === "m") {
//         sendAsteroid = true;
//         asteroidCountdown = 0;
//         asteroids.push(makeAsteroid(appState, lander.getPosition, onAsteroidImpact));
//     }
// });
