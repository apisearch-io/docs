import "../styles/index.sass";


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