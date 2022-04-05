const request = require('request')


const forecast = (long, lat, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=b02c847e63d3de575106f932fb52e5c1&query=' + long + ',' + lat

    request({url, json: true}, (error, {body}) => {
        // console.log(body)
        if (error) {
            callback('cannot connect to the weather api')
        } else if (body.error) {
            callback('unable to find location')
        } else {
            callback(undefined, 'degrees: ' + body.current.temperature + ' feels like: ' + body.current.feelslike + ' wind speed is: ' + body.current.wind_speed)
    
        }
    })
}

module.exports = forecast




