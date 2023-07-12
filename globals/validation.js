const airlineList = ['American Airlines', 'Southwest', 'United Airlines', 'TAP', 'Emirates', 'British Airways', 'Air France']
const airportList = ['AUS', 'DFW', 'DEN', 'LAX', 'JFK', 'LIS', 'GIG', 'CDG', 'POR']
const defaultDate = ()=>Date.now() + 365*24*60*60*1000;


module.exports = {airlineList, airportList, defaultDate};