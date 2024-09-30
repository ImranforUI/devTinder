const express = require('express');

const app = express();


app.use("/", (req, res) => {
    res.send('Assalamalikum Imran')
})

app.use("/hello", (req, res) => {
    res.send('Hello Hello Hello h');
})

app.use("/test", (req, res)=> {
    res.send("This is test route")
})
app.listen(7777, () => {
    console.log('Server is running successfully on the port 7777...');
});
