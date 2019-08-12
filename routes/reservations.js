const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('@hapi/joi');

const Reservation = mongoose.model(
  'Reservation',
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    partySize: { type: Number, required: true, min: 1, max: 50 },
    mobile: { type: String, required: true, minlength: 5, maxlength: 255 },
    email: { type: String, required: true },
    date: { type: String, required: true, minlength: 3, maxlength: 255 },
    time: { type: String, required: true, minlength: 3, maxlength: 255 },
    comment: { type: String, minlength: 3, maxlength: 255 },
    orderDate: { type: Date, default: Date.now }
  })
);

// async function createReservation() {
//   const reservation = new Reservation({
//     name: 'Tom',
//     partySize: 3,
//     mobile: '221621072',
//     email: 't.zhong16@Gmail.com',
//     date: '28-6-2019',
//     time: '7:00 pm',
//     comment: 'haha'
//   });

//   const result = await reservation.save();
//   console.log(result);
// }
// createReservation();

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
  const { error } = validateReservation(req.body);
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

  const { error } = validateReservation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(reservation);
});

router.delete('/:id', async (req, res) => {
  const reservation = await Reservation.findByIdAndRemove(req.params.id);

  if (!reservation) return res.status(404).send('Reservation not found...');

  res.send(reservation);
});

function validateReservation(reservation) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    partySize: Joi.number()
      .min(1)
      .max(50)
      .required(),
    mobile: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    date: Joi.string()
      .min(3)
      .max(255)
      .required(),
    time: Joi.string()
      .min(3)
      .max(255)
      .required(),
    comment: Joi.string()
      .min(3)
      .max(255)
  };

  return Joi.validate(reservation, schema);
}

module.exports = router;
