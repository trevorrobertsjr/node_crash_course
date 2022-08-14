// Node hasn't implemented import from ES6 yet

// So, can't use...

// import Person from "./person";

// const Person = require('./person');
// //exported class
// const person1 = new Person.Person("bob bobberson", 5)
// //exported object
// const person = Person.person
// console.log(person1);
// person1.greeting();
// console.log(person);

// Experimenting with logging
// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('message', (data) => console.log(`Called Listener`, data));
// logger.log('Hello World');

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // v1
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         console.log("loading home page");
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     });
    // }
    // if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         if (err) throw err;
    //         console.log("loading about page");
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     });
    // }
    // if (req.url === '/api/users') {
    //     const users = [
    //         { name: 'Bob Smith', age: 40 },
    //         { name: 'John Doe', age: 30 }
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(users));
    // }
    // v2

    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let extname = path.extname(filePath);

    // Iniitla Content Type
    let contentType = 'text/html';

    // Modify content type according to file extension
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;

    }

    // Read in the html
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // error code for file not found
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    })
});
// either use environment variable or default of 5500
const PORT = process.env.PORT || 5500;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));