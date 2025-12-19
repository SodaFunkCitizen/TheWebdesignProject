const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: 'views/layouts',
  })
);

app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static('public'));

//Why code my products like this? Because it makes my website code more changable for
//any e commerces website i could need to do in future
const products = [
  { id: 1, name: "Skulls Boxset", price: 29.99 ,image: "/Images/skulls.jpg"},
  { id: 2, name: "Adeptus Pin", price: 19.99 ,image: "/Images/pin.jpg"},
  { id: 3, name: "Guilliman", price: 39.99 ,image: "/Images/Ultrmare.png"},
  { id: 3, name: "ima", price: 69.99 ,image: "/images/Images.jpg"},
  { id: 3, name: "Killian Ashgate", price: 59.99 ,image: "/Images/KillianAshgate.jpg"},
  { id: 3, name: "Leviathan BoxSet", price: 109.99 ,image: "/Images/leviathan.jpg"},
];

app.get('/', (req, res) => {
  res.render('index', { title: "Home" });
});

app.get('/shop', (req, res) => {
  res.render('shop', { title: "Shop", products });
});
app.get('/about', (req, res) => {
    const state = { about: true };
    const head = { title: "About Us" };
    res.render('about', { state, head });
});

app.get('/cart', (req, res) => {
  res.render('cart', { title: "Your Cart" });
});

app.get('/checkout', (req, res) => {
  res.render('checkout', { title: "Checkout" });
});

app.get('/login', (req, res) => {
  head = { title: "Login" };
  res.render('login', { head });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
