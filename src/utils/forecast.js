const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/74e64910050ce03a488e8529c1856772/${longitude},${latitude}`;
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the server', undefined)
        } else if (body.error) {
            callback('Invalid request', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                precipProbability: body.currently.precipProbability,
                currentTemperature: body.currently.temperature
            });
        }
    });
};

module.exports = forecast;