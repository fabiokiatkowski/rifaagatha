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
        res.json(user);
    })
});
routes.route('/').post((req, res) => {
    const data = {
        ...req.body,
        luckyNumber: Math.floor(100000 + Math.random() * 900000),
    };
    const user = new User(data);
    user.save()
        .then((user) => res.status(200).json(user))
        .catch((err) => console.error(err));
});
routes.route('/:id').put(async (req, res) => {
    const id = req.params.id
    const user = req.body;
    const d = await User.updateOne({ "_id": `${id}` }, { confirmed: user.confirmed });
    if (d.ok === 1) {
        User.find((err, user) => {
            if (err) console.error(err);
            res.json(user);
        })
    }
})

app.use('/users', routes);

app.listen(port, () => console.log('Server is running'))