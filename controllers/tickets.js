const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  newTicket,
  ticketsPage,
}

/* Display the Add Tickets page. */
async function ticketsPage(req,res) {
  try{
    const flight = await Flight.findById(req.params.id) //take the flight object by it's ID and assign it to 'flight'
    const tickets = await Ticket.find({ flight: flight._id }) // 
    res.render(`flights/tickets`, {
      title: 'Purchase Ticket', 
      flight,
      tickets,
    });
 } catch (err) {
  console.log('error')
    res.redirect('/flights')
  };
}

/* Create a New Ticket for that flight and redirect to that flight's page */
async function newTicket(req, res) {
  
  req.body.flight = req.params.id; //associate the flight id to the data being inputed
  const ticket = await Ticket.create(req.body); //create a ticket with the inputed data (and the flight id will be passed along)

  res.redirect(`/flights/${req.params.id}`); //redirect to the flight deatils page
}

console.log('Controllers tickets.js working fine!')

