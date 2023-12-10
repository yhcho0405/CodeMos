![header](https://capsule-render.vercel.app/api?type=waving&color=0:000,40:02071e,80:030928&height=300&section=header&text=CodeMos&fontSize=90&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Try%20writing%20an%20algorithm%20that%20can%20land%20safely%20in%20any%20situation.&descAlignY=51&descAlign=50)

# CodeMos - 우주선 착륙 게임

CodeMos는 추락하는 우주선 :rocket: 을 직접 코드를 작성하여 안전하게 착륙시키는 게임입니다.

어떠한 상황에서도 안전하게 착륙하는 알고리즘을 작성해보세요!

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Play](#how-to-play)
    1. [게임 입장 화면](#게임-입장-화면)
    2. [게임 시작 화면](#게임-시작-화면)
    3. [API Docs와 Code Editor](#API-Docs와-Code-Editor)
    4. [Code Apply](#code-apply)
    5. [게임 결과 화면](#게임-결과-화면)
4. [API Function Docs](#API-Function-Docs)
5. [기술 스택](#기술-스택)
6. [Reference](#reference)
7. [License](#license)

## Getting Started

- Web Link
    - http://codemos.site
- Prerequisites
    - Chromium 기반 웹 브라우저

## Running on LocalHost

```bash
$> npx http-server
```

## 실행 영상
[![Video Label](http://img.youtube.com/vi/AM9rDd-U9FY/0.jpg)](https://youtu.be/AM9rDd-U9FY)

## How to play

### **게임 입장 화면**

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/7f23af5d-5bf4-44af-89c9-4b1267c7768b)


### **게임 시작 화면**

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/e93567b1-a1b0-4375-b0e3-434a60b922fb)


### API Docs와 Code Editor

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/2a0eb70c-87cc-48b1-ac66-5ed7408c6209)


- 좌측 하단의 Docs 버튼을 누르면 우주선의 상태를 받아오고 엔진을 조작하는 API 함수에 대한 설명을 제공합니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/ce55fea1-7742-4661-b6f1-a4123faf191f)


- 우측 하단의 Code 버튼을 누르면 코드 에디터가 열립니다. 코드 에디터에 우주선 착륙 알고리즘을 작성할 수 있습니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/de1335da-07b0-4d08-b42b-905630fc6bd5)


- 경계선을 드래그하여 크기를 조절할 수 있습니다.

### Code Apply

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/f237d303-8597-46c1-b7d1-de42fb01fe87)


- Apply 버튼을 클릭해 코드 에디터에 작성한 코드를 우주선에 적용할 수 있습니다. 이후부터 우주선은 적용된 알고리즘에 따라 제어됩니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/f89bf930-7275-4884-bfa1-f50fb17924c2)


### 게임 결과 화면

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/d0ea4bb1-24f7-40d7-b151-4c36db827e61)

- 착륙 속도 12.0 MPH, 착륙 각도 11.0° 미만일 때 착륙으로 간주합니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/f9507fec-5df0-488a-a243-7ddc27303c43)


- 초과한 상태로 지면에 닿는다면 추락으로 간주합니다. 추락일 경우에는 점수가 음수로 환산되어 리더보드에 등록됩니다. 


## API Function Docs
게임 내에서 우주선 착륙 알고리즘을 작성 할 때 사용 가능한 함수들에 대한 설명입니다.[API Docs](https://github.com/yhcho0405/CodeMos/wiki/CodeMos-API-Documentation)

### Tip

1. JS ES6의 모든 문법을 사용해 CodeMos 우주선 알고리즘을 작성할 수 있습니다.
2. 알고리즘이 작동하지 않는다면 코드를 잘못 짠게 아닐지 고민해 보세요.
3. 버그가 발견되었다면 이스터에그입니다.


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


## 기술 스택

<img width="481" alt="image" src="https://github.com/yhcho0405/CodeMos/assets/52823519/f8c8e058-3236-4a8b-9e89-30084cbcf021">


## Reference

- https://github.com/ehmorris/lunar-lander
- https://github.com/ajaxorg/ace

## License

This project is licensed under the MIT License
