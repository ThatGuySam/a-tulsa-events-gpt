import process from 'node:process'

import { DOMParser, parseHTML } from 'linkedom'

const eventbriteTulsaUrl = 'https://www.eventbrite.com/d/ok--tulsa/all/'
const visitTulsaRSSUrl = 'https://www.visittulsa.com/event/rss/'

async function getLdJSON ( url: string ) {
    const rawHtml = await fetch( url ).then( res => res.text() )

    const { document } = parseHTML( rawHtml )

    const ldJsonScripts = document.querySelectorAll( 'script[type="application/ld+json"]' )

    return Array.from( ldJsonScripts ).map( ( ldJsonScript ) => {
        const json = JSON.parse( ldJsonScript.textContent || '' )

        return json
    } )
}

async function getRSS ( url: string ) {
    const rawXml = await fetch( url ).then( res => res.text() )

    const document = new DOMParser().parseFromString( rawXml, 'text/xml' )

    console.log( { document } )

    // const items = document.querySelectorAll( 'item' )

    // return Array.from( items ).map( ( item ) => {
    //     const title = item.querySelector( 'title' )?.textContent || ''
    //     const link = item.querySelector( 'link' )?.textContent || ''

    //     return {
    //         title,
    //         link
    //     }
    // })
}

;( async () => {
    const ldJson = await getLdJSON( eventbriteTulsaUrl )

    await getRSS( visitTulsaRSSUrl )

    console.log( { ldJson } )

    process.exit( 0 )
} )()
