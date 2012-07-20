var
	express = require('express'),
	dust = require('express-dust'),
	app = express.createServer();


//--------------
// Config
//--------------
var	env = "dev";
app.configure('development', function(){
	console.log("Configuring for development");
});
app.configure('production', function(){
	console.log("Configuring for production");
	env = "prod";
	app.use(express.logger());
});
app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(function(req, res, next){
		if (req.accepts('html')) {
			res.status(404);
			res.render('404', { url: req.url });
			return;
		}
		if (req.accepts('json')) {
			res.send({ error: 'Not found' });
			return;
		}
		res.type('txt').send('Not found');
	});
	app.use(function(err, req, res, next){
		res.status(err.status || 500);
		res.render('500', { error: err });
	});
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

dust.makeBase({
	copy: '<a href="https://github.com/swider/BannerText">BannerText</a> Demo'
});



//-------------------
// Routes
//-------------------

app.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Demo'
	});
});

app.post('/result', function(req, res, next) {
	console.log(req.body.data);
	res.render('submit', {
		title: 'Result',
		data: JSON.parse('[' + req.body.data + ']')
	});
});



//-------------------
// Start Server
//-------------------
var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

