
"use strict";

const Nightmare = require('nightmare');

process.on('unhandledRejection', err => console.error(err.stack))

exports.run = async list => {

    const allMarkers = []



    for (let i = 0; i < list.length; ++i) {
        const cUrl = list[i]
        const nightmare = Nightmare({ show: true, openDevTools: {
            mode: 'detach'
          }
        })

        console.log(`Scraping ${cUrl}`)
        try {
            // Get the icons object form the page
            //
            // {
            //  "Sydney": [...],
            //  "Foo": [...]
            // }
            //
            const result = await nightmare
              .goto(cUrl)
              .evaluate(() => {
                  debugger;

                  return window.locations
              })
              .end()

              debugger
            Object.keys(result).forEach(c => {
                allMarkers.push.apply(allMarkers, result[c])
            })

        } catch (err) {
            console.error(err.stack)
        }
    }

    return allMarkers
}
