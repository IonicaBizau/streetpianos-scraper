"use strict";

const puppeteer = require('puppeteer');

process.on('unhandledRejection', err => console.error(err.stack))

exports.run = async list => {

    const browser = await puppeteer.launch()
        , page = await browser.newPage()
        , allMarkers = []

    for (let i = 0; i < list.length; ++i) {
        const cUrl = list[i]
        console.error(`Scraping ${cUrl}`)
        try {
            await page.goto(cUrl)

            // Get the icons object form the page
            //
            // {
            //  "Sydney": [...],
            //  "Foo": [...]
            // }
            //
            const execContext = page.mainFrame().executionContext()
                , result = await execContext.evaluate(() => {
                        const commonMetadata = c => {
                            return {
                                year: location.href.match(/(\d\d\d\d)/)[1]
                              , type: "Play_me_I_m_yours"
                            }
                        }
                        if (typeof location_points === "object") {
                            const res = {}
                            Object.keys(location_points).forEach(name => {
                              res[name] = location_points[name].map((c, i) => {
                                 c = c.split(",")
                                 c = { lat: c[0], lng: c[1] }
                                 c = Object.assign(c, {
                                     description: location_details[name][i]
                                   , source: location.href
                                 }, commonMetadata(c))
                                 return c;
                              })
                            })
                            const allMarkers = []
                            Object.keys(res).forEach(c => {
                                allMarkers.push.apply(allMarkers, res[c])
                            })
                            return allMarkers
                        }
                        return [...markers].filter(Boolean).map(c => (Object.assign({
                            source: location.href
                          , lat: c.getPosition().lat()
                          , lng: c.getPosition().lng()
                          , description: c.getTitle()
                        }, commonMetadata(c))))
                  })

            console.error(`Found ${result.length} pianos`)
            allMarkers.push.apply(allMarkers, result)

            await page.screenshot({path: 'example.png'});
        } catch (e) {
            console.error(e.stack)
        }
    }

    debugger
    await browser.close();
    return allMarkers
}
