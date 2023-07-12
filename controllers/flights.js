const Flight = require('../models/flight');
const Validation = require('../globals/validation');

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addArrival,
}

async function index(req, res) {
  try {
    const flights = await Flight.find({});
    res.render('flights/index', {
      title:'All Flights',
      flights,
    })
  } catch (err) {
    res.redirect('/')
  }
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'New Flight',
    errorMsg: 'error',
    airlines: Validation.airlineList,
    airports: Validation.airportList,
    date: Validation.defaultDate,
  })
}

async function create(req, res){
  try {
    if (req.body.departs === '') {
      req.body.departs = Date.now() + 365*24*60*60*1000;
    }
    await Flight.create(req.body);

    res.redirect('/flights');
  } catch (err) {
    console.log(err);
    res.redirect('flights/new');
  }
}


async function show(req, res){
  try{
    const flight = await Flight.findById(req.params.id);
    res.render('flights/details', {
      title: 'Flight Details', 
      flight,
      airports: Validation.airportList,
    });
    console.log(flight);
  } catch (err) {
    res.redirect('/flights')
  }
}

async function addArrival(req, res){
  try {
    await Flight.create(req.body);

    res.redirect('/flights');
  } catch (err) {
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

console.log('Controllers flight.js working fine!')