import { getDomElem, addClass } from '../../utilies/dom-helper';
import { showOverlay } from './overlay';
import Battle from '../battle/Battle';
import Memory from '../memory/Memory';
import Retentivity from '../retentivity/Retentivity';
import ControlFormMemory from '../memory/ControlFormMemory';
import ControlFormRetentivity from '../retentivity/ControlFormRetentivity';

export const setUp = () => {
  const $playGame = getDomElem('.play-game');
  const $overlay = getDomElem('.overlay');

  const controlFormMemory = new ControlFormMemory();
  const controlFormRetentivity = new ControlFormRetentivity();
  // const game = $playGame.dataset('game');
  const game = $playGame.getAttribute('data-game');

  switch (game) {
    case 'memory':
      controlFormMemory.setClickEvents();
      break;
    case 'retentivity':
      controlFormRetentivity.setClickEvent();
      break;
    default:
  }

  $playGame.addEventListener('click', async () => {

    switch (game) {
      case 'battle':
        const battle = new Battle();
        await battle.init();
        battle.render();
        showOverlay();
        break;
      case 'memory':
        const pair = controlFormMemory.getPairs();
        const typ = controlFormMemory.getTypes();
        const memory = new Memory(pair, typ);
        memory.render();
        showOverlay();
        break;
      case 'retentivity':
        const value = controlFormRetentivity.getSyllable();
        const retentivity = new Retentivity(value);
        retentivity.render();
        showOverlay();
        break;
      default:
      // code block
    }
    addClass($overlay, 'show-overlay');
  });
};
