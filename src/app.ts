import { Router } from './router'
import { pageAbout, pageContact, pageInfo, pageMain } from './pages'

export function app() {
    const router = Router()
    router.on('/', pageMain)
    router.on('/about', pageAbout)
    router.on(/\/info/, pageInfo)
    router.on((path: string) => path.startsWith('/contact'), pageContact)
    router.go(location.pathname)
}
