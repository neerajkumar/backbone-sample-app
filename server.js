var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    author: String,
    title: String,
    url: String
});

mongoose.model('Blog', BlogSchema);

var Blog = mongoose.model('Blog');

/*
var blog = new Blog({
    author: 'Neeraj Kumar',
    title: 'Ruby on Rails',
    url: 'http://blog.neerajk.com'
});

blog.save();
*/

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// ROUTES

app.get('/api/blogs', function(req, res) {
    Blog.find(function(err, docs) {
	docs.forEach(function(item) {
	    console.log('Received a GET request for _id: ' + item._id);
	});
	res.send(docs);
    });
});

app.post('/api/blogs', function(req, res) {
    console.log('Received a POST request');
    for(var key in req.body) {
	console.log(key + ': ' + req.body[key]);
    }
    blog = new Blog(req.body);
    blog.save(function(err, doc){
	res.send(doc);
    })
});

app.delete('/api/blogs/:id', function(req, res) {
    console.log('Received a DELETE request for _id: ' + req.params.id)
    Blog.remove({ _id: req.params.id }, function() {
	res.send({ _id: req.params.id })
    });
});

app.put('/api/blogs/:id', function(req, res) {
    console.log('Successfully updated blog with _id: ' + req.params.id)
    Blog.update({ _id: req.params.id }, req.body, function() {
	res.send({ _id: req.params.id })
    })
})

var port = 8080;

app.listen(port);

console.log('server on ' + port);
