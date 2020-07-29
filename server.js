require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const port = process.env.PORT || 3031;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rifa', { useNewUrlParser: true });
const conn = mongoose.connection;
conn.once('open', () => console.log('Successfully connected in mongodb'));

const routes = express.Router();
routes.route('/').get((req, res) => {
    User.find((err, user) => {
        if (err) console.error(err);
        console.log(user);
        res.json(user);
    })
});
routes.route('/').post((req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save()
        .then((user) => res.status(200).json(user))
        .catch((err) => console.error(err));
});

app.use('/users', routes);

app.listen(port, () => console.log('Server is running'))