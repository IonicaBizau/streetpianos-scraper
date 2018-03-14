let pianos = require("./pianos")

pianos = pianos.map(c => {
    const point = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [
                c.lng,
                c.lat
            ]
        }
    }

    delete c.lat
    delete c.lng
    point.properties = c

    return point
})

console.log(JSON.stringify(pianos))
