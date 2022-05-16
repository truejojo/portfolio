import './style.scss';
import { mainMenu } from './ts/app/menu';
import { getDomElem } from './ts/utilies/dom-helper';
import johannes from './img/johannes.jpg';
import kids from './img/kids.jpg';
import writingDesk from './img/writing-desk.jpg';

mainMenu();

const $johannes = getDomElem('.portfolio-img');
const $family = getDomElem('.family-img');
const $table = getDomElem('.projects-bg-img');
$johannes.setAttribute('src', johannes);
$family.setAttribute('src', kids);
$table.style.backgroundImage = `url(${writingDesk})`;