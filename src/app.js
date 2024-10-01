const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// app.get('/user', (req, res) => {
//     res.send("Fetched Data Successfully");
// })

// app.post('/user', (req, res) => {
//     res.send({firstname : "Imran", lastname : "Shah"})
// })

// app.delete('/user', (req, res) => {
//     res.send("Deleted user successfully");
// })

// app.use("/test", (req, res)=> {
//     res.send("This is test route")
// })


// Multiple Route Handlers

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Route Handler 1st");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Route Handler 2st");
//     next();
//   },
//   (req, res, next) =>{
//     console.log("Route Handler 3rd");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Route Handler 4th");
//     next();
//   },
//   (req, res) => {
//     console.log('Route Handler 5th');
//     res.send('5th Rsponse!!')
//   }
// );


// Writing Auth Middlewares

// app.use('/admin', adminAuth);

// app.get('/admin/getAllData', (req, res) => {
//     res.send("Admin Data Sent");
// })

// app.get('/user/data', userAuth, (req, res) => {
//     res.send("User Data Sent")
// })

// app.post('/user/login', (req, res) => {
//     res.send("User Logged in Successfully");
// })


// Error Handling
app.use('/', (err, req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong!");
    }
})

app.use('/getUserData', (req, res) => {
    // try {
        throw new Error("dfsdfadsf");
        res.send("User data sent");
    // } catch (error) {
        // res.status(500).send("Some error occured contact support team")
    // }
});
app.use('/', (err, req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong!");
    }
})



app.listen(7777, () => {
  console.log("Server is running successfully on the port 7777...");
});
