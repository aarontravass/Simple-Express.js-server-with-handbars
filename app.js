const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
//init app
const app=express();
const members=require('./Members')

const PORT =process.env.PORT || 5000;
const logger=require('./middleware/logger')

//init middleware
//app.use(logger);

//handlebars middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');


//body parser midleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//homepage route
app.get('/',(req,res)=>{
    res.render('index',{title:'Member App',members});
});

//set static

//app.use(express.static(path.join(__dirname,'public')));
//members api route
app.use('/api/members',require('./routes/api/members'));
//start server
app.listen(PORT,()=>{
    console.log('Server started on port 5000');
})