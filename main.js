//pulse 0
const express = require("express");

const app = express();
const port = 3000;

const users = [];

//Pulse 4
app.use(express.json())

//Pulse 1&5
const logUsers = (req, res, next) => {

    //dont use res in the first middlewares because it will prevent next() and will stop the cycle
    const err = new Error("Internal server error");
    err.status = 404
    if (users[0] === undefined) {
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
app.use((err, req, res, next) => {
    res.status = err.status
    res.json({
            error: {
                status: err.status,
                message: err.message
            }
        })
        //no need for next because this is a dead end and will show response on client side
})


app.get("/users", (req, res, next) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});