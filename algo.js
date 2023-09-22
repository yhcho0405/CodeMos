newInterval = setInterval(() => {
    if (lander.getAngle() > -lander.getRotationVelocity() * 4) {
        lander.stopRightRotation();
        lander.rotateLeft();
        if (lander.getVelocity().x < 0) {
            lander.engineOn();
        } else {
            lander.engineOff();
        }
    } else {
        lander.stopLeftRotation();
        lander.rotateRight();       
        if (lander.getVelocity().x > 0) {
            lander.engineOn();
        } else {
            lander.engineOff();
        }
    }
    if (lander.getVelocity().y > (Number(lander.getHeight()) + 20.0) / 100) {
        lander.engineOn();
    } else if (Math.abs(lander.getAngle()) < 1) {
        lander.engineOff();
    }
}, 1);

newInterval = setInterval(() => {
    console.log((lander.getHeight() + 20.0) / 100);
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