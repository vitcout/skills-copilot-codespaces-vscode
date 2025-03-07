//create web server
const express = require('express');
const app = express();

//read body from request
app.use(express.json());

//array of comments
const comments = [
    {message: 'hello'},
    {message: 'hi'}
];

//get request
app.get('/comments', (req, res) => {
    res.send(comments);
});

//post request
app.post('/comments', (req, res) => {
    const comment = {message: req.body.message};
    comments.push(comment);
    res.send(comment);
});

//server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//run server using node comments.js
//use postman to send post request to http://localhost:3000/comments
//select post method and body -> raw -> json -> {"message": "hello"} -> send
//get request to http://localhost:3000/comments
//use postman to send post request to http://localhost:3000/comments
//select post method and body -> raw -> json -> {"message": "hi"} -> send
//get request to http://localhost:3000/comments
//use postman to send post request to http://localhost:3000/comments
//select post method and body -> raw -> json -> {"message": "how are you"} -> send
//get request to http://localhost:3000/comments
//use postman to send post request to http://localhost:3000/comments
//select post method and body -> raw -> json -> {"message": "good"} -> send
//get request to http://localhost:3000/comments
//use postman to send post request to http://localhost:3000/comments
//select post method and body -> raw -> json -> {"message": "bye"} -> send
//get request to http://localhost:3000/comments
//use postman to send post request to http://localhost:3000/comments
//select post method and body -> raw -> json -> {"message": "goodbye"} -> send
//get request to http://localhost:3000/comments
