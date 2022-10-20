const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'nwsmaterials',
});

app.post('/create', (req,res) => {
    const name = req.body.name;
    const description = req.body.description;

    db.query(
        'INSERT INTO materials (name, description) VALUES (?,?)',
        [name, description],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values inserted')
            }
});

});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
})