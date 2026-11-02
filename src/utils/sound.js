import hoverSound from '../Audio/hover_card.wav';
import navigationSound from '../Audio/click_navigation.wav';

function playSound(source) {
  const audio = new Audio(source);
  audio.volume = 0.45;

  const playback = audio.play();
  if (playback) playback.catch(() => {});
}

function playHoverSound() {
  playSound(hoverSound);
}

function playNavigationSound() {
  playSound(navigationSound);
}

function soundProps(isNavigation = true) {
  return {
    ...(isNavigation ? { onClick: playNavigationSound } : {}),
  };
}

function cardSoundProps() {
  return {
    onMouseEnter: playHoverSound,
    onFocus: playHoverSound,
    onClick: playNavigationSound,
  };
}

export {
  cardSoundProps,
  playHoverSound,
  playNavigationSound,
  soundProps,
};
