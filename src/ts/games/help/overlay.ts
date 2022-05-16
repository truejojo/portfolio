import { getDomElem, toggleClass } from '../../utilies/dom-helper';

export const showOverlay = (): void => {
  const $overlay = getDomElem('.overlay');
  const $changeMode = getDomElem('.change-mode');

  const mode = {
    light: 'light mode',
    dark: 'dark mode',
  };

  $changeMode.addEventListener('click', () => {
    toggleClass($overlay, 'dark-mode');
    toggleClass($overlay, 'light-mode');
    $changeMode.textContent =
      $changeMode.textContent === mode['light'] ? mode['dark'] : mode['light'];
  });
};
