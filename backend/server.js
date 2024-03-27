// Load env variables ...
require('dotenv').config();

// import dependencies ...
const  express  = require('express');
const cors = require('cors');
const connectToDb  = require('./config/connectToDb');
const Interview = require('./models/data');

// create express app ...
const app = express()

// Config the app ...
app.use(express.json());
app.use(cors());

// Connect to database ...
connectToDb();

// routing ...
app.get('/' , (req,res)=>{
    res.json({hello : "world"});
})

app.get('/interviews' , async (req, res)=>{
    // fetch the interviews list 
    const interviews = await Interview.find();
    // Respond with it ...
    res.json({interviews : interviews});
})

app.post('/interviews' , async (req , res) =>{
    // Get the Sent in data off request body ...
    const name = req.body.name ;
    const role = req.body.role ;
    const date = req.body.date;
    const time = req.body.time ;
    const day = req.body.day ;

    // Create a note with it 
    const interview = await Interview.create({
        name , role , date,time,day ,
    });
    
    res.json({ interview : interview});
})

// start our server 
app.listen(process.env.PORT);