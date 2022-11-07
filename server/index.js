const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nwsmaterials',
    port: 3306
});

app.get('/materials', (req,res) => {
    db.query('SELECT * FROM materials',(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
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

app.put('/update/:idmaterials', (req,res) => {
    const idmaterials = req.params.idmaterials;
    const name = req.body.name;
    const description = req.body.description;
    db.query(
        'UPDATE materials SET name = ?, description = ? WHERE idmaterials = ?',
        [name, description, idmaterials],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.delete('/delete/:idmaterials', (req, res) => {
    const idmaterials = req.params.idmaterials;
    db.query('DELETE FROM materials WHERE idmaterials = ?', idmaterials, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.post('/createReservation', (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const dateDeb = req.body.dateDeb;
    const dateFin = req.body.dateFin;
    const idmaterials = req.body.idmaterials
    console.log(req.body)
    db.query(
        'INSERT INTO reservation (fisrtName, lastName, email, dateDeb, dateFin, idmaterials) VALUES (?,?,?,?,?,?)',
        [firstName, lastName, email, dateDeb, dateFin, idmaterials],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values inserted')
            }
});
});

app.listen(3001, () => {
    console.log('Server listening on port 3001')
})