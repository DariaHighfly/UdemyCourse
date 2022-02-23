const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.use('/static', 
express.static(path.resolve(__dirname, '../dist')));

// url and invoked function 
app.get('/hello-world/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/hello-world.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});

app.get('/kiwi/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/kiwi.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});

app.listen(3000, function () {
    console.log(' APP STARTED! ');
});
