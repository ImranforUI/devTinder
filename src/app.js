const express = require('express');

const app = express();

app.get('/user', (req, res) => {
    res.send("Fetched Data Successfully");
})

app.post('/user', (req, res) => {
    res.send({firstname : "Imran", lastname : "Shah"})
})

app.delete('/user', (req, res) => {
    res.send("Deleted user successfully");
})

app.use("/test", (req, res)=> {
    res.send("This is test route")
})


app.listen(7777, () => {
    console.log('Server is running successfully on the port 7777...');
});
