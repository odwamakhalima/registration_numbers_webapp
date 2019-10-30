const flash = require('express-flash');
const session = require('express-session');
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var registration = require('./regFact.js')
var routings = require('./reg-routes')

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/register';

const pool = new Pool({
    connectionString
});

const factoryReg = registration(pool)
const routingFact = routings(factoryReg)


const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'this is my long string that is used for session in http',
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', routingFact.indexs)

app.post('/reg_numbers', routingFact.postData)


var PORT = process.env.PORT || 5030

app.listen(PORT, function () {
    console.log('server', PORT)
  })