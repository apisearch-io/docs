import Cookies from "js-cookie";

const COOKIE_NAME = 'apisearch_docs_last_selected_lang';
const TARGET_CLASS_SELECTOR = '.c-languageSelector__link';
const ACTIVE_CLASS_NAME = 'c-languageSelector__link--active';
const ACTIVE_CLASS_SELECTOR = '.c-languageSelector__link--active';

class LanguageSelector {
    /**
     * Constructor.
     */
    constructor() {
        let availableLanguages = document
            .querySelectorAll(TARGET_CLASS_SELECTOR)
        ;

        if (!availableLanguages) {
            return;
        }

        this.availableLanguages = availableLanguages;

        this.selectDefaultLanguage();
        this.addDOMEventListeners();
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

        /**
         * Toggle code blocks in the dom
         */
        this.toggleCodeBlocks(language);
    }

    /**
     * Add event listeners on the language selectors
     */
    addDOMEventListeners() {
        this.availableLanguages.forEach(element => {
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
        if (
            this.checkInAvailableLanguages(lastSelectedLanguage)
        ) {
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

    /**
     * Open and close code blocks on the dom
     * depending on the selectedLanguage
     */
    toggleCodeBlocks(selectedLanguage) {
        this.availableLanguages.forEach(element => {
            let elementLanguage = element.getAttribute('data-lang');
            if (elementLanguage === selectedLanguage) {
                document
                    .querySelectorAll(`.language-${elementLanguage}`)
                    .forEach(block => {
                        block.parentElement.style.display = 'block';
                    })
            } else {
                document
                    .querySelectorAll(`.language-${elementLanguage}`)
                    .forEach(block => {
                        block.parentElement.style.display = 'none';
                    });
            }
        });
    }

    /**
     * Checks if given language exists
     * in the available languages list
     */
    checkInAvailableLanguages(givenLanguage) {
        let languages = [];
        this.availableLanguages.forEach(element => {
            languages.push(element.getAttribute('data-lang'))
        });

        return languages.some(language => language === givenLanguage);
    }
}

export default LanguageSelector;