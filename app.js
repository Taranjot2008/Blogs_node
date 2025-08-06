const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//mongoose database
const dbURI = 'mongodb+srv://taranjotscience:Mongodb2025@blogcluster.gkuxfpd.mongodb.net/first_database?retryWrites=true&w=majority&appName=BlogCluster'
mongoose.connect(dbURI, {usenewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes)

app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
})
