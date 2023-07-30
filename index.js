const express =require('express');
const cookieParser=require('cookie-parser');
const app=express();


// const path=require('path');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
// const sassMiddleware=require('node-sass-middleware');

// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest:'./assets/css',
//     debug:true,
//     outputStyle:'expanded',
//     prefix:'/css'
// }));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'));
app.set('views','./views');

app.use(session({
    name:'codeial',
    // change the secrete before deployment in production mode
    secret:'blah something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017",
        autoRemove: "disabled",
      }),
}));

// app.use(session({
//     name:'codial',
//     secret:'blashsomething',
//     saveUninitialized:false,
//     resave:false,
//     cookie:
//     {
//         maxAge:(1000*60*100)
//     },
//     store: new MongoStore({
//         mongooseConnection: mongoose.connection,
//         autoRemove: 'disabled',
//       }),
// }));



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setflash);

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error : ${err}`);
        return;
    }
    console.log(`server is running: ${port}`);
});