import Cookies from "js-cookie";

const COOKIE_NAME = 'apisearch_docs_last_selected_lang';
const TARGET_CLASS_NAME = '.c-languageSelector__link';
const ACTIVE_CLASS_NAME = 'c-languageSelector__link--active';
const ACTIVE_CLASS_SELECTOR = '.c-languageSelector__link--active';

class LanguageSelector {
    /**
     * Constructor.
     */
    constructor() {
        let availableLanguages = document
            .querySelectorAll(TARGET_CLASS_NAME)
        ;

        if (!availableLanguages) {
            return;
        }

        this.addDOMEventListeners(availableLanguages);
        this.selectDefaultLanguage();
    }

    /**
     * Select language on the dom
     */
    select(language) {
        /**
         * Remove current active language if exists
         */
        let activeElement = document.querySelector(ACTIVE_CLASS_SELECTOR);
        if (activeElement) {
            activeElement
                .classList
                .remove(ACTIVE_CLASS_NAME)
            ;
        }

        /**
         * Add new active language
         */
        document
            .querySelector(`[data-lang=${language}]`)
            .classList
            .add(ACTIVE_CLASS_NAME)
        ;

        /**
         * Set current language on cookies jar
         */
        Cookies.set(COOKIE_NAME, language);
    }

    /**
     * Add event listeners on the language selectors
     */
    addDOMEventListeners(availableLanguages) {
        availableLanguages.forEach(element => {
            element.addEventListener('click', (e) => {
                let selectedLanguage = e
                    .target
                    .getAttribute('data-lang')
                ;

                /**
                 * Select language
                 */
                this.select(selectedLanguage);
            })
        })
    }

    /**
     * Get the default language.
     */
    selectDefaultLanguage() {
        /**
         * Checks if there is a previous language
         * stored in the cookie jar. If exists, gets it.
         */
        let lastSelectedLanguage = Cookies.get(COOKIE_NAME);
        if (lastSelectedLanguage) {
            this.select(lastSelectedLanguage);
            return;
        }

        /**
         * Checks if there is any language available.
         */
        let firstAvailableLanguage = this.availableLanguages[0];
        if (firstAvailableLanguage) {
            this.select(
                firstAvailableLanguage.getAttribute('data-lang')
            );
        }
    }
}

export default LanguageSelector;