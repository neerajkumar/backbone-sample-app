var Blog = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		url: ''
	}
})

var blog1 = new Blog({
	author: 'Neeraj Kumar',
	title: 'Ruby on Rails',
	url: 'http://blog.neerajk.com'
});

var blog2 = new Blog({
	author: 'Anuja Nigam',
	title: 'SEO Manager',
	url: 'http://seaomanagement-by-anuja.com'
});

var Blogs = Backbone.Collection.extend({ url: 'http://localhost:8080/api/blogs' });

var blogs = new Blogs([]);

// Backbone views

// Backbone view for one blog

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


// Backbone view for collection of blogs

var BlogViews = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
	    this.model.on('add', this.render, this);
	    this.model.fetch({
		success: function(resposne)
		{
		    _.each(response.toJSON(), function(item) {
			console.log('Successfully GOT blog with _id: ' + item._id);
		    });
		},
		error: function() {
		    console.log('Failed to get blogs!!');
		}
	    });
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}
});

var blogViews = new BlogViews();

$(document).ready(function(){
	$(".add-blog").on('click', function(){
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		})
		console.log(blog.toJSON());
	    blogs.add(blog);
	    blog.save(null, {
		success: function(response) {
		    console.log('Successfully SAVED blog with _id: ' + response.toJSON()._id);
		},
		error: function() {
		    console.log('Failed to Save blog!!!')
		}
	    });
	});
});
