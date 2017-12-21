import burgerAction from "./burger";
import goUpAction from "./goUp";
import LanguageSelector from "./language";

const dom = {};

dom.mount = () => {
    burgerAction();
    goUpAction();
    new LanguageSelector;
};

export default dom;