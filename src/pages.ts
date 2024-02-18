import { render } from "./render";
import { RouteParam } from "./types";

export async function pageMain() {
  render("Главная", `<h2>Главная</h2>`);
}

export async function pageAbout() {
  render("О сайте", `<h2>О сайте</h2>`);
}

export async function pageInfo() {
  render("Информация", `<h2>Информация</h2>`);
}

export async function pageContact(p: RouteParam) {
  render("Контакты", `<h2>Контакты</h2><p>${JSON.stringify(p)}</p>`);
}
