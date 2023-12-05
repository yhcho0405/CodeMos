![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=CodeMos&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Try%20writing%20an%20algorithm%20that%20can%20land%20safely%20in%20any%20situation.&descAlignY=51&descAlign=50)


## 실행 영상
[![Video Label](http://img.youtube.com/vi/AM9rDd-U9FY/0.jpg)](https://youtu.be/AM9rDd-U9FY)

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

## 실행 영상

## Running on LocalHost

```bash
$> npx http-server
```

## How to play

### **게임 입장 화면**

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/8065b433-dc1d-4c07-b844-375808a0131d)


게임에 입장하면 다음과 같은 화면이 뜹니다.

게임 시작 버튼을 누르면 게임을 시작하는 화면으로 이동합니다.

게임 설명 버튼을 누르면 게임을 진행하는 방법을 소개합니다.

### **게임 시작 화면**

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/f0553d8a-0777-41b8-92ba-560ade24ce2a)


게임 시작 버튼을 누르면 다음과 같이 우주선을 조작하는 튜토리얼이 주어집니다.

방향키로 우주선을 조작하면 모두 체크 표시되어 다음 게임으로 이어집니다.

### Docs와 Code Editor

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/585f9bcf-fb65-4c4a-8e7c-b98d6b8d8740)


왼쪽 아래의 Docs 버튼을 누르면 해당 게임을 진행하기 위해 제공되는 함수에 대한 설명을 제공합니다.

이를 통해 우주선을 제어하는 알고리즘 코드를 작성하는 방법을 익힐 수 있습니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/598e3505-31a6-47f5-8995-d9f4144d4649)


오른쪽 아래의 Code 버튼을 누르면 코드 에디터가 제공됩니다. 

해당 에디터에 우주선을 제어하는 코드를 작성합니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/197062fb-773a-4e20-9922-82b2e7657e0d)


Docs 화면과 Code 파일을 둘 다 동시에 화면에 펼칠 수 있습니다.

둘 사이의 경계선을 클릭하여 크기를 조절하면 크기에 맞추어서 조절됩니다.

### Code Apply

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/7f419c91-cd35-4ad4-a940-954db9317c6d)


Apply 버튼을 누르면 작성된 코드는 우주선에 적용되어 우주선은 코드 알고리즘에 따라 제어됩니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/cc13b331-ff0a-4dee-97e0-70c4234b923e)


게임 도중에도 작성한 코드를 확인할 수 있습니다.

### 게임 결과 화면

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/230b579b-84d2-41e7-b542-07cbd42123e1)


알고리즘 코드에 의해 제어된 우주선이 속도, 각도가 안정된 범위에 맞게 지평선에 착륙하면 성공합니다.

![image](https://github.com/yhcho0405/CodeMos/assets/49319275/d29625e1-3f8d-441d-8025-7cdcaa669f4e)


우주선의 속도, 각도가 범위에 넘어간 채로 지평선에 착륙하게 되면 충돌 판정으로 우주선이 폭발합니다. 

## Reference

- https://github.com/ehmorris/lunar-lander
- https://github.com/ajaxorg/ace

## License

This project is licensed under the MIT License
