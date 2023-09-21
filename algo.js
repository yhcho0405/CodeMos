newInterval = setInterval(() => {
    if (lander.getAngle() > 0) {
        lander.stopRightRotation();
        lander.rotateLeft();
    } else {
        lander.stopLeftRotation();
        lander.rotateRight();
    }
    if (lander.getHieght() < 100) {
        lander.engineOn();
    } else {
        lander.engineOff();
    }
}, 1);

newInterval = setInterval(() => {
    console.log(lander.getAngle());
}, 100);
