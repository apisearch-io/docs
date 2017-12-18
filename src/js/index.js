import "../styles/index.sass";

import ui from "./search";

/**
 * Initialize documentation search
 */
ui.init();

/**
 * Close search box if search is empty
 */
document
    .querySelector(".as-simpleSearch__input")
    .addEventListener('input', (e) => {
        if (e.target.value === '') {
            document
                .querySelector('#searchResult')
                .classList
                .add('d-none')
            ;
        }
    });

/**
 * Menu left toggle
 */
document
    .querySelector('#burgerSidebarMenu')
    .addEventListener('click', () => {
        let menu = document.querySelector('#sidebarMenu');

        if (menu.className.indexOf('d-block') === -1) {
            menu.classList.add('d-block');
            menu.classList.remove('d-none');
        } else {
            menu.classList.add('d-none');
            menu.classList.remove('d-block');
        }
    });

/**
 * Go Up button
 */
window
    .addEventListener('scroll', () => {
        let goUpButton = document.querySelector('#goUpButton');

        if (window.pageYOffset > 400) {
            goUpButton.classList.add('d-block');
        } else {
            goUpButton.classList.remove('d-block');
        }
    });