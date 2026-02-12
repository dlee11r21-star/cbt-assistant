import beepSound from '../../assets/sounds/alert-beep.wav';

let audioInstance = null;

export function playBeep() {
  if (!audioInstance) {
    audioInstance = new Audio(beepSound);
  }
  audioInstance.currentTime = 0;
  audioInstance.play();
}