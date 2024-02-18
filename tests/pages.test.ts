import { pageMain, pageAbout, pageContact, pageInfo } from "../src/pages";
import { render } from "../src/render";
import { RouteParam } from "../src/types";

describe('pages', () => {
    document.body.innerHTML = `<div id="app"></div>`;

    it('pageMain test', () => {
        pageMain();

        expect(document.title).toEqual("Главная")
    });

    it('pageAbout test', () => {
        pageAbout();

        expect(document.title).toEqual("О сайте")
    });

    it('pageContact test', () => {
        pageContact({ current: "/contacts/me", prev: "/about" });

        expect(document.title).toEqual("Контакты")
    });

    it('pageInfo test', () => {
        pageInfo();

        expect(document.title).toEqual("Информация")
    });
})
