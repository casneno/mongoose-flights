const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
const Validation = require('../globals/validation');

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addArrival,
}

/* Display 'All Flights' */
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

/* Display 'Add Flight' page */
function newFlight(req, res) {
  res.render('flights/new', {
    title: 'New Flight',
    errorMsg: 'error',
    airlines: Validation.airlineList,
    airports: Validation.airportList,
    date: Validation.defaultDate,
  })
}

/* Display the Details page and loads info from both the ticket and the flights database */
async function show(req, res){
  try{
    console.log('checkpoint 1')
    console.log('FLight ID: ',req.params.id)
    const flight = await Flight.findById(req.params.id)
    console.log('checkpoint 2')
    const tickets = await Ticket.find({ flight: flight._id })
    console.log('checkpoint 3');
    res.render('flights/details', {
      title: 'Flight Details', 
      flight,
      tickets,
      airports: Validation.airportList,
    });
 } catch (err) {
  console.log('error')
    res.redirect('/flights')
  };
}

/* Create a new flight, input in Add Flight page */
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


/* Add Arrival Entry Creation functionality in Detail page*/
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

