require('dotenv').config()

const express = require('express'),
    app = express()
    massive = require('massive'),
    session = require('express-session'),
    authCtrl = require('./authController'),
    postCtrl = require('./postController'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60*60*24},
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
})


//auth endpoints

app.post('/api/auth/register', authCtrl.register)

app.post('/api/auth/login', authCtrl.login)

app.delete('/api/auth/logout', authCtrl.logout)

app.get('/api/auth/getSessionUser', authCtrl.getSessionUser)

//post endpoints

app.post('/api/post', postCtrl.createPost)

app.get('/api/post', postCtrl.getPostsByQuery)

app.get('/api/post/byid/:postid', postCtrl.getPostById)

app.post('/api/post/:postid', postCtrl.deletePost)