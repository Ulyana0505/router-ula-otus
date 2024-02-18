import { routeTest, routePath, Router } from "../src/router";
import { pageMain } from "../src/pages";

describe('router', () => {
    it('routeTest', () => {
        // case "string"
        expect(routeTest("rule", "2")).toEqual(false);
        expect(routeTest("2", "2")).toEqual(true);

        // case "function"
        expect(routeTest((() => true), "2")).toEqual(true);

        // default 
        expect(routeTest(/e/, "2")).toEqual(false);
        expect(routeTest(/2/, "2")).toEqual(true);
    });

    it('routePath', async() => {
        expect(await routePath("current", {path: "routhPath"}, {route: null, path: "path"})).toEqual({ route: { path: 'routhPath' }, path: 'current' });
    });

    it('Router', () => {
        document.body.innerHTML = `
        <div class="menu">
            <a href="/info">Info</a>
        </div>
        <div id="app"></div>`;
        const router = Router();

        router.on("/", pageMain);
        expect(router.getRoutes().length).toEqual(1);

        router.add({path: "path"});
        expect(router.getRoutes().length).toEqual(2);

        router.remove({path: "path"});
        expect(router.getRoutes().length).toEqual(1);

        router.go(location.pathname);
        expect(router.getRoutes().length).toEqual(1);

        // test handlerClick
        const a = document.querySelector("a") as HTMLAnchorElement;
        a.click();
        const href = a.getAttribute("href");
        expect(href).toEqual("/info");
    });
})
