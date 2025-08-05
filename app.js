const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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


app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index' , {title: 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });

})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })

        .catch((err) => {
            console.log(err);
        });
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then((result) => {
            res.render('details', {blog: result, title: 'Blog Details'});
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
})

app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
})
