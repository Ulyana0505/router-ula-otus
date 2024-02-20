import { app } from '../src/app'

describe('app', () => {
    document.body.innerHTML = `        
    <div class="menu">
        <a href="/contacts/me">Contacts/Me</a>
    </div>
    <div id="app"></div>`

    it('test app', () => {
        app()
        expect(document.title).toEqual('Главная')

        const a = document.querySelector('a') as HTMLAnchorElement
        a.click()
        const href = a.getAttribute('href')
        expect(href).toEqual('/contacts/me')
    })
})
