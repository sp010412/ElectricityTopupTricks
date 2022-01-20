const express = require('express');
const exphbs = require('express-handlebars');
const pg = require('pg');
const Pool = pg.Pool;

const app = express();
const PORT = process.env.PORT || 3017;

const ElectricityMeters = require('./electricity-meters');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/topups';


const pool = new Pool({
	connectionString
});

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const electricityMeters = ElectricityMeters(pool);

app.get('/', function (req, res) {
	res.redirect('/streets');
});

app.get('/streets', async function (req, res) {
	const streets = await electricityMeters.streets();
	//console.log(streets);
	res.render('streets', {
		streets
	});
});

app.get('/appliances', async function (req, res) {
	const appliances = await electricityMeters.appliances();
	res.render('appliances', {
		appliances
	});
});


app.get('/meters/:street_id', async function (req, res) {
	try {
	// use the streetMeters method in the factory function...
	// send the street id in as sent in by the URL parameter street_id - req.params.street_id
	var id = req.params.street_id;
	// create  template called street_meters.handlebars
	// in there loop over all the meters and show them on the screen.
	// show the street number and name and the meter balance
	const meters = await electricityMeters.streetMeters(id);

	res.render('street_meters', {
		id,
		meters
	});
} catch (err) {
	console.log(err)
}
});

app.get('/topupUnits', async function (req, res) {

	res.render('buy_electicity', {

	});
});


app.post('/buyButton', async function (req, res) {
	try {
		var units = req.body.inputBox;
		var meterId = req.body.slct;
		const addedUnits = await electricityMeters.topupElectricity(meterId, units);

		res.render('buy_electicity', {
			addedUnits
		});
	} catch (err) {
		console.log(err)
	}
});

app.get('/useUnits', async function (req, res) {

	res.render('use_electicity', {

	});
});

app.post('/useButton', async function (req, res) {
	try {
		var meterId = req.body.slct1;
		var units = req.body.slct2;

		const usedUnits = await electricityMeters.useElectricity(meterId, units);

		res.render('use_electicity', {
			usedUnits
		});
	} catch (err) {
		console.log(err)
	}
});

app.get('/trackMeterId', async function (req, res) {

	res.render('track', {

	});
});

app.post('/trackButton', async function (req, res) {
	try {
		var id = req.body.slct1;
		const dataForEachMeter = await electricityMeters.idMeters(id);

		res.render('track', {
			dataForEachMeter
		});
	} catch (err) {
		console.log(err)
	}
});




// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});