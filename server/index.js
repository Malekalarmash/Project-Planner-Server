const express = require('express')
const app = express()
const cors = require('cors')
const projectRouter = require('./routes/projects')
const clientRouter = require('./routes/clients')
const userRouter = require('./routes/users')
const login = require('./routes/login')
const signup = require('./routes/signup')
const taskRouter = require('./routes/tasks')


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
};
app.use(cors({ origin: (orig, cb) => cb(null, true), credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/projects', projectRouter)
app.use('/clients', clientRouter)
app.use('/login', login)
app.use('/signup', signup)
app.use('/tasks', taskRouter)



var server = app.listen(port = 3500, () => {
    console.log("App is running on port", port)
})
