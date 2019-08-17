const express = require('express');
const { Reservation, validate } = require('../models/reservation');
const router = express.Router();

router.get('/', async (req, res) => {
  const reservations = await Reservation.find().sort('orderDate');
  res.send(reservations);
});

router.get('/:id', async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) return res.status(404).send('Reservation not found...');

  res.send(reservation);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let reservation = new Reservation({
    name: req.body.name,
    partySize: req.body.partySize,
    mobile: req.body.mobile,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    comment: req.body.comment
  });

  reservation = await reservation.save();

  res.send(reservation);
});

router.put('/:id', async (req, res) => {
  const reservation = await Reservation.findAndModify(
    req.params.id,
    {
      name: req.body.name,
      partySize: req.body.partySize,
      mobile: req.body.mobile,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      comment: req.body.comment
    },
    { new: true }
  );

  if (!reservation) return res.status(404).send('Reservation not found...');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(reservation);
});

router.delete('/:id', async (req, res) => {
  const reservation = await Reservation.findByIdAndRemove(req.params.id);

  if (!reservation) return res.status(404).send('Reservation not found...');

  res.send(reservation);
});

module.exports = router;
