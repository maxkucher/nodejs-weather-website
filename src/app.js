const path = require('path');
const express = require('express');
const hbs = require('hbs');


const app = express();


const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
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
    res.send({
        forecast: 'forecast',
        location: 'location'
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