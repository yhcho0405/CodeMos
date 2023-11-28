
import { logging, getVelocityX, getVelocityY, getAngle, getHeight, getRotationVelocity, engineOn, engineOff, rotateLeft, stopLeftRotation, rotateRight, stopRightRotation } from './index.js';

function removeComment(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
}

var newInterval;
var isFirst = true;

export function applyCode(userCode) {
    console.log(userCode);
    var code = removeComment(userCode); 

    if (!isFirst) clearInterval(newInterval);
    (function() {
        eval(code);
    })();
    isFirst = false;
}

window.applyCode = applyCode;