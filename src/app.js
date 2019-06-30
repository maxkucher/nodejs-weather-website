const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();


const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Forecast',
        name: 'Max Kucher'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Max Kucher'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Max Kucher'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if (!error) {
            forecast(latitude, longitude, (error, {summary, precipProbability, currentTemperature}) => {
                if (!error) {
                    res.send({summary, precipProbability, currentTemperature})
                } else {
                    res.send({error: 'Cannot fetch weather for this location'})
                }
            })
        } else {
            res.send({
                error: 'Invalid location'
            })
        }
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404help', {
        title: 'Help page not found',
        name: 'Max Kucher'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Max Kucher'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});