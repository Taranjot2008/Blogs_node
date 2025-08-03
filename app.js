const express = require('express');
const app = express();
const morgan = require('morgan')
app.set('view engine', 'ejs');
app.listen(3000);
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/blogs', (req, res) => {

    const blogs = [
        {title: 'Isaac Newton', snippet: 'An apple fell on my head'},
        {title: 'Paul Dirac', snippet: 'Dirac Equation is more than it looks'},
        {title: 'Richard P. Feynman', snippet: 'Differentiate under the integral sign'}
    ]

    res.render('index', {title: 'Home', blogs});
});

app.get('/', (req, res) => {
    res.redirect('/blogs');

})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
})

app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
})
