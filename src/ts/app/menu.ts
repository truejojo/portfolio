import { getDomElem, toggleClass } from '../utilies/dom-helper';

export const mainMenu = (): void => {
  const $toggleMenu = getDomElem('.toggle-menu');
  const $toggle = getDomElem('.toggle');
  const $siteNav = getDomElem('.site-nav');
  const $list = getDomElem('.site-nav .list');

  $toggleMenu.addEventListener('click', evt => {
    evt.preventDefault();
    
    toggleClass($toggle, 'open');
    toggleClass($siteNav, 'open');
  });
  
  $list.addEventListener('click', evt => {
    const target = evt.target as HTMLElement;
    
    if (target.matches('a')) {
      toggleClass($toggle, 'open');
      toggleClass($siteNav, 'open');
    }
  });
};
