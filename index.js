/* eslint-disable no-undef */

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

const Errsucc = require('./errsucc');
const flash = require('express-flash');
const session = require('express-session');
const Routes = require('./Routes');
const ServicesFactory = require('./servicesFactory')

const pg = require('pg');
const { Session } = require('express-session');
const Pool = pg.Pool;


// const path = require('path')


var useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    // eslint-disable-next-line no-unused-vars
    useSSL;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

var servicesFactory = ServicesFactory(pool)
// const routes = Routes(servicesFactory)
// app.use(session({
//     secret: '<add a secret string here>',
//     resave: false,
//     saveUninitialized: true
// }));
const PORT = process.env.PORT || 3012;


app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: './views/partials', viewPath: './views', layoutsDir: './views/layouts' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(flash());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



app.get(`/`, async (req, res) => {
    res.render('index');
})

app.get('/admin', async (req, res) => {
    res.render('admin');
})

app.post('/adminLog', (req, res) => {
    res.render('adminLog')
});

app.get('/adminLog', (req, res) => {
    res.render('adminLog')
});


app.get('/waiterLog', (req, res) => {
    res.render('waiterLog')
})

app.post('/waiterLog', (req, res) => {
    let username = req.body.username
   console.log(req.body.username); 
   res.redirect(`waiters/${username}`)
})

// app.get('/waiterLog/:username', (req, res) => {
//     let username = req.params.username
//     console.log(username);
//     res.render(`waiters/${username}`)
// })

// app.get('/waiterLog', (req, res) => {    
//     let username = req.params.username
//     console.log(username);
//     res.render('waiterLog')   
// })


app.post(`/waiters`,async (req, res) => {
    let username = req.params.username
    console.log(`waiters post ${username}`);
    
    let days = req.body.days
    await serve.addDays_vI(username,days);
    res.render('waiters')
})

app.get('/waiters/:username', (req, res) => {
    let serve = ServicesFactory(pool);
    
    var username_ =req.params.username
    
    
    res.render('waiters', {username:username_})
})

app.post('/clear', async (req, res) => {
    let serve = ServicesFactory(pool)
    await serve.deleteAll()
    res.render('admin')
    // res.redirect("/admin")
})

app.post("/admin", async (req, res) => {
    res.render('admin', {

        mon: await servicesFactory.getAllFromAday("monday"),
        tue: await servicesFactory.getAllFromAday("tuesday"),
        wed: await servicesFactory.getAllFromAday("wednesday"),
        thurs: await servicesFactory.getAllFromAday("thursday"),
        fri: await servicesFactory.getAllFromAday("friday"),
        sat: await servicesFactory.getAllFromAday("saturday"),
        sun: await servicesFactory.getAllFromAday("sunday"),
    })

})

app.listen(PORT, () => {
    console.log(`Listening at PORT: ${PORT}`);
});