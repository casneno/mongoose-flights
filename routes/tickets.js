const express = require('express');
const router = express.Router();

const ticketsCtrl = require('../controllers/tickets');

router.post('/flights/:id/tickets', ticketsCtrl.newTicket);

router.get('/flights/:id/tickets', ticketsCtrl.ticketsPage)

module.exports = router;