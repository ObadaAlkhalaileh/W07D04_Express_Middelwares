//pulse 0
const express = require("express");

const app = express();
const port = 3000;

const users = ["John", "Mark"];

//Pulse 4
app.use(express.json())

//Practice 1
const router = express.Router();

router.use( /*"/users"*/ (req, res, next) => {
    console.log("router test");
    // console.log(users);
    console.log(users);
    next();
});

app.use("/users", router)

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

//practice 2
//a middleware that will log the request body if found
app.use((req, res, next) => {
    if (req.body.name) {
        console.log(req.body.name);
        next();
    }
    next();
});

app.post("/users/create", (req, res, next) => {
    if (req.body.name) {
        console.log("body is defined");
        users.push(req.body.name);
        console.log(users)
        res.status = 201;
        res.json("name added");
    } else {
        const err = new Error("no name entered");
        err.status = 404
        next(err);
    };
});

//Practice 3
const productsRouter = express.Router();

productsRouter.use((req, res, next) => {
    console.log("products router")
    next();
});

app.use("/products", productsRouter)

//Practice 4
const products = ["keyboard", "mouse"];

app.post("/products/update", (req, res, next) => {
    if (req.body.product) {
        products.splice(0, 1, req.body.product)
        console.log(products)
        res.status = 200
        res.json("product added seuccecfuly")

    } else {
        const err = new Error("no product entered");
        err.status = 404
        next(err);
    }
})


//Practice 5 solved with practice 3

//Practice 6
app.use("*", (req, res) => {
    // res.status = 404
    // res.send("NOT FOUND")

    const err = new Error("unassigned destination");
    err.status = 404

    res.status = err.status
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    })
})



app.get("/users", (req, res, next) => {
    res.json(users);
});

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
    });
    //no need for next because this is a dead end and will show response on client side
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});