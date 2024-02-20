import { RouteParam, RoutePath, RouterStruct, RouteStruct } from './types'

export function routeTest(rule: RoutePath, current: string) {
    switch (typeof rule) {
        case 'string':
            return rule === current
        case 'function':
            return rule(current)
        default:
            return rule.test(current)
    }
}

type PrevRoute = {
    route: null | RouteStruct
    path: string
}

export async function routePath(
    currentPath: string,
    route: RouteStruct,
    prev: PrevRoute
): Promise<PrevRoute> {
    const param: RouteParam = { current: currentPath, prev: prev.path }
    prev.route && prev.route.onLeave && (await prev.route.onLeave(param))
    route.onBeforeEnter && (await route.onBeforeEnter(param))
    history.pushState(null, '', currentPath)
    route.onEnter && (await route.onEnter(param))
    return { route, path: currentPath }
}

export function Router(): RouterStruct {
    const routes = [] as RouteStruct[]
    let prev = { route: null, path: '' } as PrevRoute

    document.body.addEventListener('click', handlerClick)

    function testUrl(currentPath: string) {
        const route = routes.find((r) => routeTest(r.path, currentPath))
        if (route) {
            routePath(currentPath, route, prev).then((data) => (prev = data))
        }
    }

    function handlerClick(e: Event) {
        const link = e.target as HTMLElement
        if (!link.nodeName.match(/a/i)) return
        const href = link.getAttribute('href')
        if (!href) return
        e.preventDefault()
        testUrl(href)
    }

    return {
        getRoutes() {
            return routes
        },
        on(path: RoutePath, onEnter: (p: RouteParam) => Promise<void>) {
            routes.push({ path, onEnter })
        },
        add(data: RouteStruct) {
            routes.push(data)
        },
        remove(data: RouteStruct) {
            const ind = routes.findIndex(
                (r) => String(r.path) === String(data.path)
            )
            if (ind > -1) {
                routes.splice(ind)
            }
        },
        go(path: string) {
            testUrl(path)
        },
    }
}
