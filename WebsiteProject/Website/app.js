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

const products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 39.99 },
];

app.get('/', (req, res) => {
  res.render('index', { title: "Home" });
});

app.get('/shop', (req, res) => {
  res.render('shop', { title: "Shop", products });
});

app.get('/cart', (req, res) => {
  res.render('cart', { title: "Your Cart" });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
