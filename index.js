// Bring in express
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// const logger = require('./middleware/logger');
const apiRouter = require('./routes/api/members');
const members = require('./Members');

// Initialize express
const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());

// Handle form submissions
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members
    });
});

// Initialize logger middleware
// app.use(logger);

// Create a route
// app.get('/', (req, res) => {
//     // res.send('<h1>Hello World!!!</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', apiRouter);

// Define the port number
const PORT = process.env.PORT || 5000;

// Listen to a port to run a web server
app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));