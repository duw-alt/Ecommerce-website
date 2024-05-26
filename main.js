const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));


// Show page components on default
app.use((req, res, next) => {
  res.locals.hideNavbar = false;
  res.locals.hideFooter = false;
  res.locals.hideArrow = false;
  next();
});

// Data for shop products
const products = [
  { id: 1, name: 'DJI Avata 2', description: 'Description 1', price: 519.99, image: '/images/products/product-1.png' },
  { id: 2, name: 'DJI Goggles 3', description: 'Description 2', price: 29.99, image: '/images/products/product-2.png' },
  { id: 3, name: 'DJI Avata', description: 'Description 3', price: 39.99, image: '/images/products/product-3.png' },
  { id: 4, name: 'DJI Inspire 3', description: 'Description 4', price: 39.99, image: '/images/products/product-4.png' },
  { id: 5, name: 'DJI FPV', description: 'Description 5', price: 39.99, image: '/images/products/product-5.png' },
  { id: 6, name: 'Phantom 4 RTK', description: 'Description 6', price: 39.99, image: '/images/products/product-6.png' },
];

// Data for blog posts
const blogs = [
  {
    id: 1,
    date: '01 May 2023',
    title: 'Exploring the Skies with Drones',
    description: 'Discover how drones are changing the way we capture the world from above.',
    image: '/images/blog-1.webp'
  },
  {
    id: 2,
    date: '03 May 2024',
    title: 'The Future of Drone Technology',
    description: 'A look into the advancements in drone technology and what the future holds.',
    image: '/images/blog-2.webp'
  },
  {
    id: 3,
    date: '05 March 2023',
    title: 'Drone Photography Tips',
    description: 'Essential tips for capturing stunning aerial photos with your drone.'
  },
  {
    id: 4,
    date: '07 May 2024',
    title: 'Safety Guidelines for Drone Pilots',
    description: 'Learn the important safety guidelines every drone pilot should follow.'
  },
  {
    id: 5,
    date: '09 February 2024',
    title: 'Top 10 Drone Models of 2024',
    description: 'A comprehensive review of the top 10 drone models available this year.',
    image: '/images/blog-3.webp'
  },
  {
    id: 6,
    date: '11 May 2024',
    title: 'Innovative Uses for Our Drones',
    description: 'Explore the various innovative uses for drones in different industries.',
    image: '/images/blog-4.webp'
  },
  {
    id: 7,
    date: '13 December 2023',
    title: 'How to Get Started with Drones',
    description: 'A beginner’s guide to getting started with drones, from choosing the right model to mastering basic controls.',
    image: '/images/blog-5.webp'
  },
  {
    id: 8,
    date: '15 June 2024',
    title: 'Drone Racing: The Next Big Sport?',
    description: 'An in-depth look at the rise of drone racing and what makes it an exciting new sport.',
    image: '/images/blog-6.webp'
  }
];

// ! Routes for rendering pages
app.get('/home', (req, res) => res.render('pages/home', { blogs, products}));
app.get('/contact', (req, res) => res.render('pages/contact'));
app.get('/about', (req, res) => res.render('pages/about'));
app.get('/login', (req, res) => res.render('pages/login'));
app.get('/sign-up', (req, res) => res.render('pages/signup'));


// Hide components on dashboard page
app.get('/dashboard', (req, res) => {
  res.render('pages/dashboard', {
    title: 'Dashboard',
    hideNavbar: true,
    hideFooter: true,
    hideArrow: true
  });
});



// Render shop page
app.get('/shop', (req, res) => res.render('pages/shop', { products }));

// Render a single product page
app.get('/shop/product/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(product => product.id === id);

  if (!product) {
    res.status(404).json({ error: 'Product page not found' });
  } else {
    res.render('pages/product', { product });
  }
});


// Render blog page
app.get('/blog', (req, res) => res.render('pages/blog', { blogs }));

// Render a single blog post page
app.get('/blog/:id', (req, res) => {
  const blogId = Number(req.params.id);
  const blog = blogs.find(blog => blog.id === blogId);

  if (!blog) {
    res.status(404).send('Blog not found');
  } else {
    res.json('pages/blogPost', { blog });
  }
});


// * API for managing products through Postman
app.get('/shop/products', (req, res) => {
  res.json(products);
});

app.get('/shop/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(product => product.id === id);

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

app.post('/shop/products', (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.status(201).json(product);
});

app.put('/shop/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  }
});

app.delete('/shop/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json(deletedProduct);
  }
});

// ! Account 
app.post('/login', (req, res) => {
  const { mail, pass } = req.body;

  if (mail === 'example.user@gmail.com' && pass === '1234') {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

app.post('/sign-up', (req, res) => {
  res.redirect('/dashboard');
});

// Start the server
const PORT = 4545;
app.listen(PORT, () => console.log('Listening on port ' + PORT));