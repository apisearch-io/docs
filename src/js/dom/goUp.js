/**
 * Go Up button
 */
export const goUpAction = () => window
    .addEventListener('scroll', () => {
        let goUpButton = document.querySelector('#goUpButton');

        if (window.pageYOffset > 500) {
            goUpButton.classList.add('d-block');
        } else {
            goUpButton.classList.remove('d-block');
        }
    });

export default goUpAction;