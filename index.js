const express =require('express');
// const path=require('path');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');

app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/',require('./routes'));

app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'));
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.listen(port,function(err){
    if(err)
    {
        console.log(`error : ${err}`);
        return;
    }
    console.log(`server is running: ${port}`);
});