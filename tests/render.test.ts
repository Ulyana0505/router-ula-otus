import { render } from "../src/render";

describe('render', () => {
    document.body.innerHTML = `<div id="app"></div>`;

    it('render test, render about page', () => {
        render("О сайте", `<h2>О сайте</h2>`);

        expect(document.title).toEqual("О сайте");
        expect(document.getElementById("app")!.innerHTML).toEqual(`<h2>О сайте</h2>`);
    });

    it('render test, render info page', () => {
        render("Информация", `<h2>Информация</h2>`);

        expect(document.title).toEqual("Информация");
        expect(document.getElementById("app")!.innerHTML).toEqual(`<h2>Информация</h2>`);
    });
})

