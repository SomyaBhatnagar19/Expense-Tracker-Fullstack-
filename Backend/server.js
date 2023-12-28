/* /backend/server.js */

const express = require('express');
const cors = require('cors');

const UserController = require('./controller/userController');

const app = express();

app.use(cors());

//User Controllers access
app.use('/users', UserController);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000 .`);
})