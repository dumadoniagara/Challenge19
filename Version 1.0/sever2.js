const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;
const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./data2.json'));

app.set('views', path.join(__dirname, 'tampilan'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.render('index', { data }));
app.get('/tambah', (req, res) => res.render('tambah'));
app.get('/filter', (req, res) => res.render('filter'));

app.post('/tambah', (req, res) => {
    let dat = req.body;
    data.push(dat);
    fs.writeFileSync('data2.json', JSON.stringify(data));
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    data.splice(id, 1);
    fs.writeFileSync('data2.json', JSON.stringify(data));
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('ganti', { item: { ...data[id]}, id  });
})

app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    const edit = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    }
    data.splice(id, 1, edit);
    fs.writeFileSync('data2.json', JSON.stringify(data));
    res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
