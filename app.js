const express = require('express');
const bodyParser = require('body-parser');
const android = require('./andoird/routes');
const ios = require('./ios/routes');

const app = express();

app.use(bodyParser.json());
app.use('/android', android);
app.use('/ios', ios);

app.listen(3000, () => console.log('Listening on 3000'));
