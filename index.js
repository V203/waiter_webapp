/* eslint-disable no-undef */

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const Errsucc =require('./errsucc');
const flash = require('express-flash');
const session = require('express-session');
const Routes  = require('./Routes');
const ServicesFactory =require('./servicesFactory')

const pg = require('pg');
const Pool = pg.Pool;


// const path = require('path')


var useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    // eslint-disable-next-line no-unused-vars
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

var servicesFactory = ServicesFactory(pool)
const routes = Routes(servicesFactory)
app.use(session({
    secret: '<add a secret string here>',
    resave: false,
    saveUninitialized: true
}));



app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: './views/partials', viewPath: './views', layoutsDir: './views/layouts' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(flash());





const PORT = process.env.PORT || 3015;


app.get(`/`,async (req, res) => {  
    let servicesFactory = ServicesFactory(pool);
    
    res.render('index', {     
                                             
    });     
 
})

app.post(`/waiter`, async (req,res)=>{
    let servicesFactory = ServicesFactory(pool);
    res.render(`waiter`,

    {
        mon: await servicesFactory.getSpecificDay("monday")
    });
});

app.post(`/admin`,async (req,res)=>{
    res.render(`admin`,{
    });
});


app.listen(PORT, ()=>{ console.log(`Listening at PORT: ${PORT}`);
});