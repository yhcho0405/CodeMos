import {
  CRASH_VELOCITY,
  CRASH_ANGLE,
  VELOCITY_MULTIPLIER,
} from "./constants.js";
import { progress } from "./helpers.js";

export const landingScoreDescription = (score) =>
    score == 100
    ? "완벽한 착륙!!!"    
    :score >= 99.9
    ? "완벽에 가까운 착륙!!"    
    :score >= 99.8
    ? "완벽에 근접한 착륙!"
    :score >= 99.7
    ? "완벽에 가까울 뻔한 착륙"
    :score >= 99.6
    ? "거의 완벽할 뻔한 착륙"
    :score >= 99.5
    ? "아쉽게 완벽하지 못한 착륙"
    : score >= 99
    ? "매우 부드러운 착륙"
    : score >= 95
    ? "부드러운 착륙"
    : score >= 90
    ? "훌륭한 착륙"
    : score >= 85
    ? "좋은 착륙"
    : score >= 80
    ? "나쁘지 않은 착륙"
    : score >= 75
    ? "좋을 뻔한 착륙"
    : score >= 70
    ? "그럭저럭 착륙"
    : score >= 65
    ? "어찌저찌 착륙"
    : score >= 60
    ? "어쩌다보니 착륙"
    : score >= 55
    ? "휀다가 휘어버린 착륙"
    : score >= 55
    ? "거의 박살난 착륙"
    : score >= 40
    ? "사실상 추락"
    : score >= 30
    ? "착륙 후 조종사 사망"
    : "끔찍한 착륙";

export const crashScoreDescription = (score) =>
    score >= 100
    ? "개개개개개개객개개개박살"
    : score >= 95
    ? "개개개개개객개개박살"
    : score >= 90
    ? "개개개개개개박살"
    : score >= 85
    ? "개개개개박살"
    : score >= 80
    ? "개박살"
    : score >= 75
    ? "박살"
    : score >= 70
    ? "박살"
    : score >= 65
    ? "박살"
    : score >= 60
    ? "박살"
    : score >= 50
    ? "그냥 박살"
    : score >= 40
    ? "우주선 반토막"
    : score >= 30
    ? "덜 부드럽게 충돌"
    : score >= 20
    ? "부드럽게 충돌"
    : score >= 10
    ? "안타까운 충돌"
    : "아쉽게도 충돌";

export const destroyedDescription = () => {
  const remarks = [
    "That rock came out of nowhere!",
    "It looks like you’re out of fuel… oh and you blew up",
    "So that was an asteroid",
    "Weird, I can’t find the lander…",
    "Try to avoid the space rocks next time",
    "Slamming into rocks is not great for the lander",
    "Sometimes asteroids just happen",
    "Better to have flown and been destroyed by an asteroid than never to have flown at all",
  ];
  return remarks[Math.floor(Math.random() * remarks.length)];
};

// Perfect land:
// angle: 0
// speed: 0
//
// Worst possible landing:
// angle: 11
// speed: 12
export const scoreLanding = (angle, speed) => {
  const bestPossibleCombo = 0; // max : 100
  const worstPossibleCombo = CRASH_ANGLE + CRASH_VELOCITY * VELOCITY_MULTIPLIER;
  return (
    progress(
      worstPossibleCombo,
      bestPossibleCombo,
      angle + speed * VELOCITY_MULTIPLIER
    ) * 100
  );
};

export const scoreCrash = (angle, speed) => {
  const bestPossibleCombo = 900;
  const worstPossibleCombo = Math.min(
    CRASH_VELOCITY * VELOCITY_MULTIPLIER,
    CRASH_ANGLE
  );
  return (
    progress(
      worstPossibleCombo,
      bestPossibleCombo,
      angle + speed * VELOCITY_MULTIPLIER
    ) * 100
  );
};
