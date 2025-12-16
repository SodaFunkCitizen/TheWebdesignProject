// load express
const express = require('express');
// load handlebars
const exphbs = require('express-handlebars');

// instantiate express
const app = express();

// configure express to use handlebars as templating engine
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    // use this layout by default - if you have different layout
    // for say home page - you can toggle this in your code
    defaultLayout: 'default',
    // set location of layouts
    layoutsDir: 'views/layouts',
    // set location of partials - header, footer, etc
    partialsDir: 'views/partials',
  })
);
// set the view engine to handlesbards
app.set('view engine', 'hbs');
// where to find all of the view
app.set('views',  'views');
// where to find static files - css, images, js
app.use(express.static('public'));

// home page or home route
app.get('/', (req, res) => {

  // set active for navigation
  state={home:true ,shop:false}
  // set specifics for <head>
  head={title: "Home - Week 1"}
  // pass object to to render in "index"
  res.render('index', {state, head});
  // send this to terminal where node app is running
  console.log('home')

});

// contact route
app.get('/contact', (req, res) => {
    state={contact : true}
    head={title:"Contact"}
    res.render('contact', { state, head});
    console.log('contact')
  });

// about route
app.get('/about', (req, res) => {
    state={contact : true}
    head={title:"About"}
    res.render('about', { state, head});
    console.log('about')
  });
// albums 
app.get('/shop', (req, res) => {
    state={home:false ,shop:true}
    head={title:"Shop"}
    res.render('shop', { state, head});
    console.log('shop')
  });


app.get('/thankyou', (req, res) => {
    state={contact : true}
    head={title:"ThankYou"}
    res.render('thankyou', { state, head});
    console.log('thankyou')
  });
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});