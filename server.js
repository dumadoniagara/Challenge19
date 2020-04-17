// Load Library ========================== 
const path = require('path') 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const fs = require('fs')
// ========================================

// deklarasi data json.
let data = JSON.parse(fs.readFileSync('./data.json')); //array kosong


// deklarasi awal path dan ejs
app.set('views', path.join(__dirname, 'view')) 
app.set('view engine', 'ejs')

// load library body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/',(req,res) => res.render('list',{data}))

app.get('/add',(req,res)=> res.render('add'))

app.post('/add', (req,res)=>{
    data.push(req.body)
    res.redirect('/')
    fs.writeFileSync('data.json',JSON.stringify(data))
})

app.get('/delete/:id', (req,res)=>{
    let id = req.params.id
    data.splice(id,1)
    fs.writeFileSync('data.json',JSON.stringify(data))
    res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
// console.log(data);

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { item: {...data[id]}, id });
}) 

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const temp = req.body;
    const edit = { 
        string: temp.string, 
        integer: temp.integer,
        float: temp.float, 
        date: temp.date, 
        boolean: temp.boolean };
    data.splice(id, 1, edit);
    fs.writeFileSync("data.json", JSON.stringify(data));
    res.redirect('/');
})