
## CodeMos API Documentation
### INDEX

- [Description](#description)
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

### Description

- You can open and close the API page and code editor with the buttons at the bottom.
- After writing all the code, press the Apply button to inject the landing algorithm into the spaceship.
- Landing is considered successful when the landing speed is below 12.0 MPH and the landing angle is less than 11.0°.
- If you crash, the crash score is converted into a negative score, which can also be listed on the leaderboard.
- You can operate the spaceship with the keyboard arrow keys.
- If keyboard input is detected, it will not be recognized as a score. Only the results of the spaceship operated by the algorithm after pressing the Apply button are stored on the server.
- When the game is over, you will be asked whether to save the code. If you confirm, you can check the code in your personal profile.
- Only one game result per account can be registered on the leaderboard. Choose the code you want to register in your personal profile.

### Tip

1. You can write the CodeMos spaceship algorithm using all the syntax of JS ES6.
2. If the algorithm does not work, consider whether you have written the code incorrectly.
3. If a bug is found, consider it an Easter egg.

### Getting Started

#### main loop

In the CodeMos algorithm, the main loop should be assigned to "newInterval" as follows. If you call setInterval without assigning it to "newInterval," an initialization error may occur. You can modify the interval gap.

```javascript
// TODO: 
newInterval = setInterval(() => {
    // TODO: 
}, 1); // 1ms loop
// TODO: 

// Incorrect Example

setInterval(() => {
    // something something
}, 1);
```

#### Algorithm Writing Example

You can define functions and variables in the global scope. Below is an example of a landing algorithm (not for high scores):

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

```javascript
// Secret~
```

### Get Methods

#### getVelocityX

This function returns the current horizontal velocity of the spaceship as a float.
  - Negative: The spaceship is moving left
  - Positive: The spaceship is moving right

```javascript
getVelocityX()
```

#### getVelocityY

This function returns the current vertical velocity of the spaceship as a float.
  - Negative: The spaceship is moving up
  - Positive: The spaceship is moving down

```javascript
getVelocityY()
```

#### getAngle

This function returns the current angle of the spaceship as a float (-180.0 to +180.0).

```javascript
getAngle()
```

#### getHeight

This function returns the current altitude of the spaceship in feet (ft). The altitude at the landing site is 0ft.

```javascript
getHeight()
```

#### getRotationVelocity

This function returns the current rotational velocity of the spaceship as a float.
  - Negative: The spaceship is rotating counterclockwise
  - Positive: The spaceship is rotating clockwise

```javascript
getRotationVelocity()
```

### Set Methods

#### engineOn

Calling this function activates the main engine of the spaceship.

```javascript
engineOn()
```

#### engineOff

Calling this function stops the main engine of the spaceship.

```javascript
engineOff()
```

#### rotateLeft

Calling this function activates the left thruster of the spaceship (increases the rotational velocity).

```javascript
rotateLeft()
```

#### stopLeftRotation

Calling this function stops the left thruster of the spaceship.

```javascript
stopLeftRotation()
```

#### rotateRight

Calling this function activates the right thruster of the spaceship (decreases the rotational velocity).

```javascript
rotateRight()
```

#### stopRightRotation

Calling this function stops the right

 thruster of the spaceship.

```javascript
stopRightRotation()
```

### Utility Methods

#### logging

This function displays the return values of the Get Methods in the console.

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

1. CodeMos planet is unaffected by any forces other than gravity (4.29158 m/s²).
2. Main engine thrust: Δ10.729 m/s
3. Left and right engine thrust: Δ1.2 rotational velocity/s
4. When landing speed is 0.0 MPH and landing angle is 0.0°, you score 100 points.
