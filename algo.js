var landAlt = -70;
function engineCtr(hrzCtr) {
    if ((!hrzCtr || lander.getVelocity().x < 0) && lander.getVelocity().y > 
        (Number(lander.getHeight()) - landAlt) / 100) lander.engineOn();
    else if (Math.abs(lander.getAngle()) < 1) lander.engineOff();
}
newInterval = setInterval(() => {
    if (lander.getAngle() > 
        (-lander.getRotationVelocity() * 40)
        - (lander.getVelocity().x) * 45) {
        lander.stopRightRotation();
        lander.rotateLeft();
        engineCtr(true)
    } else {
        lander.stopLeftRotation();
        lander.rotateRight();       
        engineCtr(true)
    }
    engineCtr(false);
}, 1);



var landAlt = -70;
var startH = -9999;
var hrzSens = 100;
function engineCtr(hrzCtr) {
    if ((!hrzCtr || lander.getVelocity().x < 0) && lander.getVelocity().y > 
        (Number(lander.getHeight()) - landAlt) / 100) lander.engineOn();
    else if (Math.abs(lander.getAngle()) < 1) lander.engineOff();
}
newInterval = setInterval(() => {
    if (startH == -9999) startH = lander.getHeight();
    if (lander.getHeight() < (landAlt + startH) / 2) hrzSens = 40;
    if (lander.getAngle() >
        (-lander.getRotationVelocity() * hrzSenc)
        - (lander.getVelocity().x) * 60) {
        lander.stopRightRotation();
        lander.rotateLeft();
        engineCtr(true)
    } else {
        lander.stopLeftRotation();
        lander.rotateRight();       
        engineCtr(true)
    }
    engineCtr(false);
}, 1);

newInterval = setInterval(() => {
    lander.getPosition().y;
}, 100);

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
newInterval = setInterval(() => {

}, 1);