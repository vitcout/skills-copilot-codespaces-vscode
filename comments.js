//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8080;

//create server
http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    var path = url_parts.pathname;
    var query = url_parts.query;
    console.log(path);
    console.log(query);

    switch (path) {
        case '/':
            display_form(res);
            break;
        case '/submit':
            submit_comment(req, res);
            break;
        case '/list':
            list_comments(res);
            break;
        default:
            display_404(path, res);
            break;
    }

}).listen(port);

console.log('Server listening on: http://localhost:%s', port);

function display_form(res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>Comments</h1>');
    res.write('<form action="/submit" method="post">');
    res.write('<textarea name="comment" rows="5" cols="50"></textarea><br>');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
    res.end();
}

function submit_comment(req, res) {
    var comment = '';
    req.on('data', function (data) {
        comment += data;
    });
    req.on('end', function () {
        fs.appendFile('comments.txt', comment + '\n', function (err) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write('Comment submitted. <a href="/list">List comments</a>');
            res.end();
        });
    });
}

function list_comments(res) {
    fs.readFile('comments.txt', function (err, data) {
        if (err) throw err;
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<h1>Comments</h1>');
        res.write('<pre>' + data + '</pre>');
        res.write('<a href="/">Add another comment</a>');
        res.end();
    });
}

function display_404(url, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>404 Not Found</h1>');
    res.write