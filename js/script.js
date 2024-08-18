require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill'; // хотя такого файла у нас вообще нет в проекте. берутся из node-modules. Т.к. берется именно npm-пакет, мы не прописываем from.  

// так же можно делать, например, с slick-slider. Скачиваем как npm-пакет, а потом прописываем импорт. Чтобы не подключать другие скрипты и был один js-файл

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from'./modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => { // дожидаемся пока загрузится весь контент страницы, прежде чем загрузить скрипт
    // порядок подключения не важен - главное, чтобы совпадали названия переменных и подключаемых модулей

    // чтобы модальное окно автоматически открывалось на сайте спустя какое-то время
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000); // 30 s

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2024-05-11');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});