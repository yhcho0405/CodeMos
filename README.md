![header](https://capsule-render.vercel.app/api?type=waving&color=0:000,40:02071e,80:030928&height=300&section=header&text=CodeMos&fontSize=90&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Try%20writing%20an%20algorithm%20that%20can%20land%20safely%20in%20any%20situation.&descAlignY=51&descAlign=50)

# CodeMos - 우주선 착륙 게임

CodeMos는 추락하는 우주선 :rocket: 을 직접 코드를 작성하여 안전하게 착륙시키는 게임입니다.

어떠한 상황에서도 안전하게 착륙하는 알고리즘을 작성해보세요!

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Play](#how-to-play)
    1. [게임 입장 화면](#게임-입장-화면)
    2. [게임 시작 화면](#게임-시작-화면)
    3. [Docs와 Code Editor](#docs와-code-editor)
    4. [Code Apply](#code-apply)
    5. [게임 결과 화면](#게임-결과-화면)
3. [Reference](#reference)
4. [License](#license)

## Getting Started

- Web Link
    - http://codemos.site/
- Prerequisites
    - Chromium 기반 웹 브라우저

## Running on LocalHost

```bash
$> npx http-server
```

## 실행 영상
[![Video Label](http://img.youtube.com/vi/AM9rDd-U9FY/0.jpg)](https://youtu.be/AM9rDd-U9FY)


## API Documentation Wiki
[API Docs](https://github.com/yhcho0405/CodeMos/wiki/CodeMos-API-Documentation)

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


## Reference

- https://github.com/ehmorris/lunar-lander
- https://github.com/ajaxorg/ace

## License

This project is licensed under the MIT License
