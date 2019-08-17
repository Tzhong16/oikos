const mongoose = require('mongoose');
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

module.exports.Reservation = Reservation;
module.exports.validate = validateReservation;
