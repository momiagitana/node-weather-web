const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'weather',
        name: 'ariel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'ariel'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'if you need help feel free to contact me',
        title: 'help',
        name: 'ariel'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    debugger

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({ error })
        }
        
        const {long, lat, fullName} = data
        
        forecast(lat, long, (error, response) => {
            
            if(error){
                return res.send({
                    error
                })
            }
            
            console.log('name: ' + fullName)
            console.log(response) 
            res.send({
                address: req.query.address,
                actualLocation: fullName,
                forecast: response
            })
        })
    
    })

})




app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'help page not found',
        title: 'this page does not exist',
        name: 'ariel'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        helpMsg: '404 page not found',
        title: 'this page does not exist',
        name: 'ariel'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port + '.')
})