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
    res.render('main', {
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

app.listen(3000);