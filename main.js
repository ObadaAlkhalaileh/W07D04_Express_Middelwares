//pulse 0
const express = require("express");

const app = express();
const port = 3000;

const users = [];

//Pulse 4
app.use(express.json())

//practice 2
//a middleware that will log the request body if found
/*
app.use((req, res, next) => {
    console.log(req.body.name)
    next()

})*/

//Practice 1
// const router = express.Router()

// router.use( /*"/users" this is wrong*/ (req, res, next) => {
//     /*console.log(users);*/
//     console.log("router test");
//     next();
// });
// router.use( /*'/'*/ "/users", (req, res, next) => {
//     console.log("endpoint test");
//     res.send(users)

// });

// app.use( /*"/users"*/ "/", router)


//Pulse 1&5
const logUsers = (req, res, next) => {

    //dont use res in the first middlewares because it will prevent next() and will stop the cycle
    if (users[0] === undefined) {
        const err = new Error("no users");
        err.status = 404
        next(err);
    } else { // else here so important 
        console.log(users);
        next();
    }
}

//Pulse 2
app.use(logUsers);

/*another way
app.use((req, res, next) => {
    console.log(users);
    //dont use res in the first middlewares because it will prevent next() and will stop the cycle
    next();
});
*/

//Pulse 3
const logMethod = (req, res, next) => {
    console.log(req.method);
    //dont use res in the first middlewares because it will prevent next() and will stop the cycle

    next();
}
app.use('/users', logMethod)

//Pulse 5
app.use((errrr, req, res, next) => {
    //you can change the name of error parameter to anyhting you want
    //since you passed it from the request API
    res.status = errrr.status
    res.json({
            error: {
                status: errrr.status,
                message: errrr.message
            }
        })
        //no need for next because this is a dead end and will show response on client side
})

//Practice 2
app.post("/users/create", (req, res, next) => {
    if (req.body.name) {
        console.log("body is defined")
        res.status = 201
        users.push(req.body.name)
            // console.log(users)
        res.json("name added")
    } else {
        console.log("body is not defined")

        res.status = 404
        res.json("please enter a name")
    }
});


app.get("/users", (req, res, next) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});