const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiemluZ21hbiIsImEiOiJjbDA1ZHhtdzQwMm4xM3FyMmQzdTY2d2YyIn0.qUGXZjpJsrul77ANKKMfsg'

    request({url, json: true}, (error, {body}) => {
        // console.log(response.body)
        
        if(error){
            callback('cannot connect to the geomaping api')// undefined as second arg
        } else if (!body.features[0]) {
            callback('unable to find location')// undefined as second arg
        } else {
            const data = {
                fullName: body.features[0].place_name,
                long: body.features[0].center[0],
                lat: body.features[0].center[1]
            }
            callback(undefined, data)
        }
    })

}


module.exports = geocode