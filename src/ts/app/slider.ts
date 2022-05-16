import { getDomElem, getDomElems } from '../utilies/dom-helper';

export const slider = (): void => {
  const $slider = getDomElem('.slider');
  const $slides = getDomElems('.slide');

  $slider.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.matches('.next') || target.matches('.prev')) {
      const $currentSlide = $slides.filter(
        slide => !slide.classList.contains('none')
      );

      $currentSlide[0].classList.add('none');

      const $siblingSlide = target.matches('.prev')
        ? $currentSlide[0].previousElementSibling
        : $currentSlide[0].nextElementSibling;

      $siblingSlide.classList.contains('slide')
        ? $siblingSlide.classList.remove('none')
        : target.matches('.prev')
        ? $slides[$slides.length - 1].classList.remove('none')
        : $slides[0].classList.remove('none');
    }
  });
};
