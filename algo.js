var landAlt = -70;
function engineCtr(hrzCtr) {
    if ((!hrzCtr || getVelocity().x < 0) && getVelocity().y > 
        (Number(getHeight()) - landAlt) / 100) engineOn();
    else if (Math.abs(getAngle()) < 1) engineOff();
}
newInterval = setInterval(() => {
    if (getAngle() > 
        (-getRotationVelocity() * 40)
        - (getVelocity().x) * 45) {
        stopRightRotation();
        rotateLeft();
        engineCtr(true)
    } else {
        stopLeftRotation();
        rotateRight();       
        engineCtr(true)
    }
    engineCtr(false);
}, 1);

var landAlt = -70;
var startH = -9999;
var hrzSens = 100;
function engineCtr(hrzCtr) {
    if ((!hrzCtr || getVelocityX() < 0) && getVelocityY() > 
        (Number(getHeight()) - landAlt) / 100) engineOn();
    else if (Math.abs(getAngle()) < 1) engineOff();
}
newInterval = setInterval(() => {
    if (startH == -9999) startH = getHeight();
    if (getHeight() < (landAlt + startH) / 2) hrzSens = 40;
    if (getAngle() >
        (-getRotationVelocity() * hrzSens)
        - (getVelocityX()) * 60) {
        stopRightRotation();
        rotateLeft();
        engineCtr(true)
    } else {
        stopLeftRotation();
        rotateRight();       
        engineCtr(true)
    }
    engineCtr(false);
}, 1);

newInterval = setInterval(() => {
    getPosition().y;
}, 100);

/*

getVelocity().x          // 우주선 x방향 속도
getVelocity().y          // 우주선 y방향 속도
getAngle()               // 각도
getHeight()              // 고도 ft
getRotationVelocity()    // 각속도

engineOn()               // 엔진 켜기
engineOff()              // 엔진 끄기
rotateLeft()             // 왼쪽 엔진 켜기
stopLeftRotation()       // 왼쪽 엔진 끄기
rotateRight()            // 오른쪽 엔진 켜기
stopRightRotation()      // 오른쪽 엔진 끄기

*/
newInterval = setInterval(() => {

}, 1);