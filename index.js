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
const Pool = pg.Pool;


// const path = require('path')


var useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    // eslint-disable-next-line no-unused-vars
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb_test';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

var servicesFactory = ServicesFactory(pool)
const routes = Routes(servicesFactory)
// app.use(session({
//     secret: '<add a secret string here>',
//     resave: false,
//     saveUninitialized: true
// }));



app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: './views/partials', viewPath: './views', layoutsDir: './views/layouts' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))



app.get('admin', async (req, res) => {
    res.redirect('/admin');
})


const PORT = process.env.PORT || 3019;


app.get(`/`,async  (req, res) => {

    res.render('index');

})

// app.post("/:id",async)

app.get('/waiterLog', async (req,res)=>{
 
    res.render('waiterLog')
})

app.post("/waiterLog", async (req, res) => {
    let user = req.body.waiterName
    console.log(user);
    res.render('waiterLog', {})

})


app.get("/adminLog", async (req, res) => {
    res.render('adminLog', {})
})



// app.post("/waiters", async (req, res) => {

//     // console.log(username);
//     res.render('waiters')
// })

app.post("/waiters", async (req,res) => {
    let serve = ServicesFactory(pool)
    let name = req.body.username
    let theDays = req.body.days

    console.log(name +" "+  theDays)

        serve.addDays_vI(name, theDays)
    res.render("waiters")

})






// app.get("/admin", async (req,res) => {
    
        
        

// })
app.get("/admin",async (req,res)=>{
    res.render("admin")
})



app.post("/admin", async (req, res) => {
    res.render('admin',{

        mon: await servicesFactory.getAllFromAday("monday"),
        tue: await servicesFactory.getAllFromAday("tuesday"),
        wed: await servicesFactory.getAllFromAday("wednesday"),
        thurs: await servicesFactory.getAllFromAday("thursday"),
        fri: await servicesFactory.getAllFromAday("friday"),
        sat: await servicesFactory.getAllFromAday("saturday"),
        sun: await servicesFactory.getAllFromAday("sunday"),
    })

})









app.get(`/waiters/`, async (req, res) => {
    res.render("waiters")
});

    // app.post(`/waiters`, async (req, res) => {
    //     let name = req.params.username
    //     let theDays = req.body.days

    //     console.log(name + " " + theDays);

    //     let serve = ServicesFactory(pool)
    //     serve.addDays_vI(name, theDays)
    //     // console.log( +" "+  theDays)
    //     res.redirect("/")

    //     // res.render(`index`, { })


    // })











// app.get("/waiters", async (req, res) => {
//     console.log(req.body.username + " " + req.body.days)
//     res.render('waiters', {})
//     // res.redirect('')

// });

// app.get("/admin",async (req, res) => {
//     console.log(req.body.username + " " + req.body.days)
//     res.render('admin1', {})
//     // res.redirect('')

// });

// app.post('/waiters', async (req, res) => {
//     var waiterName = req.body.waiterName;
//     // serve.addName(waiterName);
//     res.redirect(`/waiters/${waiterName}`)
// });

// app.post('/updateWaiter/:', async (req, res) => {

// })





//     app.post(`/admin`, async (req, res) => {
//         res.render(`admin`, {
// mon: await servicesFactory.getAllFromAday("monday"),
// tue: await servicesFactory.getAllFromAday("tuesday"),
// wed: await servicesFactory.getAllFromAday("wednesday"),
// thurs: await servicesFactory.getAllFromAday("thursday"),
// fri: await servicesFactory.getAllFromAday("friday"),
// sat: await servicesFactory.getAllFromAday("saturday"),
// sun: await servicesFactory.getAllFromAday("sunday"),

//         });
//     });


    app.get('/clear', async (req, res) => {
        let serve = ServicesFactory(pool)
        await serve.deleteAll()
        res.redirect('/admin')

    })


//     // app.get('/hello', function(req, res){
//     //     res.send("Hello World!");
//     //  });

//     //  app.post('/hello', function(req, res){
//     //     res.send("You just called the post method at '/hello'!\n");
//     //  });

//     //  app.get('/:id', function(req, res){
//     //     res.send('The id you specified is ' + req.params.id);
//     //  });


app.listen(PORT, () => {
    console.log(`Listening at PORT: ${PORT}`);
});