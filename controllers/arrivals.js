const Flight = require('../models/flight');
const Validation = require('../globals/validation');

async function create(req, res){
  const flight = await Flight.findById(req.params.id);

  flight.destination.push(req.body);

  try {
    await flight.save();
  } catch (err) {
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
  res.redirect(`/flights/${flight._id}`);
}

module.exports = {
  create,
};

console.log('Controllers details.js working fine!')
