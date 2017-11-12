const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use( (req,res,next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`

  console.log( log )
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.')
    }
  })

  next()
})

// app.use( (req,res,next) => {
//   res.render( 'maintenance.hbs' )
// })

app.use( express.static(__dirname + '/public') )

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()

})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello express!</h1>')
  res.render('home.hbs', {
      pageTitle: 'Home',
      name: 'Enric',
      likes: [
        'running',
        'coding',
        'thinking'
      ]
    })
})

app.get('/about', (req,res) => {
  // res.send('About page.')
  res.render('about.hbs', {
    pageTitle: 'About',
    name: 'Enric',
    likes: [
      'running',
      'coding',
      'thinking'
    ]
  })
})

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'this is an error'
  })
})

app.get('/projects', (req,res) => {
  res.render( 'projects.hbs', {
    pageTitle: 'Projects',
  })
})

app.listen(port, () => {
  console.log(`Server up in port ${port}`)
})
