const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('mainPage', {
        title: "Главная"
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: "Вход"
    });
});

app.get('/registration', (req, res) => {
    res.render('register', {
        title: "Регистрация"
    });
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        title: "Профиль"
    });
});

app.get('/communities', (req, res) => {
    res.render('communityList', {
        title: "Группы"
    });
});

app.get('/authors', (req, res) => {
    res.render('authors', {
        title: "Авторы"
    });
});

app.get('/communities/:id', (req, res) => {
    res.render('community', {
        title: "Группа",
        id: req.params.id
    });
});

app.get('/post/create', (req, res) => {
    res.render('createPost', {
        title: "Новый пост"
    });
});

app.get('/post/:id', (req, res) => {
    res.render('post', {
        title: "Пост",
        id: req.params.id
    });
});

app.listen(3000);