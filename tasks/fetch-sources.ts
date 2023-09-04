import {DOMParser, parseHTML} from 'linkedom'

const eventbriteTulsaUrl = 'https://www.eventbrite.com/d/ok--tulsa/all/'


async function getLdJSON( url: string ) {
    const rawHtml = await fetch( url ).then( res => res.text() )

    const { document } = parseHTML( rawHtml )

    const ldJsonScripts = document.querySelectorAll( 'script[type="application/ld+json"]' )

    return Array.from( ldJsonScripts ).map( ( ldJsonScript ) => {
        const json = JSON.parse( ldJsonScript.textContent || '' )

        return json
    })
}

;(async () => {
    

    const ldJson = await getLdJSON( eventbriteTulsaUrl )

    console.log({ ldJson })

    process.exit( 0 )
})()