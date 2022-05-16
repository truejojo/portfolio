export const getDomElem = (elem: string): HTMLElement =>
  document.querySelector(elem);

export const getDomElems = (elem: string): HTMLElement[] =>
  Array.from(document.querySelectorAll(elem));

export const createElem = (elem: string): HTMLElement =>
  document.createElement(elem);

export const createElemWithClass = (
  elem: string,
  ...classNames: string[]
): HTMLElement => {
  const newElem = createElem(elem);
  addClass(newElem, ...classNames);
  return newElem;
};

export const toggleClass = (elem: HTMLElement, className: string): void => {
  elem.classList.toggle(className);
};

export const addClass = (elem: HTMLElement, ...classNames: string[]): void => {
  for(const className of classNames) {
    elem.classList.add(className);
  }
};

export const removeClass = (elem: HTMLElement, className: string): void => {
  elem.classList.remove(className);
};

export const setTextContent = (elem: HTMLElement, text: string): void => {
  elem.textContent = text;
};

export const setAttributeElem = (
  elem: HTMLElement,
  attrTyp: string,
  attrName: string
): void => {
  elem.setAttribute(attrTyp, attrName);
};

export const appendElem = (parent: HTMLElement, child: HTMLElement): void => {
  parent.appendChild(child);
};

export const hasChildElem = (elem: HTMLElement): boolean =>
  elem.hasChildNodes();

export const removeFirstChild = (elem: HTMLElement): void => {
  elem.firstChild.remove();
};

export const removeAllChildNodes = (parent: HTMLElement): void => {
  while (parent.firstChild) {
    removeFirstChild(parent);
  }
};

export const addEventListenerOnElem = (
  elem: HTMLElement,
  mouseEvent: string,
  callback: any
): void => {
  elem.addEventListener(mouseEvent, callback);
};

export const removeEventListenerFromElem = (
  elem: HTMLElement,
  event: string,
  callback: any
): void => {
  elem.removeEventListener(event, callback);
};

// Explizit for this project!
export const createBtn = (
  textContent: string,
  callback: Function,
  ...classNames: string[]
): HTMLElement => {
  const btn = createElemWithClass('button', ...classNames);
  setTextContent(btn, textContent);
  addEventListenerOnElem(btn, 'click', callback);
  
  return btn;
};

// Explizit for this project!
export const createLink = (
  textContent: string,
  linkHref: string,
  ...classNames: string[]
): HTMLElement => {
  const link = createElemWithClass('a', ...classNames);
  setTextContent(link, textContent);
  setAttributeElem(link, 'href', linkHref);
  return link;
};
