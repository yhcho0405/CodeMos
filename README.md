
## CodeMos API Documentation
### INDEX
- [Tip](#tip)
- [Getting Started](#getting-started)
- [Get Methods](#get-methods)
  - [getVelocityX](#getvelocityx)
  - [getVelocityY](#getvelocityy)
  - [getAngle](#getangle)
  - [getHeight](#getheight)
  - [getRotationVelocity](#getrotationvelocity)
- [Set Methods](#set-methods)
  - [engineOn](#engineon)
  - [engineOff](#engineoff)
  - [rotateLeft](#rotateleft)
  - [stopLeftRotation](#stopleftrotation)
  - [rotateRight](#rotateright)
  - [stopRightRotation](#stoprightrotation)
- [Utility Methods](#utility-methods)
- [TMI](#tmi)

<iframe width="560" height="315" src="https://www.youtube.com/embed/AM9rDd-U9FY?si=5uXxDUUrcad83hTT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Tip

1. JS ES6의 모든 문법을 사용해 CodeMos 우주선 알고리즘을 작성할 수 있습니다.
2. 알고리즘이 작동하지 않는다면 코드를 잘못 짠게 아닐지 고민해 보세요.
3. 버그가 발견되었다면 이스터에그입니다.

### Getting Started

#### main loop

CodeMos 알고리즘에서 main loop는 아래와 같이 "newInterval"에 할당되어야 합니다.
"newInterval"에 할당하지 않고 setInterval을 호출할 시 초기화 오류가 발생할 수 있습니다.
interval 간격은 수정할 수 있습니다.

```javascript
// TODO: 
newInterval = setInterval(() => {
    // TODO: 
}, 1); // 1ms loop
// TODO: 
```

```javascript
// Incorrect Example

setInterval(() => {
    // something something
}, 1);
```

#### Algorithm Writing Example

전역 스코프에서 함수와 변수를 정의할 수 있습니다.
아래는 착륙 알고리즘 예제 입니다.(고득점 불가)

```javascript
var targetHeight = 0; // Landing altitude

function engineCtrl() { // Engine control depending on altitude
    if (getVelocityY() * 5 > (getHeight() - targetHeight))
        engineOn();
    else
        engineOff();
}

newInterval = setInterval(() => { // main loop
    if (getAngle() > 0) { // Adjusting the angle of the spaceship
        stopRightRotation();
        rotateLeft();
    } else {
        stopLeftRotation();
        rotateRight();
    }
    engineCtrl();
}, 1);
```

#### Well-Written Landing Algorithm Example

![landing_sample (1)](https://github.com/yhcho0405/CodeMos/assets/52823519/810e5e11-3fce-47ae-a23d-5cb1460d4d6a)

```javascript
// 비밀 ~
```

### Get Methods

#### getVelocityX

이 함수는 우주선의 현재 수평 속도를 실수형으로 반환합니다.
  - 음수 : 우주선이 좌로 이동 중
  - 양수 : 우주선이 우로 이동 중

```javascript
getVelocityX()
```

#### getVelocityY

이 함수는 우주선의 현재 수직 속도를 실수형으로 반환합니다.
  - 음수 : 우주선이 위로 이동 중
  - 양수 : 우주선이 아래로 이동 중

```javascript
getVelocityY()
```

#### getAngle

이 함수는 우주선의 현재 각도를 실수형으로 반환합니다.(-180.0 ~ +180.0)

```javascript
getAngle()
```

#### getHeight

이 함수는 우주선의 현재 고도(ft, 피트)를 정수형으로 반환합니다.
착륙지점의 고도는 0ft 입니다.

```javascript
getHeight()
```

#### getRotationVelocity

이 함수는 우주선의 현재 각속도를 실수형으로 반환합니다.
  - 음수 : 우주선이 반시계 방향으로 회전 중
  - 양수 : 우주선이 시계 방향으로 회전 중

```javascript
getRotationVelocity()
```

### Set Methods

#### engineOn

이 함수를 호출하면 우주선의 주 엔진을 작동시킵니다.

<img width="146" alt="image" src="https://github.com/yhcho0405/CodeMos/assets/52823519/11c23e42-aeef-4f39-a701-50d467291200">

```javascript
engineOn()
```

#### engineOff

이 함수를 호출하면 우주선의 주 엔진을 정지합니다.

```javascript
engineOff()
```

#### rotateLeft

이 함수를 호출하면 우주선의 좌측 추진체을 작동합니다.
(우주선의 각속도가 증가합니다.)

<img width="166" alt="image" src="https://github.com/yhcho0405/CodeMos/assets/52823519/67b018c5-8f0f-4e06-b624-9df2a7a6e254">

```javascript
rotateLeft()
```

#### stopLeftRotation

이 함수를 호출하면 우주선의 좌측 추진체을 정지합니다.

```javascript
stopLeftRotation()
```

#### rotateRight

이 함수를 호출하면 우주선의 우측 추진체을 작동합니다.
(우주선의 각속도가 감소합니다.)

<img width="155" alt="image" src="https://github.com/yhcho0405/CodeMos/assets/52823519/c0205ad5-8a7d-4986-a6d3-cc828732b079">

```javascript
rotateRight()
```

#### stopRightRotation

이 함수를 호출하면 우주선의 우측 추진체을 정지합니다.

```javascript
stopRightRotation()
```

### Utility Methods

#### logging

이 함수는 Get Method 들의 반환값을 console에 표시합니다.

```javascript
logging()

/*
f12 -> [console output]

getVelocityX()        : 11.39214005489352
getVelocityY()        : 27.95145243876781
getAngle()            : -60.2
getHeight()           : 239
getRotationVelocity() : 0.37505750000014804
*/
```

### TMI

1. CodeMos 행성은 중력(4.29158 m/s²) 외에는 어떠한 힘도 작용하지 않습니다.
2. 주 엔진 thrust : Δ10.729 m/s
3. 좌, 우측 엔진 thrust: Δ1.2 rotational velocity/s
4. 착륙 속도 0.0 MPH, 착륙 각도 0.0° 일 때, 100점을 획득합니다.
