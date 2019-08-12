const mongoose = require('mongoose');
const config = require('config');

mongoose
  .connect(`${config.get('mongodb.port')}`, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB...');
    console.log(config.get('mongodb.port'));
  })
  .catch(err => console.log('Cound not connect to MongoDB... ', err));

const reservtionSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
  partySize: { type: Number, required: true, min: 1, max: 50 },
  mobile: { type: String, required: true, minlength: 5, maxlength: 255 },
  email: { type: String, required: true },
  date: { type: String, required: true, minlength: 3, maxlength: 255 },
  time: { type: String, required: true, minlength: 3, maxlength: 255 },
  comment: { type: String, minlength: 3, maxlength: 255 },
  orderDate: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservtionSchema);

async function createReservation() {
  const reservation = new Reservation({
    name: 'Tom',
    partySize: 3,
    mobile: '221621072',
    email: 't.zhong16@Gmail.com',
    date: '28-6-2019',
    time: '7:00 pm',
    comment: 'haha'
  });

  const result = await reservation.save();
  console.log(result);
}
