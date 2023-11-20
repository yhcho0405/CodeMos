/*
var cnt = 0;
setInterval(() => {
    if (cnt % 2) lander.engineOn();
    else lander.engineOff();
    cnt++;
}, 100);
*/

/* 
<다한거>
코드에디터 + 코드 적용

<할거>
로켓 API Docs 페이지 맹글기
	<get>
	1. 로켓 각도
	2. 로켓 속도 lander.getVelocity().x / lander.getVelocity().x
	3. 로켓 고도
	<set>
	1. 발사 lander.engineOn();
	2. 좌 lander.rotateLeft();
	3. 우 lander.rotateRight();

    쓰면 안되는 변수
    주석 문제
    */

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

import { logging, getVelocityX, getVelocityY, getAngle, getHeight, getRotationVelocity, engineOn, engineOff, rotateLeft, stopLeftRotation, rotateRight, stopRightRotation } from './index.js';

var newInterval;
var isFirst = true;
export function applyCode(userCode) {
    if (!isFirst) clearInterval(newInterval);
    (function() {
        eval(userCode);
    })();
    isFirst = false;
}
window.applyCode = applyCode;